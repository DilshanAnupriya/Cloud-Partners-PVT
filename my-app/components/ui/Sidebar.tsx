"use client";

import React from 'react';
import { X, Home, FileText, Package, Users, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { id: 'Home', label: 'Home', icon: Home, path: '/' },
        { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/profile' },
        { id: 'blogs', label: 'Blogs', icon: FileText, path: '/dashboard/blogs' },
        { id: 'products', label: 'Products', icon: Package, path: '/dashboard/products' },
        { id: 'Code-Manager', label: 'Code Manager', icon: Package, path: '/dashboard/code-manager' },
        { id: 'users', label: 'Users', icon: Users, path: '/dashboard/users' },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-transform duration-300 lg:translate-x-0 shadow-xl ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                        Dashboard
                    </h2>
                    <button
                        onClick={onClose}
                        className="lg:hidden hover:bg-gray-700 p-2 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    router.push(item.path);
                                    onClose(); // Close sidebar on mobile after navigation
                                }}
                                className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                                    isActive(item.path)
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 transform scale-105'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <Icon size={20} className="mr-3" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;