"use client";

import React, { useState } from 'react';
import { LogOut, Menu, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '@/app/Context/AuthContext';

interface DashboardNavbarProps {
    onMenuClick: () => void;
    title?: string;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ onMenuClick }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-white border-b border-gray-200 fixed top-0 right-0 left-0 lg:left-64 z-30 shadow-sm">
            <div className="px-4 lg:px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <Menu size={22} />
                        </button>

                        <h1 className="text-2xl font-bold text-gray-800">Hi 👋 {user?.username}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                            <Bell size={20} className="text-gray-600" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-3 p-2 pr-3 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-sm">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                                </div>
                                <div className="hidden sm:block text-left">
                                    <div className="text-sm font-semibold text-gray-800">
                                        {user?.username || 'User'}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {user?.role?.[0] || 'User'}
                                    </div>
                                </div>
                                <ChevronDown size={16} className="text-gray-400" />
                            </button>

                            {showUserMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowUserMenu(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-red-50 text-left text-red-600 transition-colors"
                                        >
                                            <LogOut size={18} />
                                            <span className="text-sm font-medium">Logout</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;