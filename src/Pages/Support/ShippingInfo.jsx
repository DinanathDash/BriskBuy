import React from 'react';
import { Truck, Clock, MapPin, Package, Shield, CreditCard } from 'lucide-react';

const ShippingInfo = () => {
  const shippingOptions = [
    {
      icon: Truck,
      name: "Standard Shipping",
      time: "3-7 Business Days",
      cost: "Free on orders over $50",
      description: "Our most popular shipping option with reliable delivery"
    },
    {
      icon: Clock,
      name: "Express Shipping",
      time: "1-3 Business Days",
      cost: "$9.99",
      description: "Faster delivery for when you need it sooner"
    },
    {
      icon: Package,
      name: "Overnight Shipping",
      time: "Next Business Day",
      cost: "$19.99",
      description: "Get your order the next business day"
    }
  ];

  const shippingZones = [
    { region: "East Coast", time: "2-4 days", states: "NY, NJ, PA, CT, MA, etc." },
    { region: "West Coast", time: "3-5 days", states: "CA, WA, OR, NV, AZ, etc." },
    { region: "Midwest", time: "2-4 days", states: "IL, OH, MI, IN, WI, etc." },
    { region: "South", time: "3-5 days", states: "TX, FL, GA, NC, VA, etc." }
  ];

  const restrictions = [
    "We currently ship only within the United States",
    "PO Boxes are accepted for most items",
    "Some oversized items may require special shipping",
    "Hazardous materials cannot be shipped",
    "Items shipped to Alaska and Hawaii may take longer"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-base sm:text-lg text-gray-600">
            Everything you need to know about our shipping options and policies
          </p>
        </div>

        {/* Shipping Options */}
        <div className="bg-white rounded-lg shadow-sm mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Shipping Options</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {shippingOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{option.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{option.time}</p>
                      </div>
                    </div>
                    <p className="text-blue-600 font-semibold mb-2 text-sm sm:text-base">{option.cost}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{option.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Shipping Zones */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2" />
                Shipping Zones & Transit Times
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {shippingZones.map((zone, index) => (
                  <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{zone.region}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{zone.states}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-600">{zone.time}</p>
                      <p className="text-xs text-gray-500">Standard shipping</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Transit times are business days and start from when your order ships, not when it's placed.
                </p>
              </div>
            </div>
          </div>

          {/* Processing & Security */}
          <div className="space-y-8">
            {/* Processing Time */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <Package className="h-6 w-6 text-green-600 mr-2" />
                  Order Processing
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Order Received</h3>
                      <p className="text-gray-600 text-sm">We process orders within 1-2 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Quality Check</h3>
                      <p className="text-gray-600 text-sm">Each item is carefully inspected before shipping</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Shipped</h3>
                      <p className="text-gray-600 text-sm">You'll receive tracking information via email</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <Shield className="h-6 w-6 text-purple-600 mr-2" />
                  Secure Packaging
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Eco-friendly packaging materials</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Fragile items receive extra protection</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Discreet packaging for privacy</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Insurance available for high-value items</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Restrictions */}
        <div className="bg-white rounded-lg shadow-sm mt-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Shipping Restrictions</h2>
          </div>
          <div className="p-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <ul className="space-y-2">
                {restrictions.map((restriction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span className="text-gray-700">{restriction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact for Questions */}
        <div className="bg-blue-600 text-white rounded-lg mt-8 p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Questions About Shipping?</h2>
          <p className="mb-6">Our customer service team is here to help with any shipping questions or concerns.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center justify-center">
              <CreditCard className="h-5 w-5 mr-2" />
              <span>support@briskbuy.com</span>
            </div>
            <div className="flex items-center justify-center">
              <Package className="h-5 w-5 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
