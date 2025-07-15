import React, { useState } from 'react';
import { Cookie, Settings, Shield, Eye, ToggleLeft, ToggleRight, Calendar, Info } from 'lucide-react';

const CookiePolicy = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  const togglePreference = (type) => {
    if (type === 'essential') return; // Essential cookies can't be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      examples: ['User authentication', 'Shopping cart contents', 'Security features', 'Basic site functionality'],
      duration: 'Session / 1 year',
      canDisable: false
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization.',
      examples: ['Language preferences', 'Region selection', 'Accessibility settings', 'User interface customization'],
      duration: '1-2 years',
      canDisable: true
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      examples: ['Page views and traffic', 'User behavior patterns', 'Site performance metrics', 'Error tracking'],
      duration: '2 years',
      canDisable: true
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'These cookies are used to deliver relevant advertisements and track campaign effectiveness.',
      examples: ['Targeted advertising', 'Social media integration', 'Email marketing', 'Retargeting campaigns'],
      duration: '1-2 years',
      canDisable: true
    }
  ];

  const thirdPartyCookies = [
    {
      provider: 'Google Analytics',
      purpose: 'Website analytics and performance tracking',
      cookies: ['_ga', '_gid', '_gat'],
      privacy: 'https://policies.google.com/privacy'
    },
    {
      provider: 'Facebook Pixel',
      purpose: 'Social media integration and advertising',
      cookies: ['_fbp', 'fr'],
      privacy: 'https://www.facebook.com/privacy/explanation'
    },
    {
      provider: 'Stripe',
      purpose: 'Payment processing and fraud prevention',
      cookies: ['__stripe_mid', '__stripe_sid'],
      privacy: 'https://stripe.com/privacy'
    },
    {
      provider: 'Hotjar',
      purpose: 'User experience and behavior analysis',
      cookies: ['_hjid', '_hjFirstSeen'],
      privacy: 'https://www.hotjar.com/privacy'
    }
  ];

  const lastUpdated = 'January 15, 2025';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Cookie className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Cookie Policy</h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            Learn about how we use cookies and similar technologies on our website
          </p>
          <div className="flex items-center justify-center text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Cookie Consent Banner Simulation */}
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Cookie Preferences</h2>
              <p className="text-blue-100 mb-4">
                We use cookies to enhance your browsing experience and provide personalized content. 
                You can customize your cookie preferences below.
              </p>
            </div>
            <Settings className="h-6 w-6 text-blue-200 ml-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cookieTypes.map((type) => (
              <div key={type.id} className="bg-blue-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{type.name}</h3>
                  <button
                    onClick={() => togglePreference(type.id)}
                    disabled={!type.canDisable}
                    className={`${!type.canDisable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {cookiePreferences[type.id] ? (
                      <ToggleRight className="h-5 w-5 text-green-400" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-blue-200 text-xs">{type.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Accept Selected
            </button>
            <button className="bg-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors">
              Accept All
            </button>
            <button className="text-blue-200 hover:text-white transition-colors">
              Reject All
            </button>
          </div>
        </div>

        {/* What Are Cookies */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Info className="h-6 w-6 text-blue-600 mr-2" />
              What Are Cookies?
            </h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4">
              Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. 
              They help websites remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Cookie className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">First-Party Cookies</h3>
                <p className="text-sm text-gray-600">Set directly by our website for essential functionality</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Third-Party Cookies</h3>
                <p className="text-sm text-gray-600">Set by external services we use for analytics and advertising</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Settings className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Your Control</h3>
                <p className="text-sm text-gray-600">You can manage and delete cookies through your browser settings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Types of Cookies */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Types of Cookies We Use</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {cookieTypes.map((type) => (
                <div key={type.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h3>
                      <p className="text-gray-600 mb-3">{type.description}</p>
                    </div>
                    <div className="ml-4">
                      {type.canDisable ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Optional</span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">Required</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                      <ul className="space-y-1">
                        {type.examples.map((example, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Duration:</h4>
                      <p className="text-sm text-gray-600">{type.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Third-Party Cookies</h2>
            <p className="text-gray-600 mt-2">
              We work with trusted third-party services that may set their own cookies. Here's what you need to know:
            </p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Provider</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Purpose</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Cookie Names</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Privacy Policy</th>
                  </tr>
                </thead>
                <tbody>
                  {thirdPartyCookies.map((provider, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{provider.provider}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{provider.purpose}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {provider.cookies.map((cookie, cookieIndex) => (
                            <span key={cookieIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {cookie}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <a 
                          href={provider.privacy} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View Policy
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Managing Cookies */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Managing Your Cookie Preferences</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Browser Settings</h3>
                <p className="text-gray-600 mb-4">
                  You can control cookies through your browser settings. Here's how to manage cookies in popular browsers:
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium text-gray-900">Chrome</span>
                    <span className="text-sm text-gray-600">Settings → Privacy → Cookies</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium text-gray-900">Firefox</span>
                    <span className="text-sm text-gray-600">Options → Privacy → Cookies</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium text-gray-900">Safari</span>
                    <span className="text-sm text-gray-600">Preferences → Privacy</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium text-gray-900">Edge</span>
                    <span className="text-sm text-gray-600">Settings → Privacy → Cookies</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Cookie Settings</h3>
                <p className="text-gray-600 mb-4">
                  You can also manage your cookie preferences directly on our website using the cookie banner or visiting our preference center.
                </p>
                <div className="space-y-3">
                  <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Open Cookie Preferences
                  </button>
                  <button className="w-full p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    View Current Settings
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Info className="h-5 w-5 text-yellow-600 mr-2" />
                <h4 className="font-semibold text-yellow-900">Important Note</h4>
              </div>
              <p className="text-yellow-800 text-sm">
                Disabling certain cookies may affect the functionality of our website. Essential cookies are required for the site to work properly and cannot be disabled.
              </p>
            </div>
          </div>
        </div>

        {/* Updates and Contact */}
        <div className="bg-gray-900 text-white rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Policy Updates</h2>
              <p className="text-gray-300 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. 
                When we update the policy, we will change the "Last Updated" date at the top of this page.
              </p>
              <p className="text-gray-300">
                We encourage you to review this policy periodically to stay informed about how we use cookies.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Questions?</h2>
              <p className="text-gray-300 mb-4">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-300">privacy@briskbuy.com</span>
                </div>
                <div className="flex items-center">
                  <Settings className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
