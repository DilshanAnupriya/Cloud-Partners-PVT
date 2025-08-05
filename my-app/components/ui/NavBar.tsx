import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
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
        { label: 'Products', href: '/products' },
        { label: 'Our Services', href: '/services' },
        { label: 'Our Team', href: '/team' },
        { label: 'About Us', href: '/about' }
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg'
                    : 'bg-white'
            }`}
            style={{
                animation: 'slideDown 0.6s ease-out'
            }}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300 cursor-pointer">
                        {/* Logo */}
                        <div className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:rotate-6 transition-transform duration-300">
                            <img
                                className="rounded-full"
                                alt="Logo"
                                src="/companyLogo.png"
                                />
                            {/* Subtle glow effect */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    animation: 'pulse 3s ease-in-out infinite'
                                }}
                            />
                        </div>

                        {/* Company Name */}
                        <span className={`text-2xl font-extrabold transition-colors duration-300 ${
                            isScrolled ? 'text-white':'text-black'
                        }`}>
                            <>Cloud</> Partners
                        </span>
                    </div>

                    <div className="hidden md:flex space-x-8 font-medium">
                        {navItems.map((item, index) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={`relative group transition-all duration-300 hover:-translate-y-1 ${
                                    isScrolled
                                        ? 'text-gray-200 hover:text-blue-400'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                                style={{
                                    animationDelay: `${index * 0.1 + 0.4}s`,
                                    animation: 'fadeInUp 0.5s ease-out forwards'
                                }}
                            >
                                {item.label}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                    </div>

                    <a
                        href="/contact"
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 border border-blue-600/20 inline-block active:scale-95"
                    >
                        Contact Us
                    </a>
                </div>
            </div>

            {/* Custom keyframe animations */}
            <style jsx>{`
                @keyframes slideDown {
                    from {
                        transform: translateY(-100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 0.8;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;