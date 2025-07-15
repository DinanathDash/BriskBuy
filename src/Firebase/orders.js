import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc,
  updateDoc, 
  setDoc,
  query, 
  where, 
  orderBy,
  runTransaction
} from 'firebase/firestore';
import { db } from './config';

// Save cart to Firebase
export const saveCartToFirebase = async (userId, cartItems) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    // Use setDoc with merge to ensure the document exists
    // Add timeout to prevent hanging requests
    const savePromise = setDoc(userRef, {
      cart: cartItems,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    
    // Timeout after 5 seconds to prevent hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Firebase save timeout')), 5000)
    );
    
    await Promise.race([savePromise, timeoutPromise]);
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error saving cart to Firebase:', error);
    
    // Check for specific error types
    if (error.message.includes('timeout') || 
        error.message.includes('CORS') || 
        error.code === 'unavailable' || 
        error.code === 'deadline-exceeded') {
      return { success: false, error: 'Connection issue - using localStorage backup', retryable: true };
    }
    
    return { success: false, error: error.message, retryable: false };
  }
};

// Get cart from Firebase
export const getCartFromFirebase = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    // Add timeout to prevent hanging requests
    const getPromise = getDoc(userRef);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Firebase load timeout')), 5000)
    );
    
    const userSnap = await Promise.race([getPromise, timeoutPromise]);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return { cart: userData.cart || [], error: null };
    } else {
      return { cart: [], error: null };
    }
  } catch (error) {
    console.error('Error loading cart from Firebase:', error);
    
    // Check for specific error types
    if (error.message.includes('timeout') || 
        error.message.includes('CORS') || 
        error.code === 'unavailable' || 
        error.code === 'deadline-exceeded') {
      return { cart: null, error: 'Connection issue - using localStorage backup', retryable: true };
    }
    
    return { cart: null, error: error.message, retryable: false };
  }
};

// Save order and update product stock
export const saveOrder = async (orderData) => {
  try {
    // Use transaction to ensure data consistency
    const result = await runTransaction(db, async (transaction) => {
      // STEP 1: ALL READS FIRST
      // Get all product documents first
      const productReads = [];
      const productRefs = [];
      
      for (const item of orderData.items) {
        const productRef = doc(db, 'products', item.id);
        productRefs.push({ ref: productRef, item });
        productReads.push(transaction.get(productRef));
      }
      
      // Wait for all product reads to complete
      const productDocs = await Promise.all(productReads);
      
      // Check stock availability for all items
      const stockUpdates = [];
      productDocs.forEach((productDoc, index) => {
        const item = productRefs[index].item;
        
        if (!productDoc.exists()) {
          throw new Error(`Product ${item.name} not found`);
        }
        
        const productData = productDoc.data();
        if (productData.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${item.name}. Available: ${productData.stock}, Requested: ${item.quantity}`);
        }
        
        stockUpdates.push({
          ref: productRefs[index].ref,
          currentStock: productData.stock,
          quantity: item.quantity,
          newStock: productData.stock - item.quantity
        });
      });
      
      // STEP 2: ALL WRITES AFTER ALL READS
      // Create the order
      const orderRef = doc(collection(db, 'orders'));
      transaction.set(orderRef, {
        ...orderData,
        createdAt: new Date().toISOString(),
        status: orderData.paymentMethod === 'cod' ? 'pending' : 'paid'
      });
      
      // Update stock for all products
      stockUpdates.forEach(({ ref, newStock }) => {
        transaction.update(ref, { 
          stock: newStock,
          isAvailable: newStock > 0
        });
      });
      
      return orderRef.id;
    });
    
    return { orderId: result, error: null };
  } catch (error) {
    console.error('Error saving order:', error);
    return { orderId: null, error: error.message };
  }
};

// Get user orders
export const getUserOrders = async (userId) => {
  try {
    console.log('Fetching orders for userId:', userId);
    
    // First try with orderBy
    try {
      const q = query(
        collection(db, 'orders'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      console.log('Orders found with orderBy:', orders.length);
      return { orders, error: null };
    } catch (indexError) {
      console.warn('OrderBy query failed, trying without orderBy:', indexError.message);
      
      // Fallback: try without orderBy in case index is not created
      const q = query(
        collection(db, 'orders'), 
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      
      // Sort manually by createdAt
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      console.log('Orders found without orderBy:', orders.length);
      return { orders, error: null };
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { orders: [], error: error.message };
  }
};

// Restore stock when order is cancelled
export const cancelOrder = async (orderId) => {
  try {
    const result = await runTransaction(db, async (transaction) => {
      // STEP 1: ALL READS FIRST
      // Get the order
      const orderRef = doc(db, 'orders', orderId);
      const orderDoc = await transaction.get(orderRef);
      
      if (!orderDoc.exists()) {
        throw new Error('Order not found');
      }
      
      const orderData = orderDoc.data();
      
      // Check if order can be cancelled
      if (orderData.status === 'delivered' || orderData.status === 'cancelled') {
        throw new Error('Order cannot be cancelled');
      }
      
      // Read all product documents first
      const productReads = [];
      const productRefs = [];
      
      for (const item of orderData.items) {
        const productRef = doc(db, 'products', item.id);
        productRefs.push({ ref: productRef, item });
        productReads.push(transaction.get(productRef));
      }
      
      // Wait for all product reads to complete
      const productDocs = await Promise.all(productReads);
      
      // STEP 2: ALL WRITES AFTER ALL READS
      // Update stock for all items
      productDocs.forEach((productDoc, index) => {
        if (productDoc.exists()) {
          const productData = productDoc.data();
          const item = productRefs[index].item;
          const newStock = productData.stock + item.quantity;
          
          transaction.update(productRefs[index].ref, { 
            stock: newStock,
            isAvailable: true
          });
        }
      });
      
      // Update order status
      transaction.update(orderRef, { 
        status: 'cancelled',
        cancelledAt: new Date().toISOString()
      });
      
      return true;
    });
    
    return { success: result, error: null };
  } catch (error) {
    console.error('Error cancelling order:', error);
    return { success: false, error: error.message };
  }
};

// Save items for later
export const saveForLater = async (userId, savedItems) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      savedItems: savedItems,
      updatedAt: new Date().toISOString()
    });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Debug function to get all orders (for testing)
export const getAllOrdersDebug = async () => {
  try {
    console.log('Fetching ALL orders for debugging...');
    const querySnapshot = await getDocs(collection(db, 'orders'));
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    console.log('Total orders in database:', orders.length);
    console.log('All orders:', orders);
    return { orders, error: null };
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return { orders: [], error: error.message };
  }
};
