# BriskBuy - Modern React E-commerce Store

A fully-featured e-commerce application built with React, Firebase, and modern UI components featuring a beautiful, responsive design with advanced shopping capabilities.

## 🚀 Features

### 🔐 Authentication & User Management
- **Firebase Authentication**: Email/password and Google OAuth integration
- **User Profiles**: Persistent user data and preferences
- **Protected Routes**: Secure access to checkout and order history
- **Session Management**: Automatic login persistence

### 🛍️ Product Catalog
- **Multi-Category Support**: Fashion, Electronics, Kitchen, Books, Sports, Beauty, Home
- **Advanced Search**: Real-time search with multiple filters
- **Product Variants**: Size and color options for fashion items
- **Product Details**: Comprehensive product pages with image galleries
- **Rating System**: Product ratings and reviews
- **Stock Management**: Real-time inventory tracking

### 🛒 Shopping Experience
- **Smart Shopping Cart**: Persistent cart with Firebase sync
- **Quantity Management**: Easy item quantity updates
- **Coupon System**: Built-in discount codes (WELCOME10, SAVE20, SUMMER15)
- **Wishlist**: Save items for later with heart toggle
- **Gift Options**: Gift wrapping and special delivery options
- **Save for Later**: Move items between cart and saved items

### 💳 Checkout & Orders
- **Secure Checkout**: Protected checkout flow with validation
- **Multiple Payment Options**: Cash on Delivery and Online payment support
- **Delivery Information**: Comprehensive address and delivery preferences
- **Order Management**: Complete order history and tracking
- **Order Status**: Real-time order status updates

### 🎨 Design & UX
- **Responsive Design**: Mobile-first approach with seamless tablet/desktop scaling
- **Modern UI**: ShadCN UI components with Radix UI primitives
- **Material Design**: Material UI grid system and components
- **Dark/Light Mode**: Theme switching with next-themes
- **Smooth Animations**: CSS animations and transitions
- **Interactive Elements**: Hover effects and micro-interactions

### 🔧 Additional Features
- **Developer Tools**: Dev panel for product upload (development only)
- **Real-time Updates**: Firebase real-time database synchronization
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Skeleton loaders and progress indicators
- **SEO Optimized**: Proper meta tags and structured data
- **Legal Pages**: Privacy Policy, Terms of Service, Cookie Policy
- **Support System**: Help Center, Shipping Info, Returns & Exchanges

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and context
- **Vite 7**: Lightning-fast build tool and dev server
- **React Router DOM 7**: Client-side routing with nested routes
- **TypeScript Support**: Full TypeScript configuration ready

### Styling & UI
- **Tailwind CSS 4**: Utility-first CSS framework with latest features
- **ShadCN UI**: High-quality component library built on Radix UI
- **Radix UI**: Headless, accessible component primitives
- **Material UI 7**: Comprehensive component library
- **Lucide React**: Beautiful, customizable icons
- **CSS Animations**: Smooth transitions and micro-interactions

### Backend & Database
- **Firebase 11**: Complete backend-as-a-service
  - **Authentication**: Email/password + Google OAuth
  - **Firestore**: NoSQL database with real-time updates
  - **Storage**: File storage for product images
  - **Security Rules**: Granular access control

### State Management
- **React Context API**: Global state management for auth, cart, and wishlist
- **Custom Hooks**: Reusable logic for common operations
- **Local Storage**: Fallback cart persistence

### Developer Experience
- **ESLint**: Code linting with modern rules
- **Vite Hot Reload**: Instant development feedback
- **Environment Variables**: Secure configuration management
- **Development Tools**: Built-in dev panel for testing

## 📁 Project Structure

