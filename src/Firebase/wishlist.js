import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc,
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from './config';

// Save wishlist item to Firebase
export const saveWishlistItem = async (userId, product) => {
  try {
    const wishlistRef = collection(db, 'wishlists');
    await addDoc(wishlistRef, {
      userId,
      productId: product.id,
      ...product,
      addedAt: new Date().toISOString()
    });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get user wishlist from Firebase
export const getUserWishlist = async (userId) => {
  try {
    const q = query(
      collection(db, 'wishlists'), 
      where('userId', '==', userId),
      orderBy('addedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const wishlistItems = [];
    querySnapshot.forEach((doc) => {
      wishlistItems.push({ 
        wishlistId: doc.id, 
        ...doc.data() 
      });
    });
    return { wishlistItems, error: null };
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return { wishlistItems: [], error: error.message };
  }
};

// Remove wishlist item from Firebase
export const removeWishlistItem = async (userId, productId) => {
  try {
    const q = query(
      collection(db, 'wishlists'), 
      where('userId', '==', userId),
      where('productId', '==', productId)
    );
    const querySnapshot = await getDocs(q);
    
    const deletePromises = [];
    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });
    
    await Promise.all(deletePromises);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Clear entire wishlist
export const clearUserWishlist = async (userId) => {
  try {
    const q = query(
      collection(db, 'wishlists'), 
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    
    const deletePromises = [];
    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });
    
    await Promise.all(deletePromises);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Check if item exists in wishlist
export const checkWishlistItem = async (userId, productId) => {
  try {
    const q = query(
      collection(db, 'wishlists'), 
      where('userId', '==', userId),
      where('productId', '==', productId)
    );
    const querySnapshot = await getDocs(q);
    return { exists: !querySnapshot.empty, error: null };
  } catch (error) {
    return { exists: false, error: error.message };
  }
};
