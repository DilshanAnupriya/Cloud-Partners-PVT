"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg'
                    : 'bg-transparent'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <motion.div
                        className="flex items-center space-x-3"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                    >
                        {/* Logo */}
                        <motion.div
                            className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                            whileHover={{ rotate: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                alt="company logo"
                                className="rounded-full object-cover object-center"
                                src="/companyLogo.png"
                            />
                            {/* Subtle glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-[#0974B0]/20 to-[#219E4A]/20 rounded-xl blur-md"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>

                        {/* Company Name */}
                        <span className="text-2xl font-extrabold text-white">
                            Cloud Partners
                        </span>
                    </motion.div>

                    <div className="hidden md:flex space-x-8 text-gray-300 font-medium">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                className="hover:text-[#0974B0] transition-colors duration-300 relative group"
                                whileHover={{ y: -2, color: '#0974B0' }}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.4 }}
                            >
                                {item.label}
                                <motion.div
                                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0974B0] group-hover:w-full transition-all duration-300"
                                    whileHover={{ width: "100%" }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    <motion.a
                        href="/contact"
                        className="bg-[#0974B0] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#08669A] transition-all duration-300 border border-[#0974B0]/20 inline-block"
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(9, 116, 176, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact Us
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;