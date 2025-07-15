import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './config';

// Sample products data
const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description: "Latest Apple iPhone with advanced features",
    price: 999,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    category: "electronics",
    isAvailable: true,
    ratings: 4.8,
    stock: 50
  },
  {
    name: "Nike Air Max",
    description: "Comfortable running shoes for daily exercise",
    price: 129,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    category: "sports",
    isAvailable: true,
    ratings: 4.5,
    stock: 30
  },
  {
    name: "MacBook Air M3",
    description: "Lightweight laptop with M3 chip",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "electronics",
    isAvailable: true,
    ratings: 4.9,
    stock: 25
  },
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "electronics",
    isAvailable: true,
    ratings: 4.6,
    stock: 75
  },
  {
    name: "Coffee Maker",
    description: "Automatic coffee maker for perfect morning brew",
    price: 89,
    imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "kitchen",
    isAvailable: true,
    ratings: 4.3,
    stock: 40
  },
  {
    name: "Yoga Mat",
    description: "Premium non-slip yoga mat for exercise",
    price: 39,
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    category: "sports",
    isAvailable: true,
    ratings: 4.4,
    stock: 60
  }
];

/**
 * Initialize sample products in Firestore
 * @returns {Promise<Object>} Result of the initialization
 */
export const initializeSampleProducts = async () => {
  try {
    // Check if products already exist
    const querySnapshot = await getDocs(collection(db, 'products'));
    
    if (!querySnapshot.empty) {
      return {
        success: true,
        message: `Products collection already has ${querySnapshot.size} products`,
        productsAdded: 0
      };
    }

    // Add sample products
    let addedCount = 0;
    for (const product of sampleProducts) {
      await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: new Date().toISOString()
      });
      addedCount++;
    }

    return {
      success: true,
      message: `Successfully added ${addedCount} sample products`,
      productsAdded: addedCount
    };

  } catch (error) {
    console.error('Error initializing sample products:', error);
    return {
      success: false,
      message: 'Failed to initialize sample products',
      error: error.message
    };
  }
};
