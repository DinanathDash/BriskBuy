import React from 'react';
import { AuthProvider } from './Contexts/AuthContext';
import { CartProvider } from './Contexts/CartContext';
import { WishlistProvider } from './Contexts/WishlistContext';
import AppRouter from './Routes/AppRouter';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppRouter />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
