import React, { useState } from 'react';
import { Ruler, Shirt, User, Package, Info, ArrowRight } from 'lucide-react';

const SizeGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState('clothing');

  const clothingSizes = {
    women: {
      title: "Women's Clothing",
      sizes: [
        { size: 'XS', bust: '30-32', waist: '24-26', hips: '33-35' },
        { size: 'S', bust: '32-34', waist: '26-28', hips: '35-37' },
        { size: 'M', bust: '34-36', waist: '28-30', hips: '37-39' },
        { size: 'L', bust: '36-39', waist: '30-33', hips: '39-42' },
        { size: 'XL', bust: '39-42', waist: '33-36', hips: '42-45' },
        { size: 'XXL', bust: '42-45', waist: '36-39', hips: '45-48' },
      ]
    },
    men: {
      title: "Men's Clothing",
      sizes: [
        { size: 'XS', chest: '32-34', waist: '26-28', neck: '13-13.5' },
        { size: 'S', chest: '34-36', waist: '28-30', neck: '14-14.5' },
        { size: 'M', chest: '36-38', waist: '30-32', neck: '15-15.5' },
        { size: 'L', chest: '38-40', waist: '32-34', neck: '16-16.5' },
        { size: 'XL', chest: '40-42', waist: '34-36', neck: '17-17.5' },
        { size: 'XXL', chest: '42-44', waist: '36-38', neck: '18-18.5' },
      ]
    }
  };

  const shoeSizes = {
    women: [
      { us: '5', uk: '2.5', eu: '35', cm: '22' },
      { us: '5.5', uk: '3', eu: '35.5', cm: '22.5' },
      { us: '6', uk: '3.5', eu: '36', cm: '23' },
      { us: '6.5', uk: '4', eu: '37', cm: '23.5' },
      { us: '7', uk: '4.5', eu: '37.5', cm: '24' },
      { us: '7.5', uk: '5', eu: '38', cm: '24.5' },
      { us: '8', uk: '5.5', eu: '38.5', cm: '25' },
      { us: '8.5', uk: '6', eu: '39', cm: '25.5' },
      { us: '9', uk: '6.5', eu: '40', cm: '26' },
      { us: '9.5', uk: '7', eu: '40.5', cm: '26.5' },
      { us: '10', uk: '7.5', eu: '41', cm: '27' },
    ],
    men: [
      { us: '6', uk: '5.5', eu: '39', cm: '24' },
      { us: '6.5', uk: '6', eu: '39.5', cm: '24.5' },
      { us: '7', uk: '6.5', eu: '40', cm: '25' },
      { us: '7.5', uk: '7', eu: '40.5', cm: '25.5' },
      { us: '8', uk: '7.5', eu: '41', cm: '26' },
      { us: '8.5', uk: '8', eu: '42', cm: '26.5' },
      { us: '9', uk: '8.5', eu: '42.5', cm: '27' },
      { us: '9.5', uk: '9', eu: '43', cm: '27.5' },
      { us: '10', uk: '9.5', eu: '44', cm: '28' },
      { us: '10.5', uk: '10', eu: '44.5', cm: '28.5' },
      { us: '11', uk: '10.5', eu: '45', cm: '29' },
      { us: '11.5', uk: '11', eu: '45.5', cm: '29.5' },
      { us: '12', uk: '11.5', eu: '46', cm: '30' },
    ]
  };

  const measurementTips = [
    {
      icon: Ruler,
      title: "Use a Soft Measuring Tape",
      description: "A flexible measuring tape will give you the most accurate measurements. Don't pull too tight!"
    },
    {
      icon: Shirt,
      title: "Wear Proper Undergarments",
      description: "Take measurements while wearing the undergarments you plan to wear with the clothing item."
    },
    {
      icon: User,
      title: "Get Help if Possible",
      description: "Having someone help you measure ensures better accuracy, especially for hard-to-reach areas."
    },
    {
      icon: Package,
      title: "Check Size Charts for Each Brand",
      description: "Sizes can vary between brands, so always check our specific size chart for each item."
    }
  ];

  const fitGuides = [
    {
      type: "Regular Fit",
      description: "Standard cut that follows the body's natural silhouette without being too loose or tight."
    },
    {
      type: "Slim Fit",
      description: "Closer to the body for a more tailored appearance. Consider sizing up if you prefer more room."
    },
    {
      type: "Relaxed Fit",
      description: "Roomier cut for maximum comfort. May run larger than standard sizing."
    },
    {
      type: "Oversized",
      description: "Intentionally large and loose. Often worn 1-2 sizes larger than your usual size."
    }
  ];

  const categories = [
    { id: 'clothing', name: 'Clothing Sizes', icon: Shirt },
    { id: 'shoes', name: 'Shoe Sizes', icon: Package },
    { id: 'tips', name: 'Measuring Tips', icon: Ruler },
    { id: 'fits', name: 'Fit Guide', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Size Guide</h1>
          <p className="text-lg text-gray-600">
            Find your perfect fit with our comprehensive sizing information
          </p>
        </div>

        {/* Category Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center py-4 px-6 text-sm font-medium border-b-2 ${
                      selectedCategory === category.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {selectedCategory === 'clothing' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Clothing Size Charts</h2>
                
                {/* Women's Clothing */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{clothingSizes.women.title}</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bust (inches)</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist (inches)</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hips (inches)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {clothingSizes.women.sizes.map((size, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{size.size}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.bust}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.waist}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.hips}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Men's Clothing */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{clothingSizes.men.title}</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chest (inches)</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist (inches)</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Neck (inches)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {clothingSizes.men.sizes.map((size, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{size.size}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.chest}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.waist}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.neck}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {selectedCategory === 'shoes' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shoe Size Conversion</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Women's Shoes */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Women's Shoes</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-pink-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">US</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">UK</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">EU</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CM</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {shoeSizes.women.map((size, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{size.us}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{size.uk}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{size.eu}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{size.cm}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Men's Shoes */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Men's Shoes</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">US</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">UK</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">EU</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CM</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {shoeSizes.men.map((size, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{size.us}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{size.uk}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{size.eu}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{size.cm}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <Info className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-800">Shoe Sizing Tip:</span>
                  </div>
                  <p className="text-blue-700 mt-1">
                    Measure your feet at the end of the day when they're slightly swollen for the most accurate size. 
                    Always go with the larger foot if there's a difference between your left and right foot.
                  </p>
                </div>
              </div>
            )}

            {selectedCategory === 'tips' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Measure Yourself</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {measurementTips.map((tip, index) => {
                    const IconComponent = tip.icon;
                    return (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center mb-3">
                          <div className="p-2 bg-blue-100 rounded-lg mr-3">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                        </div>
                        <p className="text-gray-600">{tip.description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Measurements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">For Women:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-blue-600 mr-2" />
                          <span><strong>Bust:</strong> Around the fullest part of your chest</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-blue-600 mr-2" />
                          <span><strong>Waist:</strong> Around the narrowest part of your torso</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-blue-600 mr-2" />
                          <span><strong>Hips:</strong> Around the fullest part of your hips</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">For Men:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-blue-600 mr-2" />
                          <span><strong>Chest:</strong> Around the fullest part of your chest</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-blue-600 mr-2" />
                          <span><strong>Waist:</strong> Around your natural waistline</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-blue-600 mr-2" />
                          <span><strong>Neck:</strong> Around the base of your neck</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedCategory === 'fits' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Fit Guide</h2>
                
                <div className="space-y-6">
                  {fitGuides.map((fit, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{fit.type}</h3>
                      <p className="text-gray-600">{fit.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Size Between Two Sizes?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Size Up If:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• You prefer a looser fit</li>
                        <li>• You plan to layer underneath</li>
                        <li>• The item is fitted or slim cut</li>
                        <li>• You're between sizes on multiple measurements</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Size Down If:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• You prefer a closer fit</li>
                        <li>• The item is oversized or relaxed</li>
                        <li>• Only one measurement is between sizes</li>
                        <li>• The fabric has stretch</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Still Have Questions */}
        <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still Not Sure About Sizing?</h2>
          <p className="text-gray-300 mb-6">
            Our customer service team can help you find the perfect fit. We're here to help!
          </p>
          <div className="space-y-2">
            <p className="text-gray-300">📧 support@briskbuy.com</p>
            <p className="text-gray-300">📞 +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