```
src/
├── assets/              # Static assets (images, icons)
│   ├── amex.svg        # Payment method icons
│   ├── mastercard.svg
│   ├── rupay.svg
│   └── react.svg
├── components/          # Reusable UI components
│   ├── ui/             # ShadCN UI components
│   │   ├── button.jsx  # Button component
│   │   ├── card.jsx    # Card layouts
│   │   ├── input.jsx   # Form inputs
│   │   ├── dialog.jsx  # Modal dialogs
│   │   ├── carousel.jsx # Image carousels
│   │   ├── Orb.jsx     # 3D animated orb
│   │   └── ...         # 25+ UI components
│   ├── Auth/           # Authentication components
│   │   ├── LoginModal.jsx
│   │   └── SignupModal.jsx
│   ├── CartStatusIndicator.jsx # Cart badge
│   ├── DevPanel.jsx    # Development tools
│   ├── Footer.jsx      # Site footer
│   ├── Header.jsx      # Navigation header
│   ├── HeroCarousel.jsx # Homepage carousel
│   └── ScrollToTop.jsx # Scroll behavior
├── Constants/           # App constants and configurations
│   └── index.js        # Categories, coupons, filters
├── Contexts/            # React Context providers
│   ├── AuthContext.jsx # Authentication state
│   ├── CartContext.jsx # Shopping cart state
│   └── WishlistContext.jsx # Wishlist management
├── Firebase/            # Firebase configuration and services
│   ├── config.js       # Firebase setup & environment config
│   ├── auth.js         # Authentication services
│   ├── products.js     # Product CRUD operations
│   ├── orders.js       # Order management
│   ├── wishlist.js     # Wishlist operations
│   ├── sampleData.js   # Development sample data
│   └── connectionTest.js # Firebase connection testing
├── hooks/               # Custom React hooks
│   ├── use-mobile.js   # Mobile device detection
│   ├── useAutoSignInPrompt.js # Auto sign-in suggestions
│   └── useProductUpload.js # Product upload utilities
├── Layouts/             # Layout components
│   └── MainLayout.jsx  # Main app layout wrapper
├── lib/                 # Utility libraries
│   └── utils.js        # Tailwind utilities and helpers
├── Pages/               # Page components
│   ├── Home/           # Landing page with hero section
│   ├── ProductList/    # Product catalog with filters
│   ├── ProductDetails/ # Individual product view
│   ├── Cart/           # Shopping cart with coupons
│   ├── Checkout/       # Secure checkout process
│   ├── Orders/         # Order history and tracking
│   ├── Wishlist/       # Saved items management
│   ├── Auth/           # Login/Signup pages
│   ├── Support/        # Customer support pages
│   │   ├── HelpCenter.jsx
│   │   ├── ShippingInfo.jsx
│   │   ├── ReturnsExchanges.jsx
│   │   ├── SizeGuide.jsx
│   │   └── TrackOrder.jsx
│   └── Legal/          # Legal and policy pages
│       ├── PrivacyPolicy.jsx
│       ├── TermsOfService.jsx
│       └── CookiePolicy.jsx
├── Routes/              # Routing configuration
│   ├── AppRouter.jsx   # Main router with all routes
│   └── ProtectedRoute.jsx # Authentication guards
└── Utils/               # Utility functions
    ├── localStorageCart.js # Local cart persistence
    └── uploadProducts.js   # Product upload helpers
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Firebase project** - [Create one here](https://console.firebase.google.com)
- **Git** for cloning the repository

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DinanathDash/BriskBuy.git
   cd BriskBuy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Firebase Setup**:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication:
     - Go to Authentication → Sign-in method
     - Enable Email/Password and Google providers
   - Create a Firestore database:
     - Go to Firestore Database → Create database
     - Choose production mode with proper security rules
   - Enable Storage (optional for product images):
     - Go to Storage → Get started
   - Copy your Firebase configuration

4. **Environment Configuration**:
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

6. **Upload sample products** (Development):
   - Click the "Upload Sample Products" button in the dev panel (bottom right)
   - This will populate your Firestore with sample product data
   - Dev panel only appears in development mode

### Quick Development Setup
```bash
# One-liner setup (after cloning)
npm install && npm run dev
```

## 🔥 Firebase Configuration

### Firestore Collections

The app uses the following Firestore collections:

- **products**: Product catalog with variants, pricing, and inventory
  ```javascript
  {
    id: "product-id",
    name: "Product Name",
    category: "fashion",
    description: "Product description",
    price: 99.99,
    imageUrl: "https://example.com/image.jpg",
    sizes: ["S", "M", "L"], // For fashion items
    colors: ["Red", "Blue"], // For fashion items
    type: "fashion",
    ratings: 4.5,
    isAvailable: true,
    stock: 100,
    createdAt: timestamp
  }
  ```

- **users**: User profiles, cart data, and preferences
  ```javascript
  {
    uid: "user-id",
    email: "user@example.com",
    displayName: "User Name",
    cart: [...], // Cart items
    wishlist: [...], // Wishlist items
    createdAt: timestamp
  }
  ```

- **orders**: Order history and tracking information
  ```javascript
  {
    id: "order-id",
    userId: "user-id",
    items: [...],
    total: 149.99,
    status: "confirmed",
    deliveryInfo: {...},
    paymentMethod: "cod",
    createdAt: timestamp
  }
  ```

### Security Rules

Update your Firestore security rules for proper access control:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products are readable by all, writable by authenticated users (for demo)
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Orders are readable/writable by the order owner
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### Authentication Configuration

Enable the following authentication methods in Firebase Console:

1. **Email/Password**:
   - Go to Authentication → Sign-in method
   - Enable Email/Password provider

2. **Google OAuth**:
   - Enable Google provider
   - Add your domain to authorized domains
   - Configure OAuth consent screen

### Environment Variables

The app uses environment variables for Firebase configuration:
- `VITE_FIREBASE_API`: Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN`: Auth domain
- `VITE_FIREBASE_PROJECT_ID`: Project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Messaging sender ID
- `VITE_FIREBASE_APP_ID`: App ID

