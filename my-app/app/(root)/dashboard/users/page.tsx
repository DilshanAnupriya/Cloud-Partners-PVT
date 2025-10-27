'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, X, Eye, EyeOff, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from "@/components/ui/Sidebar";
import DashboardNavbar from "@/components/ui/DashboardNavbar";
import {useAuth} from "@/app/Context/AuthContext";

// Types
interface User {
    _id: string;
    username: string;
    email: string;
    role: string[];
    isActive: boolean;
    createdAt: string;
}

interface UserFormData {
    username: string;
    email: string;
    password: string;
    role: string[];
    isActive: boolean;
}

const UserManagementPage = () => {
    const { token, isAuthenticated, isLoading: authLoading } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState<UserFormData>({
        username: '',
        email: '',
        password: '',
        role: [],
        isActive: true
    });

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

    // Fetch users
    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(
                `${API_BASE_URL}/user/all-users?searchText=${searchText}&page=${page}&size=${size}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data.list);
            setTotalCount(data.count);
        } catch (err) {
            setError('Failed to load users. Please try again.');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    // Handle search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1);
            fetchUsers();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchText]);

    // Handle form submission (Create/Update)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate role selection
        if (formData.role.length === 0) {
            setError('Please select at least one role');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const url = isEditMode
                ? `${API_BASE_URL}/user/update-user`
                : `${API_BASE_URL}/user/signup`;

            const method = isEditMode ? 'PUT' : 'POST';

            // Don't send password if editing and password is empty
            const bodyData = isEditMode && !formData.password
                ? { username: formData.username, email: formData.email, role: formData.role, isActive: formData.isActive }
                : formData;

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Operation failed');
            }

            setSuccess(isEditMode ? 'User updated successfully!' : 'User created successfully!');
            setIsModalOpen(false);
            resetForm();
            fetchUsers();

            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message || 'Operation failed. Please try again.');
        }
    };

    // Handle delete
    const handleDelete = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/user/delete-user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setSuccess('User deleted successfully!');
            fetchUsers();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to delete user. Please try again.');
        }
    };

    // Open modal for creating new user
    const openCreateModal = () => {
        setIsEditMode(false);
        setSelectedUser(null);
        resetForm();
        setIsModalOpen(true);
    };

    // Open modal for editing user
    const openEditModal = (user: User) => {
        setIsEditMode(true);
        setSelectedUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            password: '',
            role: user.role,
            isActive: user.isActive
        });
        setIsModalOpen(true);
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            role: [],
            isActive: true
        });
        setError('');
    };

    // Handle role toggle
    const toggleRole = (role: string) => {
        setFormData(prev => ({
            ...prev,
            role: prev.role.includes(role)
                ? prev.role.filter(r => r !== role)
                : [...prev.role, role]
        }));
    };

    const totalPages = Math.ceil(totalCount / size);


    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">Please log in to access the user management</p>
                </div>
            </div>
        );
    }

        return (
        <div className="min-h-screen bg-gray-50 p-6 pt-25">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <DashboardNavbar
                onMenuClick={() => setSidebarOpen(true)}
                title="Profile Settings"
            />
            <div className="max-w-7xl mx-auto p-4 lg:p-8 ml-90">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
                    <p className="text-gray-600">Manage your application users and their permissions</p>
                </div>

                {/* Success/Error Messages */}
                {success && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Search and Actions */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by username, email, or role..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={fetchUsers}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Refresh
                            </button>
                            <button
                                onClick={openCreateModal}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add User
                            </button>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No users found</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Username
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created At
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-1">
                                                    {user.role.map((r) => (
                                                        <span
                                                            key={r}
                                                            className={`px-2 py-1 text-xs rounded-full ${
                                                                r === 'Admin'
                                                                    ? 'bg-purple-100 text-purple-700'
                                                                    : 'bg-blue-100 text-blue-700'
                                                            }`}
                                                        >
                                                                {r}
                                                            </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full ${
                                                            user.isActive
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-red-100 text-red-700'
                                                        }`}
                                                    >
                                                        {user.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(user)}
                                                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user._id)}
                                                        className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                                <div className="text-sm text-gray-600">
                                    Showing {(page - 1) * size + 1} to {Math.min(page * size, totalCount)} of {totalCount} users
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <span className="px-4 py-1 text-sm text-gray-700">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {isEditMode ? 'Edit User' : 'Create New User'}
                                </h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Username */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Username *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter username"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter email"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password {!isEditMode && '*'}
                                        {isEditMode && <span className="text-gray-500 text-xs"> (leave blank to keep current)</span>}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required={!isEditMode}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Role */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Role *
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.role.includes('User')}
                                                onChange={() => toggleRole('User')}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">User</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.role.includes('Admin')}
                                                onChange={() => toggleRole('Admin')}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Admin</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Active Account</span>
                                    </label>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {isEditMode ? 'Update User' : 'Create User'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagementPage;