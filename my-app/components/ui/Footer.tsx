import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white text-black">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-60 h-60 flex items-center justify-center border-2">
                                <Image
                                    alt="logo"
                                    src="/2-1-removebg-preview.png"
                                    width={120}
                                    height={100}
                                    className="w-60 h-60 rounded-xl"
                                />
                            </div>
                            {/*<h3 className="text-xl font-bold">Cloud Partners</h3>*/}
                        </div>
                        <p className="text-black text-sm leading-relaxed">
                            Building innovative solutions for tomorrow&apos;s challenges. We&apos;re dedicated to
                            delivering exceptional products and services that make a difference.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-black  transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-black  transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-black  transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="text-black  transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-black hover:text-gray-400 transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/service" className="text-black hover:text-gray-400 transition-colors text-sm">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="text-black hover:text-gray-400 transition-colors text-sm">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-black hover:text-gray-400 transition-colors text-sm">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-black hover:text-gray-400 transition-colors text-sm">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="text-black hover:text-gray-400 transition-colors text-sm">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-black hover:text-gray-400 transition-colors text-sm">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-black hover:text-gray-400 transition-colors text-sm">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/documentation" className="text-black hover:text-gray-400 transition-colors text-sm">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/status" className="text-black hover:text-gray-400 transition-colors text-sm">
                                    System Status
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Contact Info</h4>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin size={16} className="text-black mt-1" />
                                <div className="text-black text-sm">
                                    <p>400 Level 02</p>
                                    <p>Sri Sangaraja Mawatha</p>
                                    <p>Colombo 12</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone size={16} className="text-black" />
                                <a href="tel:+1234567890" className="text-black hover:text-gray-400 transition-colors text-sm">
                                    +94 78 866 0055
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail size={16} className="text-black" />
                                <a href="mailto:info@company.com" className="text-black hover:text-gray-400 transition-colors text-sm">
                                    hello@cloudpartners.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Signup */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
                            <p className="text-black text-sm">
                                Subscribe to our newsletter for the latest updates and insights.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="text-blacktext-sm">
                            © {currentYear} Company Name. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            <Link href="/privacy" className="text-black hover:text-gray-400 transition-colors text-sm">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-black hover:text-gray-400 transition-colors text-sm">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="text-black hover:text-gray-400 transition-colors text-sm">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;