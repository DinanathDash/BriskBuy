import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Home from '../Pages/Home/Home';
import ProductList from '../Pages/ProductList/ProductList';
import ProductDetails from '../Pages/ProductDetails/ProductDetails';
import Cart from '../Pages/Cart/Cart';
import Checkout from '../Pages/Checkout/Checkout';
import Orders from '../Pages/Orders/Orders';
import Wishlist from '../Pages/Wishlist/Wishlist';

// Support Pages
import HelpCenter from '../Pages/Support/HelpCenter';
import ShippingInfo from '../Pages/Support/ShippingInfo';
import ReturnsExchanges from '../Pages/Support/ReturnsExchanges';
import SizeGuide from '../Pages/Support/SizeGuide';
import TrackOrder from '../Pages/Support/TrackOrder';

// Legal Pages
import PrivacyPolicy from '../Pages/Legal/PrivacyPolicy';
import TermsOfService from '../Pages/Legal/TermsOfService';
import CookiePolicy from '../Pages/Legal/CookiePolicy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'products',
        element: <ProductList />
      },
      {
        path: 'products/:id',
        element: <ProductDetails />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'wishlist',
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        )
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        )
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        )
      },
      // Support Pages
      {
        path: 'help-center',
        element: <HelpCenter />
      },
      {
        path: 'shipping-info',
        element: <ShippingInfo />
      },
      {
        path: 'returns-exchanges',
        element: <ReturnsExchanges />
      },
      {
        path: 'size-guide',
        element: <SizeGuide />
      },
      {
        path: 'track-order',
        element: <TrackOrder />
      },
      // Legal Pages
      {
        path: 'privacy-policy',
        element: <PrivacyPolicy />
      },
      {
        path: 'terms-of-service',
        element: <TermsOfService />
      },
      {
        path: 'cookie-policy',
        element: <CookiePolicy />
      }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