## 🛍️ Key Features Explained

### Product Management
- **Multi-Category Support**: Fashion, Electronics, Kitchen, Books, Sports, Beauty, Home
- **Product Variants**: Size and color options for fashion items
- **Advanced Search**: Real-time search with category and price filters
- **Sorting Options**: Name, price, rating, and date sorting
- **Price Range Filters**: Under $25, $25-$50, $50-$100, $100-$200, Over $200
- **Rating Filters**: Filter by star ratings (1+ to 4+ stars)
- **Stock Management**: Real-time inventory tracking
- **Grid/List Views**: Toggle between different product display modes

### Shopping Cart
- **Persistent Storage**: Cart synced with Firebase and localStorage fallback
- **Quantity Management**: Easy increment/decrement controls
- **Coupon System**: Built-in discount codes with validation:
  - `WELCOME10`: 10% off on first order
  - `SAVE20`: 20% off on orders above $100  
  - `SUMMER15`: 15% summer discount
- **Gift Options**: Gift wrapping with additional cost
- **Save for Later**: Move items between cart and saved list
- **Real-time Totals**: Automatic calculation of subtotal, discount, and total
- **Item Selection**: Select specific items for checkout

### Checkout Process
- **Protected Routes**: Login required for secure checkout
- **Delivery Information**: Comprehensive address and contact forms
- **Payment Options**: 
  - Cash on Delivery (COD)
  - Online Payment (UPI, Cards, Net Banking)
- **Order Summary**: Detailed breakdown of items, discounts, and totals
- **Order Confirmation**: Immediate order placement with tracking ID
- **Email Notifications**: Order confirmation emails

### Wishlist System
- **Heart Toggle**: Easy add/remove from product cards
- **Persistent Storage**: Wishlist synced across devices
- **Quick Actions**: Move to cart directly from wishlist
- **Product Cards**: Full product information in wishlist view

### Authentication Flow
- **Email/Password**: Traditional registration and login
- **Google OAuth**: One-click Google sign-in
- **Auto Sign-in Prompt**: Smart prompts for returning users
- **Protected Routes**: Automatic redirection for authenticated content
- **Session Persistence**: Stay logged in across browser sessions
- **Profile Management**: User profile and preferences

### Order Management
- **Order History**: Complete order tracking and history
- **Order Status**: Real-time status updates (Pending, Confirmed, Shipped, Delivered)
- **Order Details**: Comprehensive order information and item breakdown
- **Reorder Functionality**: Quick reorder from order history

## 🎨 Customization

### Adding New Products

#### Using the Dev Panel (Development)
1. Start the development server (`npm run dev`)
2. Click the "Upload Sample Products" button in the bottom-right dev panel
3. Sample products from `src/Firebase/sampleData.js` will be uploaded

#### Programmatic Product Upload
Create a script to batch upload products:

```javascript
import { batchAddProducts } from './src/Firebase/products';

const newProducts = [
  {
    name: "Premium T-Shirt",
    category: "fashion",
    description: "Comfortable cotton t-shirt with modern fit",
    price: 29.99,
    imageUrl: "https://example.com/tshirt.jpg",
    sizes: ["S", "M", "L", "XL"], // For fashion items
    colors: ["Black", "White", "Navy"], // For fashion items
    type: "fashion",
    ratings: 4.5,
    isAvailable: true,
    stock: 50
  },
  {
    name: "Wireless Headphones",
    category: "electronics", 
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    imageUrl: "https://example.com/headphones.jpg",
    type: "electronics",
    ratings: 4.8,
    isAvailable: true,
    stock: 25
  }
];

await batchAddProducts(newProducts);
```

### Styling Customization

#### Tailwind CSS Configuration
Customize colors and design tokens in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        // Add your custom colors
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

#### Component Styling
- Modify ShadCN UI components in `src/components/ui/`
- Update global styles in `src/index.css`
- Customize component-specific styles in respective page files

#### Theme Configuration
- Dark/Light mode configuration in `src/lib/utils.js`
- Color scheme management with next-themes
- CSS custom properties for consistent theming

### Adding New Categories

Update `src/Constants/index.js`:

```javascript
export const CATEGORIES = [
  'fashion',
  'electronics', 
  'kitchen',
  'books',
  'sports',
  'beauty',
  'home',
  'toys', // New category
  'automotive' // New category
];
```

### Adding New Coupon Codes

Add to the COUPONS array in `src/Constants/index.js`:

```javascript
export const COUPONS = [
  { code: 'WELCOME10', discount: 10, description: '10% off on first order' },
  { code: 'SAVE20', discount: 20, description: '20% off on orders above $100' },
  { code: 'SUMMER15', discount: 15, description: '15% summer discount' },
  { code: 'NEWUSER25', discount: 25, description: '25% off for new users' }, // New coupon
];
```

### Customizing Payment Options

Modify payment methods in checkout components:
- Update `src/Pages/Checkout/Checkout.jsx`
- Add new payment gateways (Stripe, PayPal, etc.)
- Configure payment processing logic

### Adding New Pages

1. Create page component in appropriate `src/Pages/` subdirectory
2. Add route to `src/Routes/AppRouter.jsx`
3. Update navigation in `src/components/Header.jsx`
4. Add to protected routes if authentication required

## 📱 Responsive Design

The application features a comprehensive responsive design system:

### Mobile-First Approach
- **Breakpoint Strategy**: Designed for mobile screens first, then enhanced for larger devices
- **Touch-Friendly**: All interactive elements optimized for touch input
- **Gesture Support**: Swipe gestures for carousels and navigation

### Layout Adaptations
- **Navigation**: Collapsible hamburger menu for mobile, full navigation bar for desktop
- **Product Grid**: 1 column on mobile, 2 on tablet, 3-4 on desktop
- **Cart & Checkout**: Simplified single-column layout on mobile, multi-column on desktop
- **Modals**: Full-screen on mobile, centered dialogs on desktop

### Performance Optimizations
- **Lazy Loading**: Images and components loaded on demand
- **Virtual Scrolling**: Efficient rendering for large product lists
- **Code Splitting**: Route-based code splitting for faster initial load
- **Image Optimization**: Responsive images with WebP format support

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader**: ARIA labels and semantic HTML structure
- **High Contrast**: Proper color contrast ratios for readability
- **Focus Management**: Visible focus indicators and logical tab order

## 🔧 Development Tools

### Dev Panel (Development Only)
Located at the bottom-right of the screen in development mode:
- **Product Upload**: Quick upload of sample products to Firestore
- **Database Tools**: Clear collections and reset data
- **Auth Testing**: Quick login/logout for testing
- **Environment Info**: Display current configuration

### Available Scripts

```bash
# Development
npm run dev          # Start development server on localhost:5173
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality

# Development utilities
npm run clean        # Clean build artifacts
npm run type-check   # TypeScript type checking (if configured)
```

### Browser Developer Tools
- **React Developer Tools**: Inspect React component tree and state
- **Firebase Console**: Monitor database, authentication, and analytics
- **Network Tab**: Monitor API calls and performance
- **Console**: Debug logs and error messages

### Code Quality Tools
- **ESLint**: Automated code linting with React-specific rules
- **Prettier**: Code formatting (configure in `.prettierrc`)
- **Husky**: Git hooks for pre-commit validation (optional)
- **TypeScript**: Type checking and intelliSense support

## 🚀 Deployment

### Production Build

1. **Build the project**:
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `dist/` directory.

2. **Test the build locally**:
   ```bash
   npm run preview
   ```

### Deployment Options

#### Vercel (Recommended)
1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **GitHub Integration**:
   - Connect your GitHub repository to Vercel
   - Automatic deployments on push to main branch
   - Environment variables can be set in Vercel dashboard

#### Netlify
1. **Manual Deploy**:
   - Run `npm run build`
   - Drag and drop the `dist/` folder to Netlify

2. **Git Integration**:
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

#### Firebase Hosting
1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase Hosting**:
   ```bash
   firebase init hosting
   ```

3. **Deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

### Environment Variables for Production

Set these environment variables in your deployment platform:

```env
VITE_FIREBASE_API=your-production-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Performance Optimization

Before deployment:
- **Bundle Analysis**: Use `npm run build -- --analyze` to check bundle size
- **Image Optimization**: Compress and optimize all images
- **Code Splitting**: Ensure proper route-based code splitting
- **Firebase Rules**: Update security rules for production
- **Domain Configuration**: Add your domain to Firebase Auth authorized domains

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/BriskBuy.git
   ```

3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**:
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

5. **Test thoroughly**:
   ```bash
   npm run lint
   npm run build
   npm run preview
   ```

6. **Commit your changes**:
   ```bash
   git commit -m "feat: add your feature description"
   ```

7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Submit a pull request**

### Contribution Guidelines

- **Code Style**: Follow the existing ESLint configuration
- **Commit Messages**: Use conventional commit format (feat:, fix:, docs:)
- **Testing**: Add tests for new features and bug fixes
- **Documentation**: Update README and component documentation
- **Performance**: Ensure changes don't negatively impact performance

### Areas for Contribution

- **UI/UX Improvements**: Enhanced animations, better mobile experience
- **New Features**: Additional payment methods, product reviews, admin panel
- **Performance**: Optimization, caching, lazy loading improvements
- **Testing**: Unit tests, integration tests, E2E tests
- **Documentation**: Better code comments, API documentation
- **Accessibility**: WCAG compliance improvements

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for full details.

### What this means:
- ✅ **Commercial use**: Use for commercial purposes
- ✅ **Modification**: Modify and create derivative works
- ✅ **Distribution**: Distribute original or modified versions
- ✅ **Private use**: Use privately for personal projects
- ✅ **Patent use**: Use any patents that may be included
- ❌ **Liability**: No liability from the author
- ❌ **Warranty**: No warranty provided

### Attribution
When using this project, please include:
- Copyright notice: `Copyright (c) 2025 Dinanath Dash`
- MIT License text (found in [LICENSE](LICENSE) file)
- Link back to this repository (optional but appreciated)

### Third-Party Licenses
This project uses several open-source libraries. Their licenses are:
- **React**: MIT License
- **Firebase**: Apache License 2.0
- **Tailwind CSS**: MIT License
- **ShadCN UI**: MIT License
- **Radix UI**: MIT License
- **Material UI**: MIT License

All dependencies maintain their respective licenses as listed in `package.json`.

## 🆘 Troubleshooting

### Common Issues

#### Firebase Connection Errors
**Problem**: "Firebase connection failed" or authentication errors

**Solutions**:
1. **Verify Firebase Configuration**:
   ```bash
   # Check if all environment variables are set
   echo $VITE_FIREBASE_API
   ```

2. **Check Firebase Project Settings**:
   - Ensure project ID matches in `.env` file
   - Verify API key is not restricted
   - Check Firebase project is active

3. **Firestore Database Issues**:
   - Ensure Firestore is enabled in Firebase Console
   - Check security rules allow read/write operations
   - Verify indexes are properly configured

#### Authentication Issues
**Problem**: Google OAuth or email authentication not working

**Solutions**:
1. **Google OAuth**:
   - Enable Google provider in Firebase Console
   - Add your domain to authorized domains
   - Check OAuth consent screen configuration

2. **Email/Password**:
   - Enable Email/Password provider
   - Verify email templates are configured
   - Check password policy settings

3. **Domain Authorization**:
   ```javascript
   // Add to Firebase Auth authorized domains:
   // localhost (for development)
   // your-domain.com (for production)
   ```

#### Build and Development Errors
**Problem**: Build fails or development server won't start

**Solutions**:
1. **Clear Dependencies**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node Version**:
   ```bash
   node --version  # Should be v16 or higher
   npm --version
   ```

3. **Environment Variables**:
   ```bash
   # Ensure .env file exists and has all required variables
   cat .env
   ```

4. **Port Conflicts**:
   ```bash
   # Change port if 5173 is occupied
   npm run dev -- --port 3000
   ```

#### Performance Issues
**Problem**: Slow loading or high memory usage

**Solutions**:
1. **Bundle Size**:
   ```bash
   npm run build -- --analyze
   ```

2. **Image Optimization**:
   - Compress images before uploading
   - Use WebP format for better compression
   - Implement lazy loading for images

3. **Database Optimization**:
   - Add proper Firestore indexes
   - Limit query results with pagination
   - Use Firebase caching

### Development Debugging

#### Debug Mode
Enable detailed logging in development:
```javascript
// Add to src/Firebase/config.js
if (import.meta.env.DEV) {
  window.debugFirebase = true;
}
```

#### Browser Developer Tools
1. **Console Tab**: Check for JavaScript errors
2. **Network Tab**: Monitor API calls and response times
3. **Application Tab**: Inspect localStorage and sessionStorage
4. **Firebase Tab**: Use Firebase extension for debugging

#### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `Firebase: Error (auth/configuration-not-found)` | Missing Firebase config | Check `.env` file |
| `Firebase: Error (auth/network-request-failed)` | Network connectivity | Check internet connection |
| `Firebase: Error (permission-denied)` | Firestore rules | Update security rules |
| `Module not found: Can't resolve` | Missing dependency | Run `npm install` |

### Getting Help

#### Documentation Resources
- **Firebase Docs**: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- **React Docs**: [https://react.dev](https://react.dev)
- **Vite Docs**: [https://vitejs.dev](https://vitejs.dev)
- **Tailwind CSS**: [https://tailwindcss.com](https://tailwindcss.com)

#### Community Support
- **GitHub Issues**: Report bugs and feature requests
- **Firebase Support**: [Firebase Console Support](https://firebase.google.com/support)
- **Stack Overflow**: Tag questions with `firebase`, `react`, `vite`

#### Debug Checklist
Before asking for help:
- [ ] Check browser console for errors
- [ ] Verify all environment variables are set
- [ ] Test with different browsers
- [ ] Check Firebase Console for backend issues
- [ ] Try clearing browser cache and cookies
- [ ] Verify internet connectivity
- [ ] Check if the issue persists in incognito mode

---

## 🌟 Features Roadmap

### Upcoming Features
- **Product Reviews**: User reviews and ratings system
- **Advanced Filters**: Brand, color, and specification filters
- **Admin Dashboard**: Product management and analytics
- **Multiple Currencies**: International currency support
- **Inventory Management**: Low stock alerts and auto-reordering
- **Social Features**: Share products, follow users
- **AI Recommendations**: Personalized product suggestions

### Performance Improvements
- **PWA Support**: Offline functionality and app-like experience
- **Image CDN**: Cloudinary or similar for optimized images
- **Server-Side Rendering**: Next.js migration for better SEO
- **Caching Strategy**: Redis caching for better performance

---

**Happy coding! 🛒✨**

*BriskBuy - Where shopping meets innovation*
