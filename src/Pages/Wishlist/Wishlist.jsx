import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useWishlist } from '../../Contexts/WishlistContext';
import { useCart } from '../../Contexts/CartContext';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import OrbLoader from '../../components/ui/OrbLoader';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async (item) => {
    try {
      // Add to cart first
      addToCart(item, 1);
      
      // Then remove from wishlist
      const result = await removeFromWishlist(item.productId);
      if (result.success) {
        toast.success('Added to cart and removed from wishlist');
      } else {
        toast.error('Added to cart but failed to remove from wishlist');
      }
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    const result = await removeFromWishlist(productId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OrbLoader size={200} />
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <Container maxWidth="lg" className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="text-center">
          <Heart className="h-16 w-16 sm:h-24 sm:w-24 mx-auto text-gray-400 mb-4 sm:mb-6" />
          <Typography variant="h4" className="font-bold mb-4 text-xl sm:text-2xl lg:text-3xl">Your wishlist is empty</Typography>
          <Typography variant="body1" className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Save items you love and check them out later.
          </Typography>
          <Button asChild size="lg" className="mt-4 w-full sm:w-auto">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-4 sm:py-8 px-4 sm:px-6">
      <Typography variant="h4" component="h1" className="font-bold pb-6 sm:pb-8 text-xl sm:text-2xl lg:text-3xl">
        My Wishlist ({wishlistItems.length} items)
      </Typography>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <Link to={`/products/${item.productId}`}>
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1 sm:top-2 sm:right-2 h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/80 hover:bg-white"
                  onClick={() => handleRemoveFromWishlist(item.productId)}
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                </Button>
              </div>

              <div className="p-2 sm:p-4">
                <Link to={`/products/${item.productId}`}>
                  <Typography variant="h6" className="font-semibold mb-2 line-clamp-2 hover:text-blue-600 transition-colors text-sm sm:text-base">
                    {item.name}
                  </Typography>
                </Link>

                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{item.ratings}</span>
                </div>

                <Typography variant="h6" className="font-bold text-lg mb-3">
                  ${item.price}
                </Typography>

                <div className="space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.isAvailable}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {item.isAvailable ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleRemoveFromWishlist(item.productId)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    </Container>
  );
};

export default Wishlist;
