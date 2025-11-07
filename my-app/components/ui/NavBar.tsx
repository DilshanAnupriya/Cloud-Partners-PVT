"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, LogOut, User, LayoutDashboard, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/Context/AuthContext";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
        setIsUserDropdownOpen(false);
    };

    if (!mounted) {
        return (
            <nav className="fixed top-0 left-0 right-0 z-50 bg-nav">
                <div className="w-full px-4 sm:px-6 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center overflow-hidden">
                                <Image
                                    className="rounded-full object-cover"
                                    alt="Logo"
                                    src="/2-1-removebg-preview.png"
                                    width={80}
                                    height={80}
                                />
                            </div>
                        </div>
                        <div className="hidden lg:flex justify-center space-x-6 xl:space-x-8 text-heading">
                            <Link href="/" className="link">Home</Link>
                            <Link href="/product" className="link">Products</Link>
                            <Link href="/service" className="link">Services</Link>
                            <Link href="/blogs" className="link">Blogs</Link>
                            <Link href="/about" className="link">About Us</Link>
                            <Link href="/career" className="link">Careers</Link>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-blue-500 px-4 sm:px-6 py-2 sm:py-2 rounded-lg text-white text-sm sm:text-base transition-colors">
                                Contact Us
                            </div>
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
                    isScrolled ? "bg-nav border-nav" : "bg-nav border-nav"
                } animate-slideDown`}
            >
                <div className="w-full px-4 sm:px-6 py-2 sm:py-3">
                    <div className="flex items-center justify-between gap-2 sm:gap-4 relative">
                        {/* Logo - Left */}
                        <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer flex-shrink-0">
                            <div className="relative w-20 h-20 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 rounded-full flex items-center justify-center overflow-hidden">
                                <Image
                                    className="rounded-full w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    alt="Logo"
                                    src="/2-1-removebg-preview.png"
                                    width={96}
                                    height={96}
                                />
                            </div>
                        </div>

                        {/* Navigation Links - Center */}
                        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-6 xl:space-x-10 text-base xl:text-[18px] font-extrabold">
                            {[
                                { href: "/", label: "Home", delay: 400 },
                                { href: "/product", label: "Products", delay: 500 },
                                { href: "/service", label: "Services", delay: 600 },
                                { href: "/blogs", label: "Blogs", delay: 700 },
                                { href: "/about", label: "About", delay: 800 },
                                { href: "/career", label: "Careers", delay: 900 },
                            ].map((link) => (
                                <div className="relative group" key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`relative group transition-all duration-300 hover:-translate-y-0.5 font-medium link animate-fadeInUp`}
                                        style={{ animationDelay: `${link.delay}ms` }}
                                    >
                                        {link.label}
                                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[#2ecc71] group-hover:w-full transition-all duration-300" />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Right Side Buttons */}
                        <div className="flex items-center justify-end space-x-2 sm:space-x-3 md:space-x-4">
                            <Link
                                href="/contact"
                                className="hidden lg:inline-block bg-blue-500 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2 md:py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap"
                            >
                                Contact Us
                            </Link>

                            {isAuthenticated ? (
                                <div className="hidden lg:flex items-center space-x-3 relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        className="flex items-center space-x-1 bg-white border-gray-700 border px-3 py-2.5 rounded-lg transition-all duration-300 hover:border-primary/50"
                                    >
                                        <span className="text-black text-sm font-medium">{user?.username}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                                                isUserDropdownOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {isUserDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden z-50 animate-slideDown">
                                            <div className="px-4 py-3 bg-white border-b border-gray-700/50">
                                                <p className="text-black text-sm font-semibold">{user?.username}</p>
                                                <p className="text-black text-xs">{user?.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <Link
                                                    href="/dashboard/profile"
                                                    onClick={() => setIsUserDropdownOpen(false)}
                                                    className="flex items-center space-x-3 px-4 py-3 text-black hover:bg-gray-100 hover:text-primary transition-all duration-200 group"
                                                >
                                                    <LayoutDashboard className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                                    <span className="font-medium">Dashboard</span>
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center space-x-3 px-4 py-3 text-black hover:bg-red-600/10 hover:text-red-400 transition-all duration-200 w-full group"
                                                >
                                                    <LogOut className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                                                    <span className="font-medium">Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden lg:flex items-center space-x-4">
                                    <Link
                                        href="/login"
                                        className="flex items-center bg-white border border-black text-black space-x-2 px-4 md:px-6 lg:px-7 py-2 md:py-2.5 lg:py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap"
                                    >
                                        <span className="text-black text-xs sm:text-sm md:text-base">Login</span>
                                    </Link>
                                </div>
                            )}

                            <button
                                className="lg:hidden p-2 text-heading hover:text-primary transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${
                        isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="bg-nav border-t border-gray-200">
                        <div className="w-full px-4 sm:px-6 py-3 space-y-3">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/product", label: "Products" },
                                { href: "/service", label: "Services" },
                                { href: "/blogs", label: "Blogs" },
                                { href: "/about", label: "About Us" },
                                { href: "/career", label: "Careers" },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block text-body hover:text-primary hover:bg-gray-50 font-medium py-3 px-3 sm:px-4 rounded-lg transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <Link
                                href="/contact"
                                className="block w-full text-center bg-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-600"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>

                            <div className="border-t border-gray-200 pt-4 mt-4">
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-lg">
                                            <User className="w-5 h-5 text-primary" />
                                            <div className="flex-1">
                                                <p className="text-black text-sm font-medium">{user?.username}</p>
                                                <p className="text-xs text-gray-600">{user?.role?.[0]}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/dashboard/profile"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center justify-center space-x-2 w-full btn-primary text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                                        >
                                            <LayoutDashboard className="w-5 h-5" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center justify-center space-x-2 w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Link
                                            href="/login"
                                            className="flex items-center justify-center space-x-2 w-full btn-secondary text-heading px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                            <span>Login</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Animations & Theme variables */}
            <style jsx global>{`
                :root {
                    --nav-bg: #FFFFFF;
                    --nav-border: #E8EAED;
                    --primary: #1A73E8;
                    --secondary-bg: #FFFFFF;
                    --secondary-border: #DADCE0;
                    --heading: #202124;
                    --body: #5F6368;
                    --link: #1967D2;
                    --success: #1E8E3E;
                }

                .bg-nav {
                    background-color: var(--nav-bg);
                }

                .border-nav {
                    border-bottom: 1px solid var(--nav-border);
                }

                .btn-primary {
                    background-color: var(--primary);
                    color: #ffffff;
                }

                .btn-secondary {
                    background-color: var(--secondary-bg);
                    border: 1px solid var(--secondary-border);
                }

                .text-heading {
                    color: var(--heading);
                }

                .text-body {
                    color: var(--body);
                }

                .link {
                    color: var(--heading);
                    transition: color 0.2s ease;
                }

                .link:hover {
                    color: var(--link);
                }

                .animate-slideDown {
                    animation: slideDown 0.4s ease-out;
                }

                .animate-fadeInUp {
                    opacity: 0;
                    animation: fadeInUp 0.5s ease-out forwards;
                }

                @keyframes slideDown {
                    from {
                        transform: translateY(-20%);
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

                /* Mobile-first responsive adjustments */
                @media (max-width: 640px) {
                    .animate-slideDown {
                        animation-duration: 0.3s;
                    }
                }

                /* Prevent layout shift on mobile menu toggle */
                @media (max-width: 1024px) {
                    body {
                        overflow-x: hidden;
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;