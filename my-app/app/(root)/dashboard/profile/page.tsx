
"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Shield, Calendar, Edit2, Save, XCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/app/Context/AuthContext';
import Sidebar from '@/components/ui/Sidebar';
import DashboardNavbar from '@/components/ui/DashboardNavbar';
import Alert from '@/components/ui/Alert';

const UserProfilePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

    const { user, updateUser, isLoading } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        setAlert(null);

        try {
            await updateUser(formData);
            setAlert({ type: 'success', message: 'Profile updated successfully!' });
            setIsEditing(false);
        } catch (error: any) {
            setAlert({ type: 'error', message: error.message || 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            username: user?.username || '',
            email: user?.email || '',
        });
        setIsEditing(false);
        setAlert(null);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-15">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <DashboardNavbar
                onMenuClick={() => setSidebarOpen(true)}
                title="Profile Settings"
            />

            <main className="lg:ml-64 pt-20 p-4 lg:p-8">
                <div className="max-w-5xl mx-auto">
                    {alert && (
                        <Alert
                            type={alert.type}
                            message={alert.message}
                            onClose={() => setAlert(null)}
                        />
                    )}

                    {/* Profile Header Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 h-32"></div>

                        <div className="px-6 lg:px-8 pb-8">
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-6">
                                <div className="relative">
                                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                                    </div>
                                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                                        <Edit2 size={18} className="text-white" />
                                    </button>
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
                                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                                        <Mail size={16} />
                                        {user?.email}
                                    </p>
                                </div>

                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                                    >
                                        <Edit2 size={18} />
                                        <span className="font-medium">Edit Profile</span>
                                    </button>
                                )}
                            </div>

                            {/* Profile Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <Shield size={16} />
                                        Role
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {user?.role?.map((role) => (
                                            <span
                                                key={role}
                                                className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-sm font-semibold border border-blue-200"
                                            >
                        {role}
                      </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <CheckCircle2 size={16} />
                                        Account Status
                                    </label>
                                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                                        user?.isActive
                                            ? 'bg-green-50 text-green-700 border border-green-200'
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                    <div className={`w-2 h-2 rounded-full ${user?.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        {user?.isActive ? 'Active' : 'Inactive'}
                  </span>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <Calendar size={16} />
                                        Member Since
                                    </label>
                                    <p className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={handleSaveChanges}
                                        disabled={loading}
                                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span className="font-medium">Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save size={18} />
                                                <span className="font-medium">Save Changes</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <XCircle size={18} />
                                        <span className="font-medium">Cancel</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 lg:px-8 py-6 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Shield size={24} />
                                Security Settings
                            </h2>
                        </div>
                        <div className="px-6 lg:px-8 py-6 space-y-4">
                            <button className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Shield size={20} className="text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Change Password</h3>
                                        <p className="text-sm text-gray-600">Update your password regularly</p>
                                    </div>
                                </div>
                            </button>

                            <div className="pt-4 border-t border-gray-200">
                                <button className="flex items-center gap-3 text-red-600 hover:text-red-700 font-semibold transition-colors">
                                    <AlertCircle size={20} />
                                    <span>Delete Account</span>
                                </button>
                                <p className="text-sm text-gray-500 mt-2">
                                    Permanently delete your account and all associated data
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserProfilePage;