import React, { useState } from 'react';
import { FileText, ShoppingCart, CreditCard, Shield, AlertTriangle, Scale, Calendar, Mail } from 'lucide-react';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: FileText },
    { id: 'acceptance', title: 'Acceptance of Terms', icon: Shield },
    { id: 'services', title: 'Our Services', icon: ShoppingCart },
    { id: 'accounts', title: 'User Accounts', icon: FileText },
    { id: 'orders', title: 'Orders & Payments', icon: CreditCard },
    { id: 'prohibited', title: 'Prohibited Uses', icon: AlertTriangle },
    { id: 'liability', title: 'Limitation of Liability', icon: Scale },
    { id: 'contact', title: 'Contact Information', icon: Mail }
  ];

  const lastUpdated = 'January 15, 2025';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 mb-2">
            Please read these terms carefully before using our services
          </p>
          <div className="flex items-center justify-center text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contents</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="h-4 w-4 mr-3" />
                      {section.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-8">
                {activeSection === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Terms of Service Overview</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-lg text-gray-600 mb-6">
                        Welcome to BriskBuy! These Terms of Service ("Terms") govern your use of our website, mobile application, 
                        and related services provided by BriskBuy ("we," "us," or "our").
                      </p>
                      
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                        <p className="text-blue-800 font-medium">
                          By accessing or using our services, you agree to be bound by these Terms. 
                          If you disagree with any part of these terms, you may not access our services.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        <div className="p-6 bg-green-50 rounded-lg">
                          <Shield className="h-12 w-12 text-green-600 mb-3" />
                          <h3 className="font-semibold text-gray-900 mb-2">Your Rights</h3>
                          <p className="text-sm text-gray-600">We respect your rights as a consumer and provide clear guidelines for service use</p>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-lg">
                          <Scale className="h-12 w-12 text-purple-600 mb-3" />
                          <h3 className="font-semibold text-gray-900 mb-2">Fair Terms</h3>
                          <p className="text-sm text-gray-600">Our terms are designed to be fair and transparent for all users</p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Points</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• These terms apply to all users of BriskBuy services</li>
                        <li>• You must be at least 18 years old to use our services</li>
                        <li>• We reserve the right to modify these terms with notice</li>
                        <li>• Violation of these terms may result in account suspension or termination</li>
                        <li>• These terms are governed by the laws of the United States</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeSection === 'acceptance' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Acceptance of Terms</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Agreement to Terms</h3>
                        <p className="text-gray-600 mb-4">
                          By accessing and using BriskBuy's website, mobile application, or any related services, you acknowledge that you have read, 
                          understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Eligibility</h3>
                        <p className="text-gray-600 mb-4">To use our services, you must:</p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Be at least 18 years of age or the age of majority in your jurisdiction</li>
                          <li>• Have the legal capacity to enter into a binding contract</li>
                          <li>• Not be prohibited from using our services under applicable laws</li>
                          <li>• Provide accurate and complete information when creating an account</li>
                          <li>• Comply with all applicable local, state, and federal laws</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Modifications to Terms</h3>
                        <p className="text-gray-600 mb-4">
                          We reserve the right to modify these Terms at any time. When we make changes, we will:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Update the "Last Updated" date at the top of these Terms</li>
                          <li>• Notify you of material changes via email or website notification</li>
                          <li>• Provide you with an opportunity to review the updated Terms</li>
                          <li>• Allow you to discontinue use if you disagree with the changes</li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                          Your continued use of our services after any modifications constitutes acceptance of the updated Terms.
                        </p>
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold text-yellow-900 mb-2">Important Note</h4>
                        <p className="text-yellow-800">
                          If you do not agree to these Terms or any future modifications, you must immediately stop using our services 
                          and may delete your account by contacting customer support.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'services' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Services</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Description</h3>
                        <p className="text-gray-600 mb-4">
                          BriskBuy is an e-commerce platform that provides users with access to purchase a variety of products including:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <ul className="space-y-2 text-gray-600">
                            <li>• Electronics and technology products</li>
                            <li>• Fashion and apparel</li>
                            <li>• Home and kitchen items</li>
                            <li>• Books and media</li>
                          </ul>
                          <ul className="space-y-2 text-gray-600">
                            <li>• Sports and outdoor equipment</li>
                            <li>• Health and beauty products</li>
                            <li>• Toys and games</li>
                            <li>• And many other categories</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h3>
                        <p className="text-gray-600 mb-4">
                          Our services are available 24/7, but we reserve the right to:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Temporarily suspend service for maintenance or updates</li>
                          <li>• Modify or discontinue services with or without notice</li>
                          <li>• Limit service availability in certain geographic regions</li>
                          <li>• Restrict access during high traffic periods</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Information</h3>
                        <p className="text-gray-600 mb-4">
                          We strive to provide accurate product information, but:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Product descriptions, images, and prices are subject to change</li>
                          <li>• We do not warrant that product information is complete or error-free</li>
                          <li>• Colors shown in images may vary due to monitor settings</li>
                          <li>• Product availability is subject to inventory levels</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Services</h3>
                        <p className="text-gray-600 mb-4">
                          Our platform may integrate with third-party services for:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Payment processing</li>
                          <li>• Shipping and delivery</li>
                          <li>• Customer support</li>
                          <li>• Analytics and marketing</li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                          Use of third-party services is subject to their respective terms and conditions.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'accounts' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">User Accounts</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
                        <p className="text-gray-600 mb-4">
                          To access certain features of our service, you must create an account. When creating an account, you agree to:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Provide accurate, current, and complete information</li>
                          <li>• Maintain and update your information as needed</li>
                          <li>• Choose a secure password and keep it confidential</li>
                          <li>• Accept responsibility for all activities under your account</li>
                          <li>• Notify us immediately of any unauthorized use</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Security</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">Your Responsibilities</h4>
                            <ul className="space-y-1 text-green-800 text-sm">
                              <li>• Keep login credentials secure</li>
                              <li>• Use strong, unique passwords</li>
                              <li>• Log out from shared devices</li>
                              <li>• Monitor account activity</li>
                              <li>• Report suspicious activity</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">Our Protections</h4>
                            <ul className="space-y-1 text-blue-800 text-sm">
                              <li>• Encrypted data transmission</li>
                              <li>• Secure password storage</li>
                              <li>• Account monitoring systems</li>
                              <li>• Two-factor authentication option</li>
                              <li>• Regular security updates</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Termination</h3>
                        <p className="text-gray-600 mb-4">
                          You may terminate your account at any time by contacting customer support. We may terminate or suspend your account if:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• You violate these Terms of Service</li>
                          <li>• You engage in fraudulent or illegal activities</li>
                          <li>• Your account remains inactive for an extended period</li>
                          <li>• We receive valid legal requests to do so</li>
                          <li>• We discontinue the service</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-semibold text-red-900 mb-2">Account Termination Effects</h4>
                        <p className="text-red-800 text-sm">
                          Upon account termination, you will lose access to your account data, order history, and stored payment information. 
                          Outstanding orders and obligations will remain in effect.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'orders' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Orders & Payments</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Order Process</h3>
                        <p className="text-gray-600 mb-4">
                          When you place an order through our platform:
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-semibold text-sm">1</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Order Submission</h4>
                              <p className="text-gray-600 text-sm">Your order constitutes an offer to purchase the selected products</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-semibold text-sm">2</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Order Confirmation</h4>
                              <p className="text-gray-600 text-sm">We send you an order confirmation email with order details</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-semibold text-sm">3</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Order Acceptance</h4>
                              <p className="text-gray-600 text-sm">We accept your order by processing payment and beginning fulfillment</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Pricing and Payment</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Pricing Policy</h4>
                            <ul className="space-y-2 text-gray-600 text-sm">
                              <li>• All prices are in US dollars unless otherwise stated</li>
                              <li>• Prices include applicable taxes where required</li>
                              <li>• Shipping costs are calculated at checkout</li>
                              <li>• Prices are subject to change without notice</li>
                              <li>• We reserve the right to correct pricing errors</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Payment Methods</h4>
                            <ul className="space-y-2 text-gray-600 text-sm">
                              <li>• Major credit and debit cards</li>
                              <li>• PayPal and digital wallets</li>
                              <li>• Buy now, pay later services</li>
                              <li>• Gift cards and store credit</li>
                              <li>• All payments are processed securely</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Order Cancellation and Modification</h3>
                        <p className="text-gray-600 mb-4">
                          Order changes and cancellations are subject to the following conditions:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Orders can be cancelled within 2 hours of placement if not yet processed</li>
                          <li>• Modifications may not be possible once an order enters fulfillment</li>
                          <li>• Cancelled orders will be refunded using the original payment method</li>
                          <li>• Custom or personalized items may not be cancellable</li>
                          <li>• Contact customer service for cancellation requests</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Shipping and Delivery</h3>
                        <p className="text-gray-600 mb-4">
                          Shipping terms and conditions:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Delivery times are estimates and not guaranteed</li>
                          <li>• Risk of loss transfers to you upon delivery</li>
                          <li>• You are responsible for providing accurate shipping information</li>
                          <li>• Additional fees may apply for expedited shipping</li>
                          <li>• We are not liable for delays caused by carriers or weather</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'prohibited' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Prohibited Uses</h2>
                    <div className="space-y-6">
                      <p className="text-gray-600">
                        You agree not to use our services for any unlawful purpose or in any way that could damage, 
                        disable, overburden, or impair our services.
                      </p>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Prohibited Activities</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Account Misuse</h4>
                            <ul className="space-y-2 text-gray-600 text-sm">
                              <li>• Creating fake or multiple accounts</li>
                              <li>• Sharing account credentials</li>
                              <li>• Impersonating others</li>
                              <li>• Using automated tools or bots</li>
                              <li>• Circumventing security measures</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Fraudulent Activities</h4>
                            <ul className="space-y-2 text-gray-600 text-sm">
                              <li>• Using stolen payment information</li>
                              <li>• Chargeback fraud or abuse</li>
                              <li>• False claims or disputes</li>
                              <li>• Identity theft or fraud</li>
                              <li>• Money laundering activities</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Technical Abuse</h4>
                            <ul className="space-y-2 text-gray-600 text-sm">
                              <li>• Attempting to hack or breach security</li>
                              <li>• Introducing viruses or malware</li>
                              <li>• Overloading our systems</li>
                              <li>• Reverse engineering our software</li>
                              <li>• Data scraping or harvesting</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Content Violations</h4>
                            <ul className="space-y-2 text-gray-600 text-sm">
                              <li>• Posting inappropriate content</li>
                              <li>• Harassment or threatening behavior</li>
                              <li>• Spam or unsolicited messages</li>
                              <li>• Copyright or trademark infringement</li>
                              <li>• False or misleading information</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Consequences of Violations</h3>
                        <p className="text-gray-600 mb-4">
                          Violation of these prohibited uses may result in:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Warning notices and account restrictions</li>
                          <li>• Temporary or permanent account suspension</li>
                          <li>• Cancellation of pending orders</li>
                          <li>• Legal action and cooperation with law enforcement</li>
                          <li>• Liability for damages caused by violations</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                          <h4 className="font-semibold text-red-900">Important Warning</h4>
                        </div>
                        <p className="text-red-800 text-sm">
                          We actively monitor for prohibited activities and maintain the right to investigate suspicious behavior. 
                          Violations may be reported to appropriate authorities and could result in criminal prosecution.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'liability' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Limitation of Liability</h2>
                    <div className="space-y-6">
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-800 font-medium">
                          The following limitations may not apply in jurisdictions that do not allow the exclusion 
                          or limitation of liability for incidental or consequential damages.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Disclaimer</h3>
                        <p className="text-gray-600 mb-4">
                          Our services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Warranties of merchantability and fitness for a particular purpose</li>
                          <li>• Warranties of non-infringement of third-party rights</li>
                          <li>• Warranties that the service will be uninterrupted or error-free</li>
                          <li>• Warranties regarding the accuracy or reliability of content</li>
                          <li>• Warranties that defects will be corrected</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Damages</h3>
                        <p className="text-gray-600 mb-4">
                          To the fullest extent permitted by applicable law, BriskBuy shall not be liable for:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Excluded Damages</h4>
                            <ul className="space-y-2 text-gray-600 text-sm">
                              <li>• Indirect or consequential damages</li>
                              <li>• Lost profits or revenue</li>
                              <li>• Data loss or corruption</li>
                              <li>• Business interruption</li>
                              <li>• Punitive or exemplary damages</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Maximum Liability</h4>
                            <ul className="space-y-2 text-gray-600 text-sm">
                              <li>• Limited to the amount paid for products</li>
                              <li>• Capped at $100 for service-related claims</li>
                              <li>• Subject to applicable consumer protection laws</li>
                              <li>• Exclusions may not apply to personal injury</li>
                              <li>• Some jurisdictions limit liability exclusions</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Indemnification</h3>
                        <p className="text-gray-600 mb-4">
                          You agree to indemnify, defend, and hold harmless BriskBuy and its affiliates from any claims, 
                          damages, losses, or expenses arising from:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Your use of our services</li>
                          <li>• Your violation of these Terms</li>
                          <li>• Your violation of any rights of another party</li>
                          <li>• Your negligent or wrongful conduct</li>
                          <li>• Any content you submit or transmit</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Products</h3>
                        <p className="text-gray-600 mb-4">
                          For products sold by third-party sellers on our platform:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• We act as an intermediary between you and the seller</li>
                          <li>• Product warranties are provided by the manufacturer or seller</li>
                          <li>• We are not responsible for third-party product defects</li>
                          <li>• Returns and refunds follow our standard policies</li>
                          <li>• We may assist with dispute resolution</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Consumer Rights</h4>
                        <p className="text-blue-800 text-sm">
                          Nothing in these Terms limits your statutory consumer rights. In jurisdictions where liability 
                          cannot be excluded or limited, our liability is limited to the extent permitted by law.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'contact' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      <p className="text-gray-600">
                        If you have questions about these Terms of Service or need to contact us regarding any legal matters, 
                        please use the following contact information:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-4">Legal Department</h3>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Mail className="h-5 w-5 text-gray-400 mr-3" />
                              <span className="text-gray-700">legal@briskbuy.com</span>
                            </div>
                            <div className="flex items-start">
                              <Scale className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                              <div className="text-gray-700">
                                <p>BriskBuy Legal Department</p>
                                <p>123 Commerce Street</p>
                                <p>City, State 12345</p>
                                <p>United States</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-4">Customer Support</h3>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Mail className="h-5 w-5 text-gray-400 mr-3" />
                              <span className="text-gray-700">support@briskbuy.com</span>
                            </div>
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-gray-400 mr-3" />
                              <span className="text-gray-700">+1 (555) 123-4567</span>
                            </div>
                            <div className="text-gray-600 text-sm">
                              <p>Customer Support Hours:</p>
                              <p>Monday - Friday: 9 AM - 7 PM EST</p>
                              <p>Saturday - Sunday: 10 AM - 6 PM EST</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Governing Law and Jurisdiction</h3>
                        <p className="text-gray-600 mb-4">
                          These Terms of Service are governed by and construed in accordance with the laws of the State of California, 
                          United States, without regard to its conflict of law provisions.
                        </p>
                        <p className="text-gray-600 mb-4">
                          Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or 
                          state courts located in California, and the parties consent to personal jurisdiction and venue therein.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Dispute Resolution</h3>
                        <p className="text-gray-600 mb-4">
                          Before filing any legal action, we encourage you to contact our customer support team to resolve any disputes informally. 
                          Many issues can be resolved quickly through direct communication.
                        </p>
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-semibold text-green-900 mb-2">Alternative Dispute Resolution</h4>
                          <p className="text-green-800 text-sm">
                            For certain disputes, you may also have the option to participate in mediation or arbitration 
                            as an alternative to court proceedings. Contact our legal department for more information.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Document Retention</h4>
                        <p className="text-gray-600 text-sm">
                          We recommend that you save or print a copy of these Terms for your records. 
                          These Terms remain in effect while you use our services.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
