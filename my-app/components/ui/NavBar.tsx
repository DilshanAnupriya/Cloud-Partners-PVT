import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/product' },
        { label: 'Services', href: '/service' },
        { label: 'Our Team', href: '/team' },
        { label: 'About Us', href: '/about' }
    ];

    // Prevent hydration mismatch by not rendering certain elements until mounted
    if (!mounted) {
        return (
            <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-10 rounded-full flex items-center justify-center">
                                <img
                                    className="rounded-full"
                                    alt="Logo"
                                    src="/companyLogo.png"
                                />
                            </div>
                            <span className="text-2xl font-extrabold text-white">
                                Cloud Partners
                            </span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            {navItems.map((item) => (
                                <span key={item.label} className="text-white">
                                    {item.label}
                                </span>
                            ))}
                        </div>
                        <div className="bg-blue-600 text-white px-6 py-2.5 rounded-lg">
                            Contact Us
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isScrolled
                        ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl'
                        : 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
                } animate-slideDown`}
            >
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo Section */}
                        <div className="flex items-center space-x-3 group cursor-pointer">
                            <div className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                                <img
                                    className="rounded-full w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    alt="Logo"
                                    src="/companyLogo.png"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                            </div>
                            <span className={`text-2xl font-extrabold transition-all duration-300 ${
                                isScrolled ? 'text-white' : 'text-white'
                            } group-hover:text-blue-400`}>
                                Cloud Partners
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navItems.map((item, index) => (
                                <div key={item.label} className="relative group">
                                    <a
                                        href={item.href}
                                        className={`relative group transition-all duration-300 hover:-translate-y-0.5 font-medium ${
                                            isScrolled
                                                ? 'text-gray-200 hover:text-blue-400'
                                                : 'text-white hover:text-blue-400'
                                        } animate-fadeInUp`}
                                        style={{ animationDelay: `${index * 100 + 400}ms` }}
                                    >
                                        {item.label}
                                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 group-hover:w-full transition-all duration-300" />
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center space-x-4">
                            <a
                                href="/contact"
                                className="hidden md:inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 border border-blue-600/20 active:scale-95"
                            >
                                Contact Us
                            </a>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 text-white hover:text-blue-400 transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${
                        isMobileMenuOpen
                            ? 'max-h-screen opacity-100'
                            : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="bg-slate-800/95 backdrop-blur-xl border-t border-gray-700/50">
                        <div className="container mx-auto px-6 py-4 space-y-4">
                            {navItems.map((item, index) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="block text-white hover:text-blue-400 font-medium py-2 transition-colors duration-300"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href="/contact"
                                className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold mt-4 transition-all duration-300 hover:from-blue-700 hover:to-blue-800"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Global Styles */}
            <style jsx global>{`
                @keyframes slideDown {
                    from {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slideDown {
                    animation: slideDown 0.6s ease-out;
                }

                .animate-fadeInUp {
                    opacity: 0;
                    animation: fadeInUp 0.5s ease-out forwards;
                }
            `}</style>
        </>
    );
};

export default Navbar;