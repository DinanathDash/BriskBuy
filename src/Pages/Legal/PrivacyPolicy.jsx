import React, { useState } from 'react';
import { Shield, Eye, Database, Users, Lock, Globe, Mail, Calendar } from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: Eye },
    { id: 'collection', title: 'Information We Collect', icon: Database },
    { id: 'usage', title: 'How We Use Information', icon: Users },
    { id: 'sharing', title: 'Information Sharing', icon: Globe },
    { id: 'security', title: 'Data Security', icon: Lock },
    { id: 'rights', title: 'Your Rights', icon: Shield },
    { id: 'contact', title: 'Contact Us', icon: Mail }
  ];

  const lastUpdated = 'January 15, 2025';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 mb-2">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Privacy Policy Overview</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-lg text-gray-600 mb-6">
                        At BriskBuy, we are committed to protecting your privacy and ensuring the security of your personal information. 
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                        or use our services.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                        <div className="text-center p-6 bg-blue-50 rounded-lg">
                          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                          <h3 className="font-semibold text-gray-900 mb-2">Data Protection</h3>
                          <p className="text-sm text-gray-600">We use industry-standard security measures to protect your data</p>
                        </div>
                        <div className="text-center p-6 bg-green-50 rounded-lg">
                          <Lock className="h-12 w-12 text-green-600 mx-auto mb-3" />
                          <h3 className="font-semibold text-gray-900 mb-2">Secure Transactions</h3>
                          <p className="text-sm text-gray-600">All payments and personal data are encrypted and secure</p>
                        </div>
                        <div className="text-center p-6 bg-purple-50 rounded-lg">
                          <Users className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                          <h3 className="font-semibold text-gray-900 mb-2">Your Control</h3>
                          <p className="text-sm text-gray-600">You have control over your personal information and privacy settings</p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">What This Policy Covers</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Information we collect and why we collect it</li>
                        <li>• How we use your information</li>
                        <li>• When we share information with others</li>
                        <li>• How we store and secure your information</li>
                        <li>• Your choices regarding your information</li>
                        <li>• How to contact us about privacy concerns</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeSection === 'collection' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Information We Collect</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                        <p className="text-gray-600 mb-4">We collect information you provide directly to us, such as:</p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Name, email address, and phone number</li>
                          <li>• Billing and shipping addresses</li>
                          <li>• Payment information (processed securely by our payment providers)</li>
                          <li>• Account preferences and settings</li>
                          <li>• Communication preferences</li>
                          <li>• Reviews and feedback you provide</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                        <p className="text-gray-600 mb-4">We automatically collect certain information when you use our services:</p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Device information (IP address, browser type, operating system)</li>
                          <li>• Usage data (pages visited, time spent, clicks)</li>
                          <li>• Location information (with your permission)</li>
                          <li>• Cookies and similar tracking technologies</li>
                          <li>• Log files and server data</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Information from Third Parties</h3>
                        <p className="text-gray-600 mb-4">We may receive information from:</p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Social media platforms (if you connect your accounts)</li>
                          <li>• Payment processors and financial institutions</li>
                          <li>• Shipping and delivery partners</li>
                          <li>• Marketing and analytics partners</li>
                          <li>• Public databases and data aggregators</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'usage' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">How We Use Your Information</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Provision</h3>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Process and fulfill your orders</li>
                          <li>• Manage your account and provide customer support</li>
                          <li>• Send order confirmations and shipping notifications</li>
                          <li>• Process payments and prevent fraud</li>
                          <li>• Provide personalized product recommendations</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Communication</h3>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Send promotional emails and newsletters (with your consent)</li>
                          <li>• Respond to your inquiries and provide support</li>
                          <li>• Send important updates about our services</li>
                          <li>• Conduct surveys and gather feedback</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Improvement and Analytics</h3>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Analyze usage patterns to improve our services</li>
                          <li>• Conduct research and development</li>
                          <li>• Monitor and analyze trends</li>
                          <li>• Enhance security and prevent misuse</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal and Compliance</h3>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Comply with legal obligations</li>
                          <li>• Protect our rights and property</li>
                          <li>• Resolve disputes and enforce agreements</li>
                          <li>• Prevent fraud and ensure security</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'sharing' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Information Sharing</h2>
                    <div className="space-y-6">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800 font-medium">
                          We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">We may share your information with:</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Service Providers</h4>
                            <p className="text-gray-600 mb-2">Third parties who help us operate our business:</p>
                            <ul className="space-y-1 text-gray-600 pl-6">
                              <li>• Payment processors and financial institutions</li>
                              <li>• Shipping and delivery companies</li>
                              <li>• Cloud hosting and data storage providers</li>
                              <li>• Customer service and support platforms</li>
                              <li>• Marketing and analytics services</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Legal Requirements</h4>
                            <p className="text-gray-600 mb-2">When required by law or to:</p>
                            <ul className="space-y-1 text-gray-600 pl-6">
                              <li>• Comply with legal processes</li>
                              <li>• Respond to government requests</li>
                              <li>• Protect our rights and property</li>
                              <li>• Ensure safety and security</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Business Transfers</h4>
                            <p className="text-gray-600">
                              In connection with mergers, acquisitions, or sales of business assets, 
                              your information may be transferred as part of the transaction.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">With Your Consent</h4>
                            <p className="text-gray-600">
                              We may share your information with third parties when you explicitly 
                              consent to such sharing.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'security' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Security</h2>
                    <div className="space-y-6">
                      <p className="text-gray-600">
                        We implement appropriate technical and organizational security measures to protect your personal information 
                        against unauthorized access, alteration, disclosure, or destruction.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                          <h3 className="font-semibold text-green-900 mb-3">Technical Safeguards</h3>
                          <ul className="space-y-2 text-green-800">
                            <li>• SSL/TLS encryption for data transmission</li>
                            <li>• Encrypted data storage</li>
                            <li>• Regular security audits and assessments</li>
                            <li>• Secure access controls and authentication</li>
                            <li>• Regular software updates and patches</li>
                          </ul>
                        </div>

                        <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
                          <h3 className="font-semibold text-purple-900 mb-3">Organizational Measures</h3>
                          <ul className="space-y-2 text-purple-800">
                            <li>• Employee privacy training and awareness</li>
                            <li>• Limited access on a need-to-know basis</li>
                            <li>• Data handling policies and procedures</li>
                            <li>• Incident response and breach protocols</li>
                            <li>• Third-party security assessments</li>
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h3 className="font-semibold text-yellow-900 mb-2">Important Security Note</h3>
                        <p className="text-yellow-800">
                          While we strive to protect your personal information, no method of transmission over the internet 
                          or electronic storage is 100% secure. We cannot guarantee absolute security, but we continuously 
                          work to improve our security measures.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Retention</h3>
                        <p className="text-gray-600 mb-4">
                          We retain your personal information only for as long as necessary to:
                        </p>
                        <ul className="space-y-2 text-gray-600 pl-6">
                          <li>• Provide our services and support</li>
                          <li>• Comply with legal obligations</li>
                          <li>• Resolve disputes and enforce agreements</li>
                          <li>• Improve our services and user experience</li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                          When we no longer need your information, we securely delete or anonymize it.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'rights' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Privacy Rights</h2>
                    <div className="space-y-6">
                      <p className="text-gray-600">
                        You have certain rights regarding your personal information. The availability of these rights 
                        may depend on your location and applicable laws.
                      </p>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Access</h3>
                            <p className="text-gray-600 text-sm">
                              Request a copy of the personal information we have about you.
                            </p>
                          </div>

                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Correction</h3>
                            <p className="text-gray-600 text-sm">
                              Update or correct inaccurate personal information.
                            </p>
                          </div>

                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Deletion</h3>
                            <p className="text-gray-600 text-sm">
                              Request deletion of your personal information (subject to legal requirements).
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Portability</h3>
                            <p className="text-gray-600 text-sm">
                              Receive your personal information in a structured, machine-readable format.
                            </p>
                          </div>

                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Restriction</h3>
                            <p className="text-gray-600 text-sm">
                              Limit how we process your personal information.
                            </p>
                          </div>

                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Objection</h3>
                            <p className="text-gray-600 text-sm">
                              Object to processing of your personal information for certain purposes.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Exercise Your Rights</h3>
                        <p className="text-gray-600 mb-4">
                          To exercise any of these rights, please contact us using the information in the "Contact Us" section. 
                          We will respond to your request within the timeframe required by applicable law.
                        </p>
                        
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Account Settings</h4>
                          <p className="text-blue-800 text-sm">
                            You can also manage many of your privacy preferences directly through your account settings, 
                            including communication preferences and data sharing options.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'contact' && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h2>
                    <div className="space-y-6">
                      <p className="text-gray-600">
                        If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, 
                        please contact us using one of the methods below.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-4">General Privacy Inquiries</h3>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Mail className="h-5 w-5 text-gray-400 mr-3" />
                              <span className="text-gray-700">privacy@briskbuy.com</span>
                            </div>
                            <div className="flex items-center">
                              <Globe className="h-5 w-5 text-gray-400 mr-3" />
                              <span className="text-gray-700">www.briskbuy.com/privacy</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-4">Mailing Address</h3>
                          <div className="text-gray-700">
                            <p>BriskBuy Privacy Team</p>
                            <p>123 Commerce Street</p>
                            <p>City, State 12345</p>
                            <p>United States</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-3">Response Time</h3>
                        <p className="text-gray-600">
                          We strive to respond to all privacy-related inquiries within 30 days. For urgent matters, 
                          please indicate the urgency in your communication, and we will prioritize your request accordingly.
                        </p>
                      </div>

                      <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-3">Policy Updates</h3>
                        <p className="text-blue-800">
                          We may update this Privacy Policy from time to time. We will notify you of any material changes 
                          by posting the new policy on our website and, where appropriate, sending you a notification. 
                          Your continued use of our services after such modifications constitutes acceptance of the updated policy.
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

export default PrivacyPolicy;
