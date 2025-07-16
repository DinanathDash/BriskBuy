import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { getAllProducts } from '../../Firebase/products';
import { useCart } from '../../Contexts/CartContext';
import { useAuth } from '../../Contexts/AuthContext';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import LoginModal from '../../components/Auth/LoginModal';
import SignupModal from '../../components/Auth/SignupModal';
import HeroCarousel from '../../components/HeroCarousel';
import useAutoSignInPrompt from '../../hooks/useAutoSignInPrompt';
import OrbLoader from '../../components/ui/OrbLoader';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  // Auto sign-in prompt after 3 seconds
  const { showPrompt, closePrompt } = useAutoSignInPrompt(currentUser, 3000);

  // Show login modal when auto prompt triggers
  useEffect(() => {
    if (showPrompt) {
      setIsLoginModalOpen(true);
    }
  }, [showPrompt]);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const { products, error } = await getAllProducts();
      if (!error) {
        // Get first 12 products as featured
        setFeaturedProducts(products.slice(0, 12));
      } else {
        console.error('Failed to load products:', error);
        if (error.includes('CORS') || error.includes('Network')) {
          toast.error('Connection issue detected. Please refresh the page and try again.');
        } else {
          toast.error(`Failed to load products: ${error}`);
        }
      }
    } catch (error) {
      console.error('Unexpected error loading products:', error);
      toast.error('Failed to load products. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OrbLoader size={200} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Categories Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="pb-4 sm:pb-6 font-bold text-2xl sm:text-3xl">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {[
              { name: 'Fashion', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop', category: 'fashion' },
              { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop', category: 'electronics' },
              { name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop', category: 'kitchen' },
              { name: 'Books', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop', category: 'books' },
              { name: 'Sports', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop', category: 'sports' },
              { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop', category: 'beauty' }
            ].map((category, index) => (
              <Link key={index} to={`/products?category=${category.category}`}>
                <div className="relative group cursor-pointer overflow-hidden rounded-lg h-24 sm:h-32 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  {/* Background Image */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 z-10 backdrop-blur-xs bg-black/20">
                    <h6 className="text-white font-bold text-xs sm:text-sm">
                      {category.name}
                    </h6>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 gap-4 sm:gap-0">
            <h2 className="font-bold text-2xl sm:text-3xl">
              Featured Products
            </h2>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <div className="relative group cursor-pointer overflow-hidden rounded-lg h-40 sm:h-48 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  {/* Background Image */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 z-10 backdrop-blur-xs bg-black/20">
                    <div className="text-white font-semibold text-xs mb-1 line-clamp-2 flex justify-between">
                      <span className="flex-1 mr-1 sm:mr-2 truncate text-xs sm:text-sm">{product.name}</span>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-white">{product.ratings}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs sm:text-sm">
                        ${product.price}
                      </span>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="h-5 sm:h-6 px-1.5 sm:px-2 bg-white/20 hover:bg-white/30 text-white border-white/30"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                          disabled={!product.isAvailable}
                        >
                          <ShoppingCart className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-4 sm:mb-6 font-bold text-2xl sm:text-3xl lg:text-4xl">
            Why Choose BriskBuy?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'Fast Delivery',
                description: 'Get your orders delivered quickly with our express shipping options.',
                icon: '🚚'
              },
              {
                title: 'Secure Payments',
                description: 'Shop with confidence using our secure payment gateway.',
                icon: '🔒'
              },
              {
                title: 'Quality Products',
                description: 'We ensure all products meet our high-quality standards.',
                icon: '⭐'
              },
              {
                title: '24/7 Support',
                description: 'Our customer support team is here to help you anytime.',
                icon: '💬'
              }
            ].map((feature, index) => (
              <div key={index} className="col-span-1">
                <Card className="text-center h-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-3xl sm:text-4xl mb-2">{feature.icon}</div>
                    <h6 className="font-semibold mb-2 text-base sm:text-lg">
                      {feature.title}
                    </h6>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          closePrompt();
        }}
        onSwitchToSignup={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => {
          setIsSignupModalOpen(false);
          closePrompt();
        }}
        onSwitchToLogin={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
};

export default Home;
