import React, { useState } from 'react';
import { ArrowLeft, Package, RefreshCw, DollarSign, Clock, CheckCircle, AlertCircle, Mail, Phone } from 'lucide-react';

const ReturnsExchanges = () => {
  const [selectedTab, setSelectedTab] = useState('returns');

  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Log into your account and select the item you want to return from your order history."
    },
    {
      step: 2,
      title: "Print Return Label",
      description: "We'll email you a prepaid return shipping label - no cost to you!"
    },
    {
      step: 3,
      title: "Package Item",
      description: "Pack the item in its original packaging with all tags and accessories."
    },
    {
      step: 4,
      title: "Ship Back",
      description: "Drop off at any UPS location or schedule a pickup."
    },
    {
      step: 5,
      title: "Get Refund",
      description: "Once we receive your return, we'll process your refund within 3-5 business days."
    }
  ];

  const exchangeSteps = [
    {
      step: 1,
      title: "Request Exchange",
      description: "Contact us with your order number and the item you'd like to exchange."
    },
    {
      step: 2,
      title: "Send Original Item",
      description: "We'll send you a prepaid shipping label to return the original item."
    },
    {
      step: 3,
      title: "Receive New Item",
      description: "We'll ship your replacement item once we receive the original."
    }
  ];

  const eligibleItems = [
    "Clothing with original tags attached",
    "Shoes in original box with no wear",
    "Electronics in original packaging",
    "Books in sellable condition",
    "Home goods unused and in original packaging"
  ];

  const nonEligibleItems = [
    "Personalized or customized items",
    "Underwear and intimate apparel",
    "Items marked as final sale",
    "Digital downloads",
    "Gift cards",
    "Perishable goods",
    "Items damaged due to misuse"
  ];

  const refundMethods = [
    {
      method: "Credit Card",
      time: "3-5 business days",
      description: "Refund to original payment method"
    },
    {
      method: "Store Credit",
      time: "Instant",
      description: "Get store credit for future purchases"
    },
    {
      method: "PayPal",
      time: "1-3 business days",
      description: "Refund to PayPal account"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Exchanges</h1>
          <p className="text-lg text-gray-600">
            Easy returns and exchanges within 30 days. Your satisfaction is our priority.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">30</h3>
            <p className="text-gray-600">Day Return Window</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Free</h3>
            <p className="text-gray-600">Return Shipping</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <RefreshCw className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Easy</h3>
            <p className="text-gray-600">Exchange Process</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Fast</h3>
            <p className="text-gray-600">Refund Processing</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setSelectedTab('returns')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  selectedTab === 'returns'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                How to Return
              </button>
              <button
                onClick={() => setSelectedTab('exchanges')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  selectedTab === 'exchanges'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                How to Exchange
              </button>
              <button
                onClick={() => setSelectedTab('policy')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  selectedTab === 'policy'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Return Policy
              </button>
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'returns' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Return Process</h2>
                <div className="space-y-6">
                  {returnSteps.map((step) => (
                    <div key={step.step} className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-semibold">{step.step}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-800">Pro Tip:</span>
                  </div>
                  <p className="text-blue-700 mt-1">
                    Keep your original packaging and tags for the fastest return process!
                  </p>
                </div>
              </div>
            )}

            {selectedTab === 'exchanges' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Exchange Process</h2>
                <div className="space-y-6">
                  {exchangeSteps.map((step) => (
                    <div key={step.step} className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-green-600 font-semibold">{step.step}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Size Exchanges</h3>
                    <p className="text-green-700 text-sm">
                      Need a different size? Exchanges for size are always free, even if there's a price difference.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Color/Style Exchanges</h3>
                    <p className="text-purple-700 text-sm">
                      Want a different color or style? We'll help you find the perfect alternative.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'policy' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Return Policy Details</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Eligible Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Eligible for Return
                    </h3>
                    <ul className="space-y-2">
                      {eligibleItems.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Non-Eligible Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      Not Eligible for Return
                    </h3>
                    <ul className="space-y-2">
                      {nonEligibleItems.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-600 mr-2">✗</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Refund Methods */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Refund Methods & Timing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {refundMethods.map((method, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900">{method.method}</h4>
                        <p className="text-blue-600 font-medium text-sm">{method.time}</p>
                        <p className="text-gray-600 text-sm mt-1">{method.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Notes */}
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Important Notes</h3>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Return window starts from delivery date, not order date</li>
                    <li>• Items must be in original condition with tags attached</li>
                    <li>• We inspect all returns before processing refunds</li>
                    <li>• Original shipping costs are non-refundable (except for defective items)</li>
                    <li>• Refunds are processed to the original payment method</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gray-900 text-white rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Need Help with Your Return?</h2>
            <p className="text-gray-300 mb-6">
              Our customer service team is ready to assist you with any questions about returns or exchanges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>support@briskbuy.com</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Start a Return
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsExchanges;
