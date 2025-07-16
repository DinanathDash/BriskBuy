import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { useCart } from '../../Contexts/CartContext';
import { useAuth } from '../../Contexts/AuthContext';
import { useWishlist } from '../../Contexts/WishlistContext';
import { COUPONS } from '../../Constants';
import { Trash2, Plus, Minus, ShoppingBag, Heart, Gift, Tag, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import CartStatusIndicator from '../../components/CartStatusIndicator';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, applyCoupon, removeCoupon, coupon } = useCart();
  const { currentUser } = useAuth();
  const { moveToWishlist } = useWishlist();
  const navigate = useNavigate();
  const { subtotal, discount, total, itemCount } = getCartTotal();
  const [selectedItems, setSelectedItems] = useState(new Set(items.map(item => item.cartItemId)));
  const [showGiftOptions, setShowGiftOptions] = useState(false);
  const [giftOptions, setGiftOptions] = useState({
    giftWrap: false,
    personalMessage: false,
    message: ''
  });

  const GIFT_PRICING = {
    giftWrap: 5.00,
    personalMessage: 2.00
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(new Set(items.map(item => item.cartItemId)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (itemId, checked) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
  };

  const getSelectedItems = () => {
    return items.filter(item => selectedItems.has(item.cartItemId));
  };

  const getSelectedTotal = () => {
    const selectedItemsList = getSelectedItems();
    const selectedSubtotal = selectedItemsList.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const selectedDiscount = coupon ? (selectedSubtotal * coupon.discount / 100) : 0;
    
    // Calculate gift options cost
    let giftCost = 0;
    if (showGiftOptions) {
      if (giftOptions.giftWrap) giftCost += GIFT_PRICING.giftWrap;
      if (giftOptions.personalMessage && giftOptions.message.trim()) giftCost += GIFT_PRICING.personalMessage;
    }
    
    return {
      subtotal: selectedSubtotal.toFixed(2),
      discount: selectedDiscount.toFixed(2),
      giftCost: giftCost.toFixed(2),
      total: (selectedSubtotal - selectedDiscount + giftCost).toFixed(2),
      itemCount: selectedItemsList.reduce((sum, item) => sum + item.quantity, 0)
    };
  };

  const handleMoveToWishlist = async () => {
    if (!currentUser) {
      toast.error('Please sign in to add items to wishlist');
      return;
    }

    const selectedItemsList = getSelectedItems();
    if (selectedItemsList.length === 0) {
      toast.error('Please select items to move to wishlist');
      return;
    }

    try {
      const result = await moveToWishlist(selectedItemsList);
      if (result.success) {
        // Remove selected items from cart only after successful wishlist addition
        selectedItemsList.forEach(item => removeFromCart(item.cartItemId));
        setSelectedItems(new Set());
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to move items to wishlist');
    }
  };

  const handleRemoveSelected = () => {
    const selectedItemsList = getSelectedItems();
    if (selectedItemsList.length === 0) {
      toast.error('Please select items to remove');
      return;
    }

    selectedItemsList.forEach(item => removeFromCart(item.cartItemId));
    setSelectedItems(new Set());
    toast.success(`${selectedItemsList.length} item(s) removed from cart`);
  };

  const handleCouponApply = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const couponCode = formData.get('coupon').toUpperCase();

    // Check if coupon exists in our constants
    const validCoupon = COUPONS.find(coupon => coupon.code === couponCode);

    if (validCoupon) {
      applyCoupon(validCoupon);
      e.target.reset();
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleGiftOptionChange = (option, value) => {
    setGiftOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleAddGiftOptions = () => {
    if (!giftOptions.giftWrap && (!giftOptions.personalMessage || !giftOptions.message.trim())) {
      toast.error('Please select at least one gift option');
      return;
    }

    let optionsAdded = [];
    if (giftOptions.giftWrap) optionsAdded.push('Gift wrapping');
    if (giftOptions.personalMessage && giftOptions.message.trim()) optionsAdded.push('Personalized message');

    toast.success(`${optionsAdded.join(' and ')} added to your order`);
  };

  const getGiftTotal = () => {
    let total = 0;
    if (giftOptions.giftWrap) total += GIFT_PRICING.giftWrap;
    if (giftOptions.personalMessage && giftOptions.message.trim()) total += GIFT_PRICING.personalMessage;
    return total;
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 sm:h-24 sm:w-24 mx-auto text-gray-400 mb-4 sm:mb-6" />
          <Typography variant="h4" className="font-bold mb-4 text-xl sm:text-2xl lg:text-3xl">Your cart is empty</Typography>
          <Typography variant="body1" className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button asChild size="lg" className="mt-4 w-full sm:w-auto">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="py-4 sm:py-8 px-4 sm:px-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto">
        <div className="flex items-center min-w-max">
          <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-black text-white rounded-full text-xs sm:text-sm font-medium">
            1
          </div>
          <span className="ml-1 sm:ml-2 font-medium text-sm sm:text-base">Cart</span>
          <ChevronRight className="mx-2 sm:mx-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 text-gray-500 rounded-full text-xs sm:text-sm">
            2
          </div>
          <span className="ml-1 sm:ml-2 text-gray-500 text-sm sm:text-base">Address</span>
          <ChevronRight className="mx-2 sm:mx-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 text-gray-500 rounded-full text-xs sm:text-sm">
            3
          </div>
          <span className="ml-1 sm:ml-2 text-gray-500 text-sm sm:text-base">Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
        {/* Cart Items - Left Side */}
        <div className="lg:col-span-3">
          {/* Select All */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selectedItems.size === items.length && items.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="font-medium text-sm sm:text-base">
                {selectedItems.size}/{items.length} items selected
              </span>
            </div>
            <div className="flex gap-2 sm:gap-4 ml-auto w-full sm:w-auto">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 flex-1 sm:flex-none text-xs sm:text-sm"
                onClick={handleMoveToWishlist}
                disabled={selectedItems.size === 0}
              >
                Move to wishlist
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-600 flex-1 sm:flex-none text-xs sm:text-sm"
                onClick={handleRemoveSelected}
                disabled={selectedItems.size === 0}
              >
                Remove
              </Button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="space-y-3 sm:space-y-4">
            {items.map((item) => (
              <Card key={item.cartItemId} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Checkbox and Image */}
                    <div className="flex items-start p-3 sm:p-4 gap-3 sm:gap-4">
                      <Checkbox
                        checked={selectedItems.has(item.cartItemId)}
                        onCheckedChange={(checked) => handleSelectItem(item.cartItemId, checked)}
                      />
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
                        <div className="flex-1">
                          <Typography variant="h6" className="font-semibold text-base sm:text-lg mb-1">
                            {item.name}
                          </Typography>

                          {/* Product Attributes */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                              1-2 yr
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                              {item.category}
                            </span>
                            <span className="flex items-center gap-1 text-green-600">
                              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                              Express delivery in 3 days
                            </span>
                          </div>

                          <Typography variant="h6" className="font-bold text-lg sm:text-xl">
                            ${item.price}
                          </Typography>
                        </div>

                        <div className='flex flex-row sm:flex-col items-center sm:items-end space-x-4 sm:space-x-0 sm:space-y-6 w-full sm:w-auto justify-between sm:justify-start'>
                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8"
                            onClick={() => removeFromCart(item.cartItemId)}
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1 text-center min-w-[40px]">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Coupons */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                <Typography variant="h6" className="font-semibold">Coupons</Typography>
              </div>
            </CardHeader>
            <CardContent className="-mt-6">
              {coupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-green-600" />
                    <div>
                      <Typography variant="body2" className="font-medium text-green-800">
                        {coupon.code}
                      </Typography>
                      <Typography variant="body2" className="text-green-600">
                        {coupon.discount}% OFF
                      </Typography>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={removeCoupon} className="text-green-600">
                    Remove
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleCouponApply} className="flex gap-2">
                  <Input
                    name="coupon"
                    placeholder="Enter coupon code"
                    className="flex-1"
                  />
                  <Button type="submit" variant="outline">Apply</Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Gifting */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                <Typography variant="h6" className="font-semibold">Gifting</Typography>
              </div>
            </CardHeader>
            <CardContent className="-mt-6">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-purple-50 border-purple-200">
                <div className="flex items-center gap-3">
                  <Gift className="h-8 w-8 text-purple-600" />
                  <div>
                    <Typography variant="body2" className="font-medium">
                      Buying for a loved one?
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 text-sm">
                      Send personalized message at $7
                    </Typography>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-3 text-purple-600"
                onClick={() => setShowGiftOptions(!showGiftOptions)}
              >
                {showGiftOptions ? 'Remove gift wrap' : 'Add gift wrap'}
              </Button>
              
              {showGiftOptions && (
                <div className="mt-4 p-4 border rounded-lg bg-purple-25 border-purple-200">
                  <Typography variant="body2" className="font-medium pb-2">
                    Gift Options
                  </Typography>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={giftOptions.giftWrap}
                          onCheckedChange={(checked) => handleGiftOptionChange('giftWrap', checked)}
                        />
                        <span className="text-sm">Gift wrapping</span>
                      </div>
                      <span className="text-sm font-medium">${GIFT_PRICING.giftWrap.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={giftOptions.personalMessage}
                          onCheckedChange={(checked) => handleGiftOptionChange('personalMessage', checked)}
                        />
                        <span className="text-sm">Personalized message</span>
                      </div>
                      <span className="text-sm font-medium">${GIFT_PRICING.personalMessage.toFixed(2)}</span>
                    </div>
                    {giftOptions.personalMessage && (
                      <textarea 
                        placeholder="Enter your personalized message..."
                        className="w-full p-2 border rounded-md text-sm resize-none"
                        rows="3"
                        value={giftOptions.message}
                        onChange={(e) => handleGiftOptionChange('message', e.target.value)}
                      />
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={handleAddGiftOptions}
                      disabled={!giftOptions.giftWrap && (!giftOptions.personalMessage || !giftOptions.message.trim())}
                    >
                      Add Gift Options (${getGiftTotal().toFixed(2)})
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Price Details */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Typography variant="h6" className="font-semibold">Price Details</Typography>
                <CartStatusIndicator />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 -mt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{getSelectedTotal().itemCount} item{getSelectedTotal().itemCount !== 1 ? 's' : ''}</span>
                  <span>${getSelectedTotal().subtotal}</span>
                </div>

                {getSelectedItems().map((item) => (
                  <div key={item.cartItemId} className="flex justify-between text-sm text-gray-600">
                    <span>{item.quantity} x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Coupon discount</span>
                  <span>-${getSelectedTotal().discount}</span>
                </div>
              )}

              {parseFloat(getSelectedTotal().giftCost) > 0 && (
                <div className="flex justify-between text-sm text-purple-600">
                  <span>Gift options</span>
                  <span>+${getSelectedTotal().giftCost}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free Delivery</span>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>${getSelectedTotal().total}</span>
              </div>

              <div className="pt-4">
                {currentUser ? (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => navigate('/checkout', { 
                      state: { 
                        selectedItems: getSelectedItems(),
                        giftOptions: showGiftOptions ? giftOptions : null,
                        giftCost: parseFloat(getSelectedTotal().giftCost)
                      } 
                    })}
                    disabled={selectedItems.size === 0}
                  >
                    Place order
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => navigate('/auth/login', { state: { from: { pathname: '/checkout' } } })}
                  >
                    Sign In to Checkout
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
