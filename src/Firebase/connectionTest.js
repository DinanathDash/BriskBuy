import { db } from './config';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Test Firebase connection
 * @returns {Promise<Object>} Connection test result
 */
export const testFirebaseConnection = async () => {
  try {
    // Try to read from a test collection or any document
    // This is a lightweight operation to test connectivity
    const testRef = doc(db, 'test', 'connection');
    await getDoc(testRef);
    
    return {
      success: true,
      message: 'Firebase connection successful',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    
    let errorMessage = 'Firebase connection failed';
    
    if (error.code === 'unavailable') {
      errorMessage = 'Firebase service is temporarily unavailable';
    } else if (error.code === 'permission-denied') {
      errorMessage = 'Permission denied - check Firebase security rules';
    } else if (error.message.includes('CORS') || error.message.includes('cors')) {
      errorMessage = 'CORS error - check Firebase configuration and domain settings';
    } else if (error.message.includes('network')) {
      errorMessage = 'Network error - check internet connection';
    }
    
    return {
      success: false,
      message: errorMessage,
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Get Firebase project info for debugging
 * @returns {Object} Project configuration info
 */
export const getFirebaseProjectInfo = () => {
  return {
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    hasApiKey: !!import.meta.env.VITE_FIREBASE_API,
    timestamp: new Date().toISOString()
  };
};
