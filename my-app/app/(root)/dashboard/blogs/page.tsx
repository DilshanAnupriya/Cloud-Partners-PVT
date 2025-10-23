"use client"
import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, TrendingUp, X } from 'lucide-react';
import { useAuth } from '@/app/Context/AuthContext';
import Sidebar from "@/components/ui/Sidebar";
import DashboardNavbar from "@/components/ui/DashboardNavbar";

interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    author: {
        _id: string;
        username: string;
        email: string;
    };
    category: string;
    tags: string[];
    featuredImage: string | null;
    status: 'Draft' | 'Published' | 'Archived';
    views: number;
    isPublished: boolean;
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

interface BlogStats {
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    archivedBlogs: number;
    totalViews: number;
    blogsByCategory: { _id: string; count: number }[];
}

const API_BASE_URL = 'http://localhost:3000/api/blogs';

const BlogManagement = () => {
    const { token, isAuthenticated, isLoading: authLoading } = useAuth();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [stats, setStats] = useState<BlogStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [tagsFilter, setTagsFilter] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const [pageSize] = useState(10);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: 'Other',
        tags: '',
        featuredImage: '',
        status: 'Draft'
    });

    const categories = ['Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business', 'Education', 'Other'];

    useEffect(() => {
        if (!authLoading && isAuthenticated && token) {
            fetchBlogs();
            fetchStats();
        }
    }, [currentPage, searchText, categoryFilter, statusFilter, tagsFilter, sortBy, order, pageSize, token, isAuthenticated, authLoading]);

    const fetchBlogs = async () => {
        if (!token) {
            console.error('No token available');
            return;
        }

        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                size: pageSize.toString(),
                sortBy,
                order,
                ...(searchText && { searchText }),
                ...(categoryFilter && { category: categoryFilter }),
                ...(statusFilter && { status: statusFilter }),
                ...(tagsFilter && { tags: tagsFilter })
            });

            console.log('🔍 Fetching blogs from:', `${API_BASE_URL}/blogs?${params}`);
            console.log('🔑 Using token:', token.substring(0, 20) + '...');

            const response = await fetch(`${API_BASE_URL}/blogs?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('📡 Blogs response status:', response.status);

            if (!response.ok) {
                throw new Error(`Failed to fetch blogs: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Blogs fetched successfully:', data);

            setBlogs(data.blogs || []);
            setTotalPages(data.totalPages || 1);
            setTotalCount(data.count || 0);
        } catch (error) {
            console.error('❌ Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        if (!token) {
            console.error('No token available');
            return;
        }

        try {
            console.log('🔍 Fetching stats from:', `${API_BASE_URL}/blogs-stats`);

            const response = await fetch(`${API_BASE_URL}/blogs-stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('📡 Stats response status:', response.status);

            if (!response.ok) {
                throw new Error(`Failed to fetch stats: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Stats fetched successfully:', data);
            setStats(data.stats);
        } catch (error) {
            console.error('❌ Error fetching stats:', error);
        }
    };

    const handleCreate = async () => {
        if (!formData.title || !formData.content) {
            alert('Title and content are required');
            return;
        }

        if (!token) {
            alert('You must be logged in');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
                })
            });

            if (response.ok) {
                setShowCreateModal(false);
                resetForm();
                fetchBlogs();
                fetchStats();
                alert('Blog created successfully!');
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to create blog'}`);
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            alert('Failed to create blog');
        }
    };

    const handleUpdate = async () => {
        if (!selectedBlog || !formData.title || !formData.content) {
            alert('Title and content are required');
            return;
        }

        if (!token) {
            alert('You must be logged in');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/blogs/${selectedBlog._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
                })
            });

            if (response.ok) {
                setShowEditModal(false);
                resetForm();
                fetchBlogs();
                fetchStats();
                alert('Blog updated successfully!');
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to update blog'}`);
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            alert('Failed to update blog');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;

        if (!token) {
            alert('You must be logged in');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                fetchBlogs();
                fetchStats();
                alert('Blog deleted successfully!');
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to delete blog'}`);
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('Failed to delete blog');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            excerpt: '',
            category: 'Other',
            tags: '',
            featuredImage: '',
            status: 'Draft'
        });
        setSelectedBlog(null);
    };

    const openEditModal = (blog: Blog) => {
        setSelectedBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            excerpt: blog.excerpt || '',
            category: blog.category,
            tags: blog.tags.join(', '),
            featuredImage: blog.featuredImage || '',
            status: blog.status
        });
        setShowEditModal(true);
    };

    const clearFilters = () => {
        setSearchText('');
        setCategoryFilter('');
        setStatusFilter('');
        setTagsFilter('');
        setCurrentPage(1);
    };

    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">Please log in to access the blog management</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 pt-15">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <DashboardNavbar
                onMenuClick={() => setSidebarOpen(true)}
                title="Profile Settings"
            />
            <div className="max-w-8xl mx-auto p-4 lg:p-8 ml-60">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Management</h1>
                    <p className="text-gray-600">Manage your blog posts and track performance</p>
                </div>

                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Blogs</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalBlogs}</p>
                                </div>
                                <TrendingUp className="text-blue-500" size={32} />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Published</p>
                                    <p className="text-2xl font-bold text-green-600">{stats.publishedBlogs}</p>
                                </div>
                                <Eye className="text-green-500" size={32} />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Drafts</p>
                                    <p className="text-2xl font-bold text-yellow-600">{stats.draftBlogs}</p>
                                </div>
                                <Edit2 className="text-yellow-500" size={32} />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Views</p>
                                    <p className="text-2xl font-bold text-purple-600">{stats.totalViews}</p>
                                </div>
                                <TrendingUp className="text-purple-500" size={32} />
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search blogs..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>
                        </div>

                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                            <option value="Archived">Archived</option>
                        </select>

                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="createdAt">Created Date</option>
                            <option value="updatedAt">Updated Date</option>
                            <option value="title">Title</option>
                            <option value="views">Views</option>
                        </select>

                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={order}
                            onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
                        >
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>

                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                        >
                            <X size={16} />
                            Clear
                        </button>

                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Plus size={20} />
                            New Blog
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            No blogs found. Create your first blog post!
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {blogs.map((blog) => (
                                        <tr key={blog._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">{blog.excerpt}</div>
                                            </td>
                                            <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {blog.category}
                          </span>
                                            </td>
                                            <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                              blog.status === 'Published' ? 'bg-green-100 text-green-800' :
                                  blog.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-gray-100 text-gray-800'
                          }`}>
                            {blog.status}
                          </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{blog.views}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{blog.author.username}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedBlog(blog);
                                                            setShowViewModal(true);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => openEditModal(blog)}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(blog._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="px-6 py-4 flex items-center justify-between border-t">
                                <div className="text-sm text-gray-700">
                                    Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} results
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="px-4 py-2">
                    Page {currentPage} of {totalPages}
                  </span>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {(showCreateModal || showEditModal) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4">
                                    {showCreateModal ? 'Create New Blog' : 'Edit Blog'}
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                                        <textarea
                                            rows={6}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={formData.content}
                                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                                        <textarea
                                            rows={2}
                                            maxLength={200}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                            <select
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                value={formData.category}
                                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                            <select
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                value={formData.status}
                                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                            >
                                                <option value="Draft">Draft</option>
                                                <option value="Published">Published</option>
                                                <option value="Archived">Archived</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                                        <input
                                            type="text"
                                            placeholder="tech, tutorial, javascript"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={formData.tags}
                                            onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={formData.featuredImage}
                                            onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-6">
                                    <button
                                        onClick={showCreateModal ? handleCreate : handleUpdate}
                                        className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        {showCreateModal ? 'Create Blog' : 'Update Blog'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowCreateModal(false);
                                            setShowEditModal(false);
                                            resetForm();
                                        }}
                                        className="flex-1 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showViewModal && selectedBlog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-3xl font-bold">{selectedBlog.title}</h2>
                                    <button
                                        onClick={() => setShowViewModal(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {selectedBlog.featuredImage && (
                                    <img
                                        src={selectedBlog.featuredImage}
                                        alt={selectedBlog.title}
                                        className="w-full h-64 object-cover rounded-lg mb-4"
                                    />
                                )}

                                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {selectedBlog.category}
                  </span>
                                    {selectedBlog.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      #{tag}
                    </span>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-600">Status</p>
                                        <p className="font-semibold">{selectedBlog.status}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Views</p>
                                        <p className="font-semibold">{selectedBlog.views}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Author</p>
                                        <p className="font-semibold">{selectedBlog.author.username}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Created</p>
                                        <p className="font-semibold">{new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {selectedBlog.excerpt && (
                                    <div className="mb-4">
                                        <p className="text-lg text-gray-700 italic">{selectedBlog.excerpt}</p>
                                    </div>
                                )}

                                <div className="prose max-w-none">
                                    <p className="text-gray-800 whitespace-pre-wrap">{selectedBlog.content}</p>
                                </div>

                                <div className="mt-6 flex gap-4">
                                    <button
                                        onClick={() => {
                                            setShowViewModal(false);
                                            openEditModal(selectedBlog);
                                        }}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Edit Blog
                                    </button>
                                    <button
                                        onClick={() => setShowViewModal(false)}
                                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogManagement;