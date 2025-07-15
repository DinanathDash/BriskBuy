import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Grid, Container, Typography, Box } from '@mui/material';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Checkbox } from '../../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { getAllProducts, getProductsByCategory, searchProducts } from '../../Firebase/products';
import { useCart } from '../../Contexts/CartContext';
import { CATEGORIES, SORT_OPTIONS, PRICE_RANGES, RATING_OPTIONS } from '../../Constants';
import { ShoppingCart, Star, Grid3x3, List, Filter } from 'lucide-react';
import { toast } from 'sonner';
import OrbLoader from '../../components/ui/OrbLoader';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  // Filter states
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: null,
    minRating: null,
    sortBy: 'name-asc'
  });

  const category = searchParams.get('category');
  const search = searchParams.get('search');

  useEffect(() => {
    loadProducts();
  }, [category, search]);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let result;

      if (search) {
        result = await searchProducts(search);
      } else if (category) {
        result = await getProductsByCategory(category);
      } else {
        result = await getAllProducts();
      }

      if (!result.error) {
        setProducts(result.products);
      } else {
        toast.error('Failed to load products');
      }
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Price range filter
    if (filters.priceRange) {
      const range = PRICE_RANGES.find(r => r.label === filters.priceRange);
      if (range) {
        filtered = filtered.filter(product =>
          product.price >= range.min && product.price <= range.max
        );
      }
    }

    // Rating filter
    if (filters.minRating) {
      filtered = filtered.filter(product => product.ratings >= filters.minRating);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.ratings - a.ratings;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleCategoryFilter = (categoryName, checked) => {
    setFilters(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryName]
        : prev.categories.filter(c => c !== categoryName)
    }));
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
    <div className="min-h-screen bg-gray-50 py-8">
      <Container maxWidth="xl">
        {/* Header */}
        <div className="mb-4">
          <Typography variant="h4" component="h1" className="font-bold mb-2">
            {search ? `Search Results for "${search}"` :
              category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` :
                'All Products'}
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </Typography>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`w-auto space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardHeader className="-mb-6">
                <Typography variant="h6" className="font-semibold">Filters</Typography>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <Typography variant="subtitle2" className="font-medium pb-2">Categories</Typography>
                  <div className="space-y-2">
                    {CATEGORIES.map(cat => (
                      <div key={cat} className="flex items-center space-x-2">
                        <Checkbox
                          id={cat}
                          checked={filters.categories.includes(cat)}
                          onCheckedChange={(checked) => handleCategoryFilter(cat, checked)}
                        />
                        <label htmlFor={cat} className="text-sm capitalize cursor-pointer">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <Typography variant="subtitle2" className="font-medium pb-2">Price Range</Typography>
                  <Select
                    value={filters.priceRange || ''}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRICE_RANGES.map(range => (
                        <SelectItem key={range.label} value={range.label}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div>
                  <Typography variant="subtitle2" className="font-medium pb-2">Minimum Rating</Typography>
                  <Select
                    value={filters.minRating?.toString() || ''}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, minRating: parseFloat(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select minimum rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {RATING_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value.toString()}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Controls */}
            <div className="-mt-14 mb-5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Typography variant="h6" className="text-gray-500 mb-4">
                  No products found
                </Typography>
                <Button asChild>
                  <Link to="/products">Browse All Products</Link>
                </Button>
              </div>
            ) : (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'space-y-4'}`}>
                {filteredProducts.map((product) => (
                  viewMode === 'grid' ? (
                    <Link key={product.id} to={`/products/${product.id}`}>
                      <div className="relative group cursor-pointer overflow-hidden rounded-lg h-48 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                        {/* Background Image */}
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 z-10 backdrop-blur-xs bg-black/20">
                          <div className="text-white font-semibold text-xs mb-1 line-clamp-2 flex justify-between">
                            <span className="flex-1 mr-2 truncate">{product.name}</span>

                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-white">{product.ratings}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <Typography variant="h6" className="font-bold text-white text-sm">
                              ${product.price}
                            </Typography>

                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                className="h-6 px-2 bg-white/20 hover:bg-white/30 text-white border-white/30"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddToCart(product);
                                }}
                                disabled={!product.isAvailable}
                              >
                                <ShoppingCart className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                      </div>
                    </Link>
                  ) : (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow relative">
                      <div className="flex p-4">
                        {/* Product Image */}
                        <Link to={`/products/${product.id}`} className="flex-shrink-0 relative">
                          <div className="w-40 h-40 overflow-hidden rounded-lg bg-gray-100 relative">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 ml-6 flex flex-col justify-between">
                          <div>
                            <Link to={`/products/${product.id}`}>
                              <Typography variant="h5" className="font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 text-xl">
                                {product.name}
                              </Typography>
                            </Link>

                            <div className="flex items-center gap-2 mb-3">
                              <Typography variant="body2" className="text-gray-500 text-sm">
                                Seller: {product.seller || 'BriskBuy'}
                              </Typography>
                            </div>

                            {/* Rating and Free Shipping */}
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < Math.floor(product.ratings) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                                <span className="text-orange-500 font-medium ml-1">{product.ratings}</span>
                              </div>
                              {product.freeShipping && (
                                <span className="text-green-600 font-medium text-sm">Free Shipping</span>
                              )}
                            </div>

                            {/* Pricing */}
                            <div className="flex items-center gap-3 mb-4">
                              <Typography variant="h4" className="font-bold text-gray-900 text-2xl">
                                ${product.price}
                              </Typography>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <Typography variant="body1" className="text-gray-500 line-through">
                                  ${product.originalPrice}
                                </Typography>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="absolute right-10 flex items-center gap-3">
                            <Button
                              className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2"
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart(product);
                              }}
                              disabled={!product.isAvailable}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Add to cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductList;
