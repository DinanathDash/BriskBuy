import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { useCart } from '../../Contexts/CartContext';
import { useAuth } from '../../Contexts/AuthContext';
import { saveOrder } from '../../Firebase/orders';
import { CreditCard, Truck, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import OrbLoader from '../../components/ui/OrbLoader';

// Import card images
import amexImg from '../../assets/amex.svg';
import mastercardImg from '../../assets/mastercard.svg';
import rupayImg from '../../assets/rupay.svg';

// Payment Modal Component
const PaymentModal = ({ isOpen, onClose, onSuccess, orderData }) => {
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [processing, setProcessing] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: ''
  });

  const formatCardNumber = (value) => {
    const v = value.replace(/\s/g, '').replace(/\D/g, '');
    return v.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'amex';
    if (/^6/.test(number)) return 'rupay';
    return null;
  };

  const cardType = getCardType(paymentForm.cardNumber);

  const handlePaymentFormChange = (field, value) => {
    let formattedValue = value;
    
    switch (field) {
      case 'cardNumber':
        formattedValue = formatCardNumber(value);
        break;
      case 'expiry':
        formattedValue = formatExpiry(value);
        break;
      case 'cvv':
        formattedValue = value.replace(/\D/g, '');
        break;
      case 'cardholderName':
        formattedValue = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
        break;
    }
    
    setPaymentForm(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validatePaymentForm = () => {
    if (paymentMethod === 'cod') return true;
    
    const { cardNumber, expiry, cvv, cardholderName } = paymentForm;
    return cardNumber.replace(/\s/g, '').length >= 13 && 
           expiry.length === 5 && 
           cvv.length >= 3 && 
           cardholderName.trim().length >= 3;
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // First, save order to Firebase (this will check stock)
      const { orderId, error } = await saveOrder({
        ...orderData,
        paymentMethod,
        paymentStatus: paymentMethod === 'online' ? 'paid' : 'pending'
      });
      
      if (error) {
        // Handle stock or other errors
        if (error.includes('Insufficient stock')) {
          toast.error(`${error}. Please update your cart and try again.`);
        } else {
          toast.error(`Order failed: ${error}`);
        }
        throw new Error(error);
      }
      
      // Simulate payment processing for online payments
      if (paymentMethod === 'online') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success('Payment successful!');
      } else {
        toast.success('Order placed successfully! Pay on delivery.');
      }
      
      onSuccess(orderId);
    } catch (error) {
      console.error('Payment error:', error);
      if (!error.message.includes('Insufficient stock')) {
        toast.error('Payment failed. Please try again.');
      }
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        {/* Progress Steps in Modal */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-xs font-medium">
              ✓
            </div>
            <span className="ml-1 text-xs text-green-600">Cart</span>
            <ChevronRight className="mx-2 h-3 w-3 text-gray-400" />
            <div className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-xs font-medium">
              ✓
            </div>
            <span className="ml-1 text-xs text-green-600">Address</span>
            <ChevronRight className="mx-2 h-3 w-3 text-gray-400" />
            <div className="flex items-center justify-center w-6 h-6 bg-black text-white rounded-full text-xs font-medium">
              3
            </div>
            <span className="ml-1 text-xs font-medium">Payment</span>
          </div>
        </div>

        <Typography variant="h5" className="font-bold mb-4">Complete Payment</Typography>
        
        <div className="space-y-4 mb-6">
          <Typography variant="h6" className="font-semibold">
            Total: ${orderData.total}
          </Typography>
          
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 p-3 border rounded-md">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online" className="flex items-center cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                Online Payment
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-md">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex items-center cursor-pointer">
                <Truck className="mr-2 h-4 w-4" />
                Cash on Delivery
              </Label>
            </div>
          </RadioGroup>
          
          {paymentMethod === 'online' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-md">
              <div>
                <Label htmlFor="cardNumber" className="text-sm font-medium mb-2 block">
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  value={paymentForm.cardNumber}
                  onChange={(e) => handlePaymentFormChange('cardNumber', e.target.value)}
                  className="font-mono text-lg tracking-wider"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry" className="text-sm font-medium mb-2 block">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={paymentForm.expiry}
                    onChange={(e) => handlePaymentFormChange('expiry', e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-sm font-medium mb-2 block">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    maxLength="4"
                    value={paymentForm.cvv}
                    onChange={(e) => handlePaymentFormChange('cvv', e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cardholderName" className="text-sm font-medium mb-2 block">
                  Cardholder Name
                </Label>
                <Input
                  id="cardholderName"
                  placeholder="JOHN DOE"
                  value={paymentForm.cardholderName}
                  onChange={(e) => handlePaymentFormChange('cardholderName', e.target.value)}
                  className="uppercase"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <div className="flex gap-2">
                  {/* MasterCard */}
                  <div className={`w-12 h-8 rounded-md flex items-center justify-center overflow-hidden transition-all ${
                    cardType === 'mastercard' ? 'ring-2 ring-red-300 scale-105' : 'opacity-50'
                  }`}>
                    <img src={mastercardImg} alt="MasterCard" className="w-full h-full object-contain" />
                  </div>
                  
                  {/* American Express */}
                  <div className={`w-12 h-8 rounded-md flex items-center justify-center overflow-hidden transition-all ${
                    cardType === 'amex' ? 'ring-2 ring-blue-300 scale-105' : 'opacity-50'
                  }`}>
                    <img src={amexImg} alt="American Express" className="w-full h-full object-contain" />
                  </div>
                  
                  {/* RuPay */}
                  <div className={`w-12 h-8 rounded-md flex items-center justify-center overflow-hidden transition-all ${
                    cardType === 'rupay' ? 'ring-2 ring-green-300 scale-105' : 'opacity-50'
                  }`}>
                    <img src={rupayImg} alt="RuPay" className="w-full h-full object-contain" />
                  </div>
                </div>
                <span>• Secure SSL encrypted payment</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={processing}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handlePayment}
            disabled={processing || (paymentMethod === 'online' && !validatePaymentForm())}
            className="flex-1"
          >
            {processing ? (
              <div className="flex items-center gap-2">
                <OrbLoader size={16} />
                Processing...
              </div>
            ) : (
              `${paymentMethod === 'online' ? 'Pay' : 'Place Order'} $${orderData.total}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  // Get items and gift options from navigation state or fall back to cart
  const checkoutItems = location.state?.selectedItems || items;
  const giftOptions = location.state?.giftOptions || null;
  const giftCost = location.state?.giftCost || 0;

  // Calculate totals for checkout items
  const calculateCheckoutTotal = () => {
    const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = 0; // You can apply coupon logic here if needed
    const total = subtotal - discount + giftCost;
    const itemCount = checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
    
    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      giftCost: giftCost.toFixed(2),
      total: total.toFixed(2),
      itemCount
    };
  };

  const checkoutTotal = calculateCheckoutTotal();

  const handleInputChange = (e) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'zipCode'];
    const missingFields = requiredFields.filter(field => !deliveryInfo[field]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (orderId) => {
    clearCart();
    setShowPaymentModal(false);
    toast.success('Order placed successfully! Stock has been updated.');
    navigate('/orders', { 
      state: { 
        message: `Order ${orderId} placed successfully!` 
      } 
    });
  };

  const orderData = {
    userId: currentUser.uid,
    items,
    deliveryInfo,
    subtotal: parseFloat(checkoutTotal.subtotal),
    discount: parseFloat(checkoutTotal.discount),
    total: parseFloat(checkoutTotal.total),
    itemCount: checkoutTotal.itemCount,
    orderDate: new Date().toISOString()
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      <Container maxWidth="xl" className="py-4 sm:py-8 px-4 sm:px-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex items-center min-w-max">
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full text-xs sm:text-sm font-medium">
              ✓
            </div>
            <span className="ml-1 sm:ml-2 font-medium text-green-600 text-sm sm:text-base">Cart</span>
            <ChevronRight className="mx-2 sm:mx-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-black text-white rounded-full text-xs sm:text-sm font-medium">
              2
            </div>
            <span className="ml-1 sm:ml-2 font-medium text-sm sm:text-base">Address</span>
            <ChevronRight className="mx-2 sm:mx-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 text-gray-500 rounded-full text-xs sm:text-sm">
              3
            </div>
            <span className="ml-1 sm:ml-2 text-gray-500 text-sm sm:text-base">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Back to Cart Button */}
          <div className="lg:col-span-2 mb-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Cart
            </Button>
          </div>

          {/* Delivery Information */}
          <div>
            <Card>
              <CardHeader>
                <Typography variant="h5" className="font-semibold text-lg sm:text-xl">Delivery Information</Typography>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 -mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName" className="mb-2">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={deliveryInfo.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={deliveryInfo.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="mb-2">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={deliveryInfo.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="mb-2">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={deliveryInfo.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="mb-2">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={deliveryInfo.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="mb-2">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={deliveryInfo.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="mb-2">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={deliveryInfo.country}
                        onChange={handleInputChange}
                        placeholder="USA"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <Typography variant="h5" className="font-semibold">Order Summary</Typography>
              </CardHeader>
              <CardContent className="space-y-4 -mt-4">
                {/* Order Items */}
                <div className="max-h-64 overflow-y-auto space-y-3 grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  {checkoutItems.map((item) => (
                    <div key={item.cartItemId} className="flex gap-3">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <Typography variant="body2" className="font-medium line-clamp-1">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          Qty: {item.quantity}
                          {item.selectedSize && ` • Size: ${item.selectedSize}`}
                          {item.selectedColor && ` • Color: ${item.selectedColor}`}
                        </Typography>
                        <Typography variant="body2" className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Gift Options */}
                {giftOptions && (
                  <div className="p-3 bg-purple-50 rounded-lg border">
                    <Typography variant="body2" className="font-medium text-purple-800 mb-2">
                      Gift Options Included:
                    </Typography>
                    <div className="space-y-1">
                      {giftOptions.giftWrap && (
                        <div className="flex justify-between text-sm">
                          <span>Gift wrapping</span>
                          <span>$5.00</span>
                        </div>
                      )}
                      {giftOptions.personalMessage && giftOptions.message.trim() && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Personalized message</span>
                            <span>$2.00</span>
                          </div>
                          <div className="text-xs text-gray-600 italic p-2 bg-white rounded border">
                            "{giftOptions.message}"
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <hr />
                
                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({checkoutTotal.itemCount} items):</span>
                    <span>${checkoutTotal.subtotal}</span>
                  </div>
                  {parseFloat(checkoutTotal.discount) > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-${checkoutTotal.discount}</span>
                    </div>
                  )}
                  {parseFloat(checkoutTotal.giftCost) > 0 && (
                    <div className="flex justify-between text-purple-600">
                      <span>Gift options:</span>
                      <span>+${checkoutTotal.giftCost}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${checkoutTotal.total}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleSubmit}
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>

      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        orderData={orderData}
      />
    </>
  );
};

export default Checkout;
