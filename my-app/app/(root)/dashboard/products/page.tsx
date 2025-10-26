"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Save, Image, Tag, Globe, Mail, FileText, Star, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/app/Context/AuthContext';
import Sidebar from "@/components/ui/Sidebar";
import DashboardNavbar from "@/components/ui/DashboardNavbar"; // Add this import

interface Product {
    _id: string;
    name: string;
    vendor: string;
    category: string;
    description: string;
    shortDescription?: string;
    logo?: string;
    website?: string;
    documentation?: string;
    supportEmail?: string;
    tags?: string[];
    isFeatured: boolean;
    isActive: boolean;
    createdAt: string;
}

interface FormData {
    name: string;
    vendor: string;
    category: string;
    description: string;
    shortDescription: string;
    logo: string;
    website: string;
    documentation: string;
    supportEmail: string;
    tags: string;
    isFeatured: boolean;
    isActive: boolean;
}

const ProductManagementPage = () => {
    const { token, isAuthenticated } = useAuth(); // Get token from auth context
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [productsLoading, setProductsLoading] = useState(true);
    const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState('');
    const [filterVendor, setFilterVendor] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [currentProduct, setCurrentProduct] = useState<string | null>(null);

    const initialFormData: FormData = {
        name: '',
        vendor: 'Other',
        category: 'Other',
        description: '',
        shortDescription: '',
        logo: '',
        website: '',
        documentation: '',
        supportEmail: '',
        tags: '',
        isFeatured: false,
        isActive: true
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const vendors = ['Google', 'Zoho', 'Salesforce', 'Other'];
    const categories = [
        'Productivity Suite',
        'Marketing',
        'Project Management',
        'Cloud Storage',
        'Communication',
        'Analytics',
        'HR Management',
        'Finance',
        'Sales & CRM',
        'Google',
        'Other'
    ];

    useEffect(() => {
        if (isAuthenticated && token) {
            fetchProducts();
        }
    }, [isAuthenticated, token]);

    useEffect(() => {
        filterProducts();
    }, [searchText, filterVendor, filterCategory, products]);

    const fetchProducts = async () => {
        try {
            setProductsLoading(true);
            const response = await fetch('http://localhost:8080/api/products/products', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            if (response.ok) {
                setProducts(data.products || []);
            } else {
                setAlert({ type: 'error', message: data.error || 'Failed to fetch products' });
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Failed to fetch products' });
        } finally {
            setProductsLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = [...products];

        if (searchText) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                product.description.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (filterVendor) {
            filtered = filtered.filter(product => product.vendor === filterVendor);
        }

        if (filterCategory) {
            filtered = filtered.filter(product => product.category === filterCategory);
        }

        setFilteredProducts(filtered);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const openCreateModal = () => {
        setFormData(initialFormData);
        setCurrentProduct(null);
        setIsEditing(false);
        setShowModal(true);
    };

    const openEditModal = (product: Product) => {
        setFormData({
            name: product.name,
            vendor: product.vendor,
            category: product.category,
            description: product.description,
            shortDescription: product.shortDescription || '',
            logo: product.logo || '',
            website: product.website || '',
            documentation: product.documentation || '',
            supportEmail: product.supportEmail || '',
            tags: product.tags?.join(', ') || '',
            isFeatured: product.isFeatured,
            isActive: product.isActive
        });
        setCurrentProduct(product._id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.vendor || !formData.category || !formData.description) {
            setAlert({ type: 'error', message: 'Please fill in all required fields' });
            return;
        }

        if (!token) {
            setAlert({ type: 'error', message: 'Authentication required. Please log in again.' });
            return;
        }

        setLoading(true);
        setAlert(null);

        try {
            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            };

            const url = isEditing
                ? `http://localhost:8080/api/products/products/${currentProduct}`
                : 'http://localhost:8080/api/products/products';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setAlert({
                    type: 'success',
                    message: isEditing ? 'Product updated successfully!' : 'Product created successfully!'
                });
                setShowModal(false);
                fetchProducts();
            } else {
                setAlert({ type: 'error', message: data.error || 'Operation failed' });
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'An error occurred' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        if (!token) {
            setAlert({ type: 'error', message: 'Authentication required' });
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/products/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                setAlert({ type: 'success', message: 'Product deleted successfully!' });
                fetchProducts();
            } else {
                setAlert({ type: 'error', message: data.error || 'Failed to delete product' });
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Failed to delete product' });
        }
    };

    const clearFilters = () => {
        setSearchText('');
        setFilterVendor('');
        setFilterCategory('');
    };

    // Show loading or unauthenticated state
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Please log in to access product management</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-14">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <DashboardNavbar
                onMenuClick={() => setSidebarOpen(true)}
                title="Profile Settings"
            />
            <main className="lg:ml-64 pt-24 p-4 lg:p-8 ">
            {/* Alert */}
            {alert && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
                    alert.type === 'success' ? 'bg-green-50 border border-green-200' :
                        alert.type === 'error' ? 'bg-red-50 border border-red-200' :
                            'bg-blue-50 border border-blue-200'
                }`}>
                    <div className="flex items-center gap-3">
                        <span className={`font-medium ${
                            alert.type === 'success' ? 'text-green-800' :
                                alert.type === 'error' ? 'text-red-800' :
                                    'text-blue-800'
                        }`}>{alert.message}</span>
                        <button onClick={() => setAlert(null)} className="text-gray-500 hover:text-gray-700">
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto p-4 lg:p-8">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
                            <p className="text-gray-600 mt-1">Manage your product catalog</p>
                        </div>
                        <button
                            onClick={openCreateModal}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                        >
                            <Plus size={20} />
                            <span className="font-medium">Add Product</span>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <select
                            value={filterVendor}
                            onChange={(e) => setFilterVendor(e.target.value)}
                            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Vendors</option>
                            {vendors.map(vendor => (
                                <option key={vendor} value={vendor}>{vendor}</option>
                            ))}
                        </select>

                        <div className="flex gap-2">
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            {(searchText || filterVendor || filterCategory) && (
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {productsLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading products...</p>
                        </div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-600 text-lg">No products found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            {product.logo ? (
                                                <img src={product.logo} alt={product.name} className="w-12 h-12 rounded-lg object-cover mb-3" />
                                            ) : (
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                                                    <span className="text-white text-xl font-bold">{product.name.charAt(0)}</span>
                                                </div>
                                            )}
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                                            <div className="flex gap-2 mb-2">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                                    {product.vendor}
                                                </span>
                                                <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">
                                                    {product.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {product.isFeatured && (
                                                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                                            )}
                                            {product.isActive ? (
                                                <Eye size={18} className="text-green-500" />
                                            ) : (
                                                <EyeOff size={18} className="text-gray-400" />
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {product.shortDescription || product.description}
                                    </p>

                                    {product.tags && product.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {product.tags.slice(0, 3).map((tag, index) => (
                                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => openEditModal(product)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                        >
                                            <Edit2 size={16} />
                                            <span className="font-medium">Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                            <span className="font-medium">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {isEditing ? 'Edit Product' : 'Create New Product'}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Vendor *
                                    </label>
                                    <select
                                        name="vendor"
                                        value={formData.vendor}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {vendors.map(vendor => (
                                            <option key={vendor} value={vendor}>{vendor}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Image size={16} />
                                        Logo URL
                                    </label>
                                    <input
                                        type="url"
                                        name="logo"
                                        value={formData.logo}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Short Description
                                    </label>
                                    <input
                                        type="text"
                                        name="shortDescription"
                                        value={formData.shortDescription}
                                        onChange={handleInputChange}
                                        maxLength={200}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Globe size={16} />
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <FileText size={16} />
                                        Documentation
                                    </label>
                                    <input
                                        type="url"
                                        name="documentation"
                                        value={formData.documentation}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Mail size={16} />
                                        Support Email
                                    </label>
                                    <input
                                        type="email"
                                        name="supportEmail"
                                        value={formData.supportEmail}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Tag size={16} />
                                        Tags (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        placeholder="cloud, enterprise, SaaS"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-4 md:col-span-2">
                                    <div className="flex items-center gap-6">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="isFeatured"
                                                checked={formData.isFeatured}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <Star size={16} />
                                                Featured Product
                                            </span>
                                        </label>

                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="isActive"
                                                checked={formData.isActive}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <Eye size={16} />
                                                Active
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg flex-1"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span className="font-medium">Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            <span className="font-medium">{isEditing ? 'Update Product' : 'Create Product'}</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    disabled={loading}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </main>
        </div>
    );
};

export default ProductManagementPage;