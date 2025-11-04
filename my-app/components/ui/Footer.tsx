import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Company Info - Takes more space */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center">
                            <div className="w-24 h-24 flex items-center justify-center border border-gray-200 rounded-xl bg-white">
                                <img
                                    alt="Cloud Partners logo"
                                    src="/2-1-removebg-preview.png"
                                    className="w-20 h-20 rounded-xl object-contain"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Building innovative solutions for tomorrow's challenges. We're dedicated to
                                delivering exceptional products and services that make a difference.
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <a 
                                href="#" 
                                aria-label="Facebook" 
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                            >
                                <Facebook size={18} />
                            </a>
                            <a 
                                href="#" 
                                aria-label="Twitter" 
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                            >
                                <Twitter size={18} />
                            </a>
                            <a 
                                href="#" 
                                aria-label="LinkedIn" 
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a 
                                href="#" 
                                aria-label="Instagram" 
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3">
                            {['About Us', 'Services', 'Products', 'Careers', 'Blog'].map((item, index) => (
                                <li key={index}>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm inline-block">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Support</h4>
                        <ul className="space-y-3">
                            {['Help Center', 'Contact Us', 'FAQ', 'Documentation', 'System Status'].map((item, index) => (
                                <li key={index}>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm inline-block">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4 space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Get in Touch</h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50 flex-shrink-0">
                                    <MapPin size={16} className="text-gray-600" />
                                </div>
                                <div className="text-gray-600 text-sm leading-relaxed">
                                    400 Level 02, Sri Sangaraja Mawatha,<br />
                                    Colombo 12, Sri Lanka
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50 flex-shrink-0">
                                    <Phone size={16} className="text-gray-600" />
                                </div>
                                <a href="tel:+94788660055" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                    +94 78 866 0055
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50 flex-shrink-0">
                                    <Mail size={16} className="text-gray-600" />
                                </div>
                                <a href="mailto:hello@cloudpartners.com" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                    hello@cloudpartners.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h4 className="text-2xl font-semibold text-gray-900 mb-2">Stay in the Loop</h4>
                        <p className="text-gray-600 text-sm mb-6">
                            Subscribe to our newsletter for the latest updates, insights, and exclusive offers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                            />
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap shadow-sm hover:shadow">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-gray-600 text-sm">
                            © {currentYear} Cloud Partners. All rights reserved.
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;