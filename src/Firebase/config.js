// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork, initializeFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase config object
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if all required environment variables are present
const requiredEnvVars = [
    'VITE_FIREBASE_API',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !import.meta.env[envVar]);
if (missingEnvVars.length > 0) {
    console.error('Missing Firebase environment variables:', missingEnvVars);
    console.error('Please check your .env file and ensure all Firebase config variables are set.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);

// Initialize Firestore with settings to avoid CORS issues
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: false, // Disable long polling
    experimentalAutoDetectLongPolling: false,
});

export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Connection status tracking
let isOnline = navigator.onLine;
let firebaseAvailable = true;

// Test Firebase availability on startup
const testFirebaseConnection = async () => {
    try {
        // Simple test - just try to access Firestore
        const testRef = doc(db, '_test', 'connection');
        await getDoc(testRef);
        firebaseAvailable = true;
        console.log('Firebase connection: OK');
    } catch (error) {
        firebaseAvailable = false;
        console.warn('Firebase connection: FAILED - using localStorage fallback');
        console.warn('Error:', error.message);
    }
};

// Test connection on load
if (typeof window !== 'undefined') {
    testFirebaseConnection();
    
    // Monitor online/offline status
    window.addEventListener('online', () => {
        isOnline = true;
        testFirebaseConnection();
    });
    
    window.addEventListener('offline', () => {
        isOnline = false;
        firebaseAvailable = false;
    });
}

export { isOnline, firebaseAvailable, testFirebaseConnection };

export default app;
