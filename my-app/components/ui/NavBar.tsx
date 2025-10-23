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
            <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
                <div className="w-full px-6 py-4">
                    <div className="grid grid-cols-3 items-center">
                        <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-10 rounded-full flex items-center justify-center">
                                <Image
                                    className="rounded-full"
                                    alt="Logo"
                                    src="/companyLogo.png"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <span className="text-5xl  font-extrabold text-white">Cloud Partners</span>
                        </div>
                        <div className="hidden lg:flex justify-center space-x-8 text-white">
                            <Link href="/" className="text-white">Home</Link>
                            <Link href="/product" className="text-white">Products</Link>
                            <Link href="/service" className="text-white">Services</Link>
                            <Link href="/blogs" className="text-white">Blogs</Link>
                            <Link href="/about" className="text-white">About Us</Link>
                            <Link href="/career" className="text-white">Careers</Link>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-lg">
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
                    isScrolled
                        ? "bg-black backdrop-blur-xl border-b border-gray-700/50 shadow-2xl"
                        : "bg-transparent"
                } animate-slideDown`}
            >
                <div className="w-full px-6 py-4">
                    <div className="grid grid-cols-3 items-center gap-4">
                        {/* Logo - Left */}
                        <div className="flex items-center space-x-3 group cursor-pointer">
                            <div className="relative w-40 h-20 rounded-full flex items-center justify-center overflow-hidden ">
                                <Image
                                    className="rounded-full w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    alt="Logo"
                                    src="/2-1-removebg-preview.png"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            {/*<span*/}
                            {/*    className={`text-4xl font-extrabold font-serif transition-all duration-300 ${*/}
                            {/*        isScrolled ? "text-white" : "text-white"*/}
                            {/*    } group-hover:text-blue-400`}*/}
                            {/*>*/}
                            {/*    Cloud Partners*/}
                            {/*</span>*/}
                        </div>

                        {/* Navigation Links - Center */}
                        <div className="hidden lg:flex justify-center items-center space-x-10 text-[15px] font-extrabold">
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
                                        className={`relative group transition-all duration-300 hover:-translate-y-0.5 font-medium ${
                                            isScrolled ? "text-gray-200 hover:text-blue-400" : "text-white hover:text-blue-400"
                                        } animate-fadeInUp`}
                                        style={{ animationDelay: `${link.delay}ms` }}
                                    >
                                        {link.label}
                                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 group-hover:w-full transition-all duration-300" />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Right Side Buttons */}
                        <div className="flex items-center justify-end space-x-4">
                            <Link
                                href="/contact"
                                className="hidden md:inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 border border-blue-600/20 active:scale-95"
                            >
                                Contact Us
                            </Link>

                            {isAuthenticated ? (
                                <div className="hidden md:flex items-center space-x-3 relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        className="flex items-center space-x-1 bg-slate-800/50 px-2 py-2.5 rounded-lg border border-gray-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:border-blue-500/50"
                                    >
                                        {/*<User className="w-2 h-2 text-blue-400" />*/}
                                        <span className="text-white text-sm font-medium">{user?.username}</span>
                                        {/*<span className="text-xs text-gray-400 bg-blue-500/20 px-2 py-0.5 rounded">*/}
                                        {/*    {user?.role[0]}*/}
                                        {/*</span>*/}
                                        <ChevronDown
                                            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                                                isUserDropdownOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {isUserDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-56 bg-slate-800 border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden z-50 animate-slideDown">
                                            <div className="px-4 py-3 bg-slate-700/50 border-b border-gray-700/50">
                                                <p className="text-white text-sm font-semibold">{user?.username}</p>
                                                <p className="text-gray-400 text-xs">{user?.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <Link
                                                    href="/dashboard/profile"
                                                    onClick={() => setIsUserDropdownOpen(false)}
                                                    className="flex items-center space-x-3 px-4 py-3 text-gray-200 hover:bg-slate-700/50 hover:text-blue-400 transition-all duration-200 group"
                                                >
                                                    <LayoutDashboard className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                                                    <span className="font-medium">Dashboard</span>
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center space-x-3 px-4 py-3 text-gray-200 hover:bg-red-600/10 hover:text-red-400 transition-all duration-200 w-full group"
                                                >
                                                    <LogOut className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                                                    <span className="font-medium">Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center space-x-4">
                                    <Link
                                        href="/login"
                                        className="flex items-center space-x-2 border-white text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border active:scale-95"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
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
                        isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="bg-slate-800/95 backdrop-blur-xl border-t border-gray-700/50">
                        <div className="w-full px-6 py-4 space-y-4">
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
                                    className="block text-white hover:text-blue-400 font-medium py-2 transition-colors duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <Link
                                href="/contact"
                                className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-blue-800"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>

                            <div className="border-t border-gray-700/50 pt-4 mt-4">
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2 bg-slate-700/50 px-4 py-3 rounded-lg">
                                            <User className="w-5 h-5 text-blue-400" />
                                            <div className="flex-1">
                                                <p className="text-white text-sm font-medium">{user?.username}</p>
                                                <p className="text-xs text-gray-400">{user?.role[0]}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/dashboard/profile"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center justify-center space-x-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
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
                                            className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
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

            {/* Animations */}
            <style jsx global>{`
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

                .animate-slideDown {
                    animation: slideDown 0.4s ease-out;
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