# BriskBuy - Modern React E-commerce Store

A fully-featured e-commerce application built with React, Firebase, and modern UI components.

## 🚀 Features

- **Authentication**: Email/password and Google authentication with Firebase
- **Product Management**: Browse products with categories, search, and filters
- **Shopping Cart**: Add/remove items, quantity management, coupon system
- **Checkout**: Secure checkout with delivery information and payment options
- **Order Management**: View order history and tracking
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: ShadCN UI components with Material UI grid system
- **Real-time Updates**: Firebase integration for real-time data

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Material UI
- **UI Components**: ShadCN UI
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Routing**: React Router DOM
- **State Management**: Context API
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📁 Project Structure

```
src/
├── Assets/              # Static assets
├── Components/          # Reusable UI components
│   ├── ui/             # ShadCN UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   └── DevPanel.jsx    # Development tools
├── Constants/           # App constants and configurations
├── Contexts/            # React Context providers
│   ├── AuthContext.jsx # Authentication state
│   └── CartContext.jsx # Shopping cart state
├── Firebase/            # Firebase configuration and services
│   ├── config.js       # Firebase setup
│   ├── auth.js         # Authentication services
│   ├── products.js     # Product operations
│   └── orders.js       # Order management
├── Hooks/               # Custom React hooks
├── Layouts/             # Layout components
├── Pages/               # Page components
│   ├── Home/           # Landing page
│   ├── ProductList/    # Product catalog
│   ├── ProductDetails/ # Individual product view
│   ├── Cart/           # Shopping cart
│   ├── Checkout/       # Checkout process
│   ├── Auth/           # Login/Signup
│   └── Orders/         # Order history
├── Routes/              # Routing configuration
└── Utils/               # Utility functions
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd BriskBuy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Firebase Setup**:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Enable Storage (optional)
   - Copy your Firebase config

4. **Configure Firebase**:
   Update `src/Firebase/config.js` with your Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Upload sample products** (Development):
   - Click the "Upload Sample Products" button in the dev panel (bottom right)
   - This will populate your Firestore with sample product data

## 🔥 Firebase Configuration

### Firestore Collections

The app uses the following Firestore collections:

- **products**: Product catalog
- **users**: User profiles and cart data
- **orders**: Order history

### Security Rules

Update your Firestore security rules:

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
    }
  }
}
```

## 🛍️ Key Features Explained

### Product Management
- Products support variants (size/color) for fashion items
- Search functionality with real-time filtering
- Category-based browsing
- Price range and rating filters
- Grid/List view toggle

### Shopping Cart
- Persistent cart storage in Firebase
- Quantity management
- Coupon system with predefined codes:
  - `WELCOME10`: 10% off
  - `SAVE20`: 20% off
  - `SUMMER15`: 15% off
- Save for later functionality

### Checkout Process
- Protected routes (login required)
- Delivery information form
- Payment modal with COD/Online options
- Order confirmation and tracking

### Authentication
- Email/password registration and login
- Google OAuth integration
- Protected routes for checkout and orders
- User session persistence

## 🎨 Customization

### Adding New Products
Use the dev panel or create a script to batch upload products:

```javascript
import { batchAddProducts } from './src/Firebase/products';

const newProducts = [
  {
    name: "Product Name",
    category: "category",
    description: "Product description",
    price: 99.99,
    imageUrl: "https://example.com/image.jpg",
    sizes: ["S", "M", "L"], // For fashion items
    colors: ["Red", "Blue"], // For fashion items
    type: "fashion", // or "electronics", "kitchen", etc.
    ratings: 4.5,
    isAvailable: true,
    stock: 100
  }
];

await batchAddProducts(newProducts);
```

### Styling
- Customize colors in `tailwind.config.js`
- Modify component styles in respective files
- Update ShadCN UI theme in `src/components/ui/`

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Collapsible navigation menu
- Touch-friendly interactions
- Optimized layouts for all screen sizes

## 🔧 Development Tools

### Dev Panel (Development Only)
- Quick product upload functionality
- Visible only in development mode
- Located at bottom-right of the screen

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 🚀 Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**:
   - Vercel: Connect GitHub repo
   - Netlify: Drag and drop `dist` folder
   - Firebase Hosting: `firebase deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Firebase connection errors**:
   - Verify Firebase config is correct
   - Check Firebase project settings
   - Ensure Firestore is enabled

2. **Authentication issues**:
   - Enable required auth providers in Firebase Console
   - Check domain whitelist for Google Auth

3. **Build errors**:
   - Clear node_modules and reinstall
   - Check for TypeScript/ESLint errors

### Getting Help

- Check the browser console for errors
- Review Firebase console for backend issues
- Ensure all environment variables are set correctly

---

Happy coding! 🛒✨+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
