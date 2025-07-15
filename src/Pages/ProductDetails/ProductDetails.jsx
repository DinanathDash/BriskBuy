import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { getProductById } from '../../Firebase/products';
import { useCart } from '../../Contexts/CartContext';
import { Star, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import OrbLoader from '../../components/ui/OrbLoader';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const { product: productData, error } = await getProductById(id);
      if (!error) {
        setProduct(productData);
        // Set default selections for fashion items
        if (productData.type === 'fashion') {
          if (productData.sizes && productData.sizes.length > 0) {
            setSelectedSize(productData.sizes[0]);
          }
          if (productData.colors && productData.colors.length > 0) {
            setSelectedColor(productData.colors[0]);
          }
        }
      } else {
        toast.error('Product not found');
        navigate('/products');
      }
    } catch (error) {
      toast.error('Failed to load product');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product.type === 'fashion' && (!selectedSize || !selectedColor)) {
      toast.error('Please select size and color');
      return;
    }
    
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available in stock`);
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OrbLoader size={200} />
      </div>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" className="py-8">
        <div className="text-center">
          <Typography variant="h5" className="mb-4">Product not found</Typography>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <div className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <Typography variant="h3" component="h1" className="font-bold mb-2">
                {product.name}
              </Typography>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{product.ratings}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className={`text-sm font-medium ${
                  product.stock <= 10 ? 'text-red-600' : 
                  product.stock <= 20 ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {product.stock <= 0 ? 'Out of Stock' :
                   product.stock <= 10 ? `Only ${product.stock} left!` :
                   product.stock <= 20 ? `${product.stock} in stock` :
                   'In Stock'
                  }
                </span>
              </div>
              <Typography variant="h4" className="font-bold text-primary mb-4">
                ${product.price}
              </Typography>
            </div>

            <div>
              <Typography variant="h6" className="font-semibold mb-2">Description</Typography>
              <Typography variant="body1" className="text-gray-600">
                {product.description}
              </Typography>
            </div>

            {/* Size Selection for Fashion Items */}
            {product.type === 'fashion' && product.sizes && (
              <div>
                <Typography variant="h6" className="font-semibold mb-3">Size</Typography>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection for Fashion Items */}
            {product.type === 'fashion' && product.colors && (
              <div>
                <Typography variant="h6" className="font-semibold mb-3">Color</Typography>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <Typography variant="h6" className="font-semibold mb-3">Quantity</Typography>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <Button 
                className="flex-1" 
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.isAvailable}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Info */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className={product.isAvailable ? 'text-green-600' : 'text-red-600'}>
                      {product.isAvailable ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="capitalize">{product.type}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
