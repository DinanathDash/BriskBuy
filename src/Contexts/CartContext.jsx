import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { saveCartToFirebase, getCartFromFirebase } from '../Firebase/orders';
import { saveCartToLocalStorage, loadCartFromLocalStorage } from '../Utils/localStorageCart';
import { firebaseAvailable } from '../Firebase/config';
import { toast } from 'sonner';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload
      };
    
    case 'ADD_TO_CART':
      const existingItem = state.items.find(
        item => item.id === action.payload.id && 
        item.selectedSize === action.payload.selectedSize &&
        item.selectedColor === action.payload.selectedColor
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && 
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColor === action.payload.selectedColor
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.cartItemId === action.payload.cartItemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.cartItemId !== action.payload.cartItemId)
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    case 'APPLY_COUPON':
      return {
        ...state,
        coupon: action.payload
      };
    
    case 'REMOVE_COUPON':
      return {
        ...state,
        coupon: null
      };
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
  coupon: null
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  const { currentUser } = useAuth();

  // Load cart from Firebase when user logs in
  useEffect(() => {
    if (currentUser) {
      loadCartFromFirebase();
    } else if (hasInitialized) {
      // Only clear cart if we've already initialized (not on first load)
      dispatch({ type: 'CLEAR_CART' });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
    
    if (!hasInitialized) {
      setHasInitialized(true);
    }
  }, [currentUser]);

  // Save cart to Firebase whenever cart changes (with debouncing)
  // Always save to localStorage as backup
  useEffect(() => {
    if (currentUser && !isLoading && hasInitialized && state.items.length >= 0) {
      // Always save to localStorage immediately
      saveCartToLocalStorage(currentUser.uid, state.items);
      
      // Only try Firebase if it's available
      if (firebaseAvailable) {
        const timeoutId = setTimeout(async () => {
          try {
            const result = await saveCartToFirebase(currentUser.uid, state.items);
            if (!result.success) {
              console.warn('Firebase save failed, using localStorage backup:', result.error);
            }
          } catch (error) {
            console.warn('Firebase save error, using localStorage backup:', error);
          }
        }, 300);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [state.items, currentUser, isLoading, hasInitialized]);

  const loadCartFromFirebase = async () => {
    if (currentUser) {
      setIsLoading(true);
      
      // Check if Firebase is available first
      if (firebaseAvailable) {
        try {
          // Try Firebase first
          const { cart, error } = await getCartFromFirebase(currentUser.uid);
          if (!error && cart) {
            dispatch({ type: 'SET_CART', payload: cart });
            console.log('Cart loaded from Firebase');
            setIsLoading(false);
            return;
          } else {
            throw new Error(error || 'Firebase returned empty cart');
          }
        } catch (error) {
          console.warn('Firebase load failed, trying localStorage:', error);
        }
      }
      
      // Fall back to localStorage (either Firebase unavailable or failed)
      const localResult = loadCartFromLocalStorage(currentUser.uid);
      if (localResult.success) {
        dispatch({ type: 'SET_CART', payload: localResult.cart });
        console.log('Cart loaded from localStorage');
      } else {
        console.warn('localStorage load also failed:', localResult.error);
        dispatch({ type: 'SET_CART', payload: [] });
      }
      
      setIsLoading(false);
    }
  };

  const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
    const cartItem = {
      ...product,
      cartItemId: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
      quantity,
      selectedSize,
      selectedColor,
      addedAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    toast.success('Item added to cart!');
    return { success: true, message: 'Item added to cart!' };
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartItemId, quantity } });
    toast.success('Quantity updated!');
  };

  const removeFromCart = (cartItemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { cartItemId } });
    toast.success('Item removed from cart!');
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared!');
  };

  const applyCoupon = (coupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
    toast.success(`Coupon "${coupon.code}" applied!`);
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
    toast.success('Coupon removed!');
  };

  // Calculate totals
  const getCartTotal = () => {
    const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = state.coupon ? (subtotal * state.coupon.discount) / 100 : 0;
    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      total: (subtotal - discount).toFixed(2),
      itemCount: state.items.reduce((count, item) => count + item.quantity, 0)
    };
  };

  const value = {
    items: state.items,
    coupon: state.coupon,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    getCartTotal,
    loadCartFromFirebase, // Export this for manual syncing if needed
    saveCartToFirebase: () => currentUser && saveCartToFirebase(currentUser.uid, state.items)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
