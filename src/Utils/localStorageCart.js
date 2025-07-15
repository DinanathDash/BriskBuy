// Local Storage Cart Utilities
// Fallback for when Firebase is unavailable

const CART_STORAGE_KEY = 'briskbuy_cart';
const BACKUP_PREFIX = 'cart_backup_';

/**
 * Save cart to localStorage
 * @param {string} userId - User ID
 * @param {Array} cartItems - Cart items array
 */
export const saveCartToLocalStorage = (userId, cartItems) => {
  try {
    const cartData = {
      userId,
      items: cartItems,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`${BACKUP_PREFIX}${userId}`, JSON.stringify(cartData));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    return { success: true };
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Load cart from localStorage
 * @param {string} userId - User ID
 */
export const loadCartFromLocalStorage = (userId) => {
  try {
    const cartData = localStorage.getItem(`${BACKUP_PREFIX}${userId}`);
    if (cartData) {
      const parsed = JSON.parse(cartData);
      if (parsed.userId === userId) {
        return { cart: parsed.items || [], success: true };
      }
    }
    return { cart: [], success: true };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return { cart: [], success: false, error: error.message };
  }
};

/**
 * Clear cart from localStorage
 * @param {string} userId - User ID
 */
export const clearCartFromLocalStorage = (userId) => {
  try {
    localStorage.removeItem(`${BACKUP_PREFIX}${userId}`);
    localStorage.removeItem(CART_STORAGE_KEY);
    return { success: true };
  } catch (error) {
    console.error('Error clearing cart from localStorage:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sync localStorage cart with Firebase when connection is restored
 * @param {string} userId - User ID
 * @param {Function} saveToFirebase - Firebase save function
 */
export const syncCartWithFirebase = async (userId, saveToFirebase) => {
  try {
    const localCart = loadCartFromLocalStorage(userId);
    if (localCart.success && localCart.cart.length > 0) {
      const result = await saveToFirebase(userId, localCart.cart);
      if (result.success) {
        console.log('Successfully synced localStorage cart with Firebase');
        return { success: true };
      }
    }
    return { success: false, error: 'No local cart to sync' };
  } catch (error) {
    console.error('Error syncing cart with Firebase:', error);
    return { success: false, error: error.message };
  }
};
