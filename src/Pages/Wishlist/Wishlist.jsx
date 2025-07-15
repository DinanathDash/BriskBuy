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
      <Container maxWidth="lg" className="py-16">
        <div className="text-center">
          <Heart className="h-24 w-24 mx-auto text-gray-400 mb-6" />
          <Typography variant="h4" className="font-bold mb-4">Your wishlist is empty</Typography>
          <Typography variant="body1" className="text-gray-600 mb-8">
            Save items you love and check them out later.
          </Typography>
          <Button asChild size="lg" className="mt-4">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" component="h1" className="font-bold pb-8">
        My Wishlist ({wishlistItems.length} items)
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  onClick={() => handleRemoveFromWishlist(item.productId)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="p-4">
                <Link to={`/products/${item.productId}`}>
                  <Typography variant="h6" className="font-semibold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
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
