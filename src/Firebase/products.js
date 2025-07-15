import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  limit,
  writeBatch
} from 'firebase/firestore';
import { db } from './config';

// Helper function to handle Firebase errors
const handleFirebaseError = (error) => {
  console.error('Firebase Error:', error);
  
  if (error.code === 'unavailable') {
    return 'Service temporarily unavailable. Please try again later.';
  } else if (error.code === 'permission-denied') {
    return 'Permission denied. Please check your authentication.';
  } else if (error.message.includes('CORS')) {
    return 'Network error. Please refresh the page and try again.';
  } else {
    return error.message || 'An unexpected error occurred.';
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { products, error: null };
  } catch (error) {
    return { products: [], error: handleFirebaseError(error) };
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const q = query(collection(db, 'products'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { products, error: null };
  } catch (error) {
    return { products: [], error: handleFirebaseError(error) };
  }
};

// Get product by ID
export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { product: { id: docSnap.id, ...docSnap.data() }, error: null };
    } else {
      return { product: null, error: 'Product not found' };
    }
  } catch (error) {
    return { product: null, error: handleFirebaseError(error) };
  }
};

// Search products
export const searchProducts = async (searchTerm) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
      const product = { id: doc.id, ...doc.data() };
      if (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        products.push(product);
      }
    });
    return { products, error: null };
  } catch (error) {
    return { products: [], error: handleFirebaseError(error) };
  }
};

// Add product (for initial seeding)
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: new Date().toISOString()
    });
    return { productId: docRef.id, error: null };
  } catch (error) {
    return { productId: null, error: error.message };
  }
};

// Batch add products
export const batchAddProducts = async (products) => {
  try {
    const batch = writeBatch(db);
    const productRefs = [];

    products.forEach((product) => {
      const productRef = doc(collection(db, 'products'));
      batch.set(productRef, {
        ...product,
        createdAt: new Date().toISOString()
      });
      productRefs.push(productRef);
    });

    await batch.commit();
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
