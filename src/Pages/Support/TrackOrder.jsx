import React, { useState } from 'react';
import { Search, Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock tracking data for demonstration
  const mockTrackingData = {
    'TRK123456789': {
      orderNumber: 'ORD-2025-001234',
      status: 'In Transit',
      estimatedDelivery: 'January 18, 2025',
      carrier: 'UPS',
      trackingNumber: 'TRK123456789',
      currentLocation: 'Chicago, IL Distribution Center',
      events: [
        {
          date: '2025-01-15',
          time: '2:30 PM',
          status: 'Package shipped',
          location: 'Los Angeles, CA',
          description: 'Package has been shipped from our fulfillment center',
          icon: Package
        },
        {
          date: '2025-01-16',
          time: '6:45 AM',
          status: 'In transit',
          location: 'Phoenix, AZ',
          description: 'Package is on its way to the next facility',
          icon: Truck
        },
        {
          date: '2025-01-16',
          time: '11:20 PM',
          status: 'Arrived at facility',
          location: 'Denver, CO Distribution Center',
          description: 'Package arrived at sorting facility',
          icon: MapPin
        },
        {
          date: '2025-01-17',
          time: '8:15 AM',
          status: 'In transit',
          location: 'Chicago, IL Distribution Center',
          description: 'Package departed facility and is on its way',
          icon: Truck
        }
      ]
    },
    'TRK987654321': {
      orderNumber: 'ORD-2025-001567',
      status: 'Delivered',
      estimatedDelivery: 'January 15, 2025',
      actualDelivery: 'January 15, 2025',
      carrier: 'FedEx',
      trackingNumber: 'TRK987654321',
      currentLocation: 'Delivered to front door',
      events: [
        {
          date: '2025-01-13',
          time: '1:15 PM',
          status: 'Package shipped',
          location: 'New York, NY',
          description: 'Package has been shipped from our fulfillment center',
          icon: Package
        },
        {
          date: '2025-01-14',
          time: '9:30 AM',
          status: 'In transit',
          location: 'Philadelphia, PA',
          description: 'Package is on its way to delivery location',
          icon: Truck
        },
        {
          date: '2025-01-15',
          time: '2:45 PM',
          status: 'Delivered',
          location: '123 Main St, Anytown, PA',
          description: 'Package delivered to front door. Signed for by J. SMITH',
          icon: CheckCircle
        }
      ]
    }
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = mockTrackingData[trackingNumber];
      setTrackingResult(result || 'not_found');
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'in transit':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
      case 'package shipped':
        return 'text-purple-600 bg-purple-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'delayed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const sampleTrackingNumbers = [
    'TRK123456789',
    'TRK987654321'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-lg text-gray-600">
            Enter your tracking number or order details to see the latest status
          </p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-2">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    id="tracking"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !trackingNumber}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Track Order
                  </>
                )}
              </button>
            </form>

            {/* Sample tracking numbers for demo */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 font-medium mb-2">Demo Mode - Try these tracking numbers:</p>
              <div className="flex flex-wrap gap-2">
                {sampleTrackingNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => setTrackingNumber(number)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="bg-white rounded-lg shadow-sm">
            {trackingResult === 'not_found' ? (
              <div className="p-8 text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tracking Number Not Found</h2>
                <p className="text-gray-600 mb-6">
                  We couldn't find any information for this tracking number. Please check the number and try again.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-yellow-800 mb-2">Common Issues:</h3>
                  <ul className="text-yellow-700 space-y-1">
                    <li>• Tracking numbers can take 24-48 hours to become active</li>
                    <li>• Make sure you've entered the complete tracking number</li>
                    <li>• Check your email for the most recent tracking information</li>
                    <li>• Contact customer service if the issue persists</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                {/* Order Summary */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">Order #{trackingResult.orderNumber}</h2>
                      <p className="text-gray-600">Tracking: {trackingResult.trackingNumber}</p>
                      <p className="text-gray-600">Carrier: {trackingResult.carrier}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trackingResult.status)}`}>
                        {trackingResult.status}
                      </span>
                      <p className="text-gray-600 mt-2">
                        {trackingResult.status === 'Delivered' 
                          ? `Delivered on ${trackingResult.actualDelivery}`
                          : `Est. delivery: ${trackingResult.estimatedDelivery}`
                        }
                      </p>
                    </div>
                  </div>
                  
                  {trackingResult.currentLocation && (
                    <div className="mt-4 flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{trackingResult.currentLocation}</span>
                    </div>
                  )}
                </div>

                {/* Tracking Timeline */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking History</h3>
                  <div className="space-y-6">
                    {trackingResult.events.map((event, index) => {
                      const IconComponent = event.icon;
                      const isLatest = index === trackingResult.events.length - 1;
                      
                      return (
                        <div key={index} className="relative flex items-start">
                          {/* Timeline line */}
                          {index !== trackingResult.events.length - 1 && (
                            <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                          )}
                          
                          {/* Icon */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                            isLatest ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          
                          {/* Content */}
                          <div className="ml-4 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <h4 className={`text-lg font-medium ${isLatest ? 'text-blue-600' : 'text-gray-900'}`}>
                                {event.status}
                              </h4>
                              <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                                <span>{event.date}</span>
                                <span className="mx-2">•</span>
                                <span>{event.time}</span>
                              </div>
                            </div>
                            <p className="text-gray-600 mt-1">{event.description}</p>
                            <p className="text-sm text-gray-500 mt-1 flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {event.location}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Instructions */}
                {trackingResult.status !== 'Delivered' && (
                  <div className="p-6 bg-blue-50 border-t border-gray-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Delivery Information</h3>
                    <p className="text-blue-800 text-sm">
                      Your package will be delivered during business hours (9 AM - 8 PM). 
                      If you're not available, the carrier will leave a delivery notice with pickup instructions.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-gray-900 text-white rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Need Help with Your Order?</h2>
            <p className="text-gray-300 mb-6">
              Can't find your tracking information or have questions about delivery?
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center justify-center">
                <Package className="h-5 w-5 mr-2" />
                <span>support@briskbuy.com</span>
              </div>
              <div className="flex items-center justify-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
