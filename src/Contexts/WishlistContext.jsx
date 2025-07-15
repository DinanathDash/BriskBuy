import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  saveWishlistItem, 
  getUserWishlist, 
  removeWishlistItem, 
  clearUserWishlist 
} from '../Firebase/wishlist';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  // Load wishlist from Firebase when user changes
  useEffect(() => {
    if (currentUser) {
      loadWishlistFromFirebase();
    } else {
      setWishlistItems([]);
    }
  }, [currentUser]);

  const loadWishlistFromFirebase = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const { wishlistItems: items, error } = await getUserWishlist(currentUser.uid);
      if (!error) {
        setWishlistItems(items);
      } else {
        console.error('Error loading wishlist:', error);
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product) => {
    if (!currentUser) {
      return { success: false, message: 'Please sign in to add items to wishlist' };
    }

    const existingItem = wishlistItems.find(item => item.productId === product.id);
    if (existingItem) {
      return { success: false, message: 'Item already in wishlist' };
    }

    try {
      const result = await saveWishlistItem(currentUser.uid, product);
      if (result.success) {
        // Reload wishlist from Firebase to get the latest data
        await loadWishlistFromFirebase();
        return { success: true, message: 'Added to wishlist' };
      } else {
        return { success: false, message: 'Failed to add to wishlist' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to add to wishlist' };
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!currentUser) {
      return { success: false, message: 'Please sign in' };
    }

    try {
      const result = await removeWishlistItem(currentUser.uid, productId);
      if (result.success) {
        // Update local state immediately for better UX
        setWishlistItems(prev => prev.filter(item => item.productId !== productId));
        return { success: true, message: 'Removed from wishlist' };
      } else {
        return { success: false, message: 'Failed to remove from wishlist' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to remove from wishlist' };
    }
  };

  const moveToWishlist = async (cartItems) => {
    if (!currentUser) {
      return { success: false, message: 'Please sign in to add items to wishlist' };
    }

    try {
      const addPromises = cartItems.map(item => 
        saveWishlistItem(currentUser.uid, {
          id: item.id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          category: item.category,
          description: item.description,
          ratings: item.ratings,
          isAvailable: item.isAvailable
        })
      );

      const results = await Promise.all(addPromises);
      
      // Check if all items were successfully added
      const allSuccessful = results.every(result => result.success);
      
      if (allSuccessful) {
        await loadWishlistFromFirebase(); // Reload to ensure sync
        return { success: true, message: `${cartItems.length} item(s) moved to wishlist` };
      } else {
        return { success: false, message: 'Some items failed to move to wishlist' };
      }
    } catch (error) {
      console.error('Error moving to wishlist:', error);
      return { success: false, message: 'Failed to move items to wishlist' };
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  const clearWishlist = async () => {
    if (!currentUser) return;
    
    try {
      await clearUserWishlist(currentUser.uid);
      setWishlistItems([]);
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
  };

  const value = {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    moveToWishlist,
    isInWishlist,
    clearWishlist,
    loadWishlistFromFirebase,
    wishlistCount: wishlistItems.length
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
