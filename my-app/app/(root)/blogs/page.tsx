"use client"
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Eye, Search, Filter, ChevronLeft, ChevronRight, ChevronDown, X, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Types
interface Author {
    _id: string;
    username: string;
    email: string;
}

interface Blog {
    _id: string;
    title: string;
    content: string;
    excerpt: string;
    category: string;
    tags: string[];
    featuredImage?: string;
    author: Author;
    likes: string[];
    views: number;
    slug: string;
    publishedAt: string;
    createdAt: string;
}

interface BlogResponse {
    message: string;
    blogs: Blog[];
    count: number;
    totalPages: number;
    currentPage: number;
}

const API_BASE_URL = 'http://localhost:8080/api/blogs';

const CATEGORIES = [
    'Technology',
    'Lifestyle',
    'Travel',
    'Food',
    'Health',
    'Business',
    'Education',
    'Other'
];

const AVAILABLE_TAGS = [
    'javascript',
    'react',
    'nodejs',
    'design',
    'ui/ux',
    'web-development',
    'mobile',
    'ai/ml',
    'cloud',
    'devops',
    'security',
    'startup',
    'productivity',
    'tutorial',
    'news'
];

export default function BlogPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showTagsDropdown, setShowTagsDropdown] = useState(false);

    const pageSize = 9;

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                size: pageSize.toString(),
            });

            if (searchText) params.append('searchText', searchText);
            if (category) params.append('category', category);
            if (selectedTags.length > 0) params.append('tags', selectedTags.join(','));

            const response = await fetch(`${API_BASE_URL}/blogs/published?${params}`);
            const data: BlogResponse = await response.json();

            setBlogs(data.blogs);
            setTotalPages(data.totalPages);
            setTotalBlogs(data.count);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [currentPage, searchText, category, selectedTags]);

    const viewBlog = (id: string) => {
        router.push(`/blogs/${id}`);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setCategory('');
        setSelectedTags([]);
        setSearchText('');
        setCurrentPage(1);
    };

    const hasActiveFilters = category || selectedTags.length > 0 || searchText;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Search */}
            <div className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 pt-20">
                <div className="absolute inset-0"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            Discover Amazing Content
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            Explore Our Blog
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto">
                            Insights, stories, and ideas from our community
                        </p>
                    </div>

                    {/* Large Search Bar */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            {/* Search Input */}
                            <div className="relative mb-6">
                                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                                <input
                                    type="text"
                                    placeholder="Search for articles, topics, or keywords..."
                                    value={searchText}
                                    onChange={(e) => {
                                        setSearchText(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-16 pr-6 py-5 text-lg bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                                />
                                {searchText && (
                                    <button
                                        onClick={() => setSearchText('')}
                                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Filter Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category Dropdown */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Category
                                    </label>
                                    <button
                                        onClick={() => {
                                            setShowCategoryDropdown(!showCategoryDropdown);
                                            setShowTagsDropdown(false);
                                        }}
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-left focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 flex items-center justify-between transition-all hover:border-gray-300"
                                    >
                                        <span className={category ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                                            {category || 'All Categories'}
                                        </span>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    {showCategoryDropdown && (
                                        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
                                            <div
                                                onClick={() => {
                                                    setCategory('');
                                                    setShowCategoryDropdown(false);
                                                    setCurrentPage(1);
                                                }}
                                                className="px-5 py-3 hover:bg-gray-50 cursor-pointer text-gray-600 border-b border-gray-100 font-medium"
                                            >
                                                All Categories
                                            </div>
                                            {CATEGORIES.map((cat) => (
                                                <div
                                                    key={cat}
                                                    onClick={() => {
                                                        setCategory(cat);
                                                        setShowCategoryDropdown(false);
                                                        setCurrentPage(1);
                                                    }}
                                                    className={`px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                                                        category === cat ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-700'
                                                    }`}
                                                >
                                                    {cat}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Tags Dropdown */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Tags
                                    </label>
                                    <button
                                        onClick={() => {
                                            setShowTagsDropdown(!showTagsDropdown);
                                            setShowCategoryDropdown(false);
                                        }}
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-left focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 flex items-center justify-between transition-all hover:border-gray-300"
                                    >
                                        <span className={selectedTags.length > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                                            {selectedTags.length > 0
                                                ? `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected`
                                                : 'Select tags'}
                                        </span>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showTagsDropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    {showTagsDropdown && (
                                        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
                                            {AVAILABLE_TAGS.map((tag) => (
                                                <label
                                                    key={tag}
                                                    className={`flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                                                        selectedTags.includes(tag) ? 'bg-purple-50' : ''
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTags.includes(tag)}
                                                        onChange={() => toggleTag(tag)}
                                                        className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                                    />
                                                    <span className={`text-sm ${selectedTags.includes(tag) ? 'text-purple-700 font-semibold' : 'text-gray-700'}`}>
                                                        #{tag}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Active Filters */}
                            {hasActiveFilters && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <span className="text-sm font-semibold text-gray-600">Active filters:</span>
                                        {category && (
                                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg">
                                                {category}
                                                <button
                                                    onClick={() => setCategory('')}
                                                    className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </span>
                                        )}
                                        {selectedTags.map(tag => (
                                            <span key={tag} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg">
                                                #{tag}
                                                <button
                                                    onClick={() => toggleTag(tag)}
                                                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </span>
                                        ))}
                                        <button
                                            onClick={clearFilters}
                                            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition-colors"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Stats Bar */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-black">
                            {searchText ? 'Search Results' : 'Latest Articles'}
                        </h2>
                        <span className="px-4 py-1.5 bg-blue-500 border text-white text-sm font-semibold rounded-full">
                            {totalBlogs} {totalBlogs === 1 ? 'article' : 'articles'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-sm">Sorted by relevance</span>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden animate-pulse">
                                <div className="h-56 bg-slate-700/50"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
                                    <div className="h-6 bg-slate-700/50 rounded"></div>
                                    <div className="h-4 bg-slate-700/50 rounded"></div>
                                    <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-8xl mb-6">📝</div>
                        <h3 className="text-3xl font-bold text-black mb-3">No articles found</h3>
                        <p className="text-gray-600 text-lg mb-8">Try adjusting your search or filters</p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Blog Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {blogs.map((blog) => (
                                <article
                                    key={blog._id}
                                    className="group bg-white shadow-2xl rounded-2xl overflow-hidden hover:border-blue-700 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                                    onClick={() => viewBlog(blog._id)}
                                >
                                    {/* Featured Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        {blog.featuredImage ? (
                                            <img
                                                src={blog.featuredImage}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center">
                                                <span className="text-7xl">📝</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

                                        {/* Category Badge */}
                                        {blog.category && (
                                            <div className="absolute top-4 left-4">
                                                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-red-800 text-xs font-bold rounded-full">
                                                    {blog.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {blog.tags.slice(0, 3).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 border-1 border-green-600 text-green-600 text-xs font-medium rounded-full"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-black mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
                                            {blog.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-black text-sm mb-6 line-clamp-3 leading-relaxed">
                                            {blog.excerpt || truncateText(blog.content, 120)}
                                        </p>

                                        {/* Author & Date */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                    {blog.author.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-black text-sm font-semibold">
                                                        {blog.author.username}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                                                        <Clock className="w-3 h-3" />
                                                        {formatDate(blog.publishedAt || blog.createdAt)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl flex items-center gap-2 transition-all border border-slate-700"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Previous
                                </button>

                                <div className="flex items-center gap-2">
                                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                        const pageNum = i + 1;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-12 h-12 rounded-xl font-semibold transition-all ${
                                                    currentPage === pageNum
                                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                                                        : 'bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    {totalPages > 5 && (
                                        <>
                                            <span className="text-gray-500 font-semibold">...</span>
                                            <button
                                                onClick={() => setCurrentPage(totalPages)}
                                                className={`w-12 h-12 rounded-xl font-semibold transition-all ${
                                                    currentPage === totalPages
                                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                                                        : 'bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700'
                                                }`}
                                            >
                                                {totalPages}
                                            </button>
                                        </>
                                    )}
                                </div>

                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl flex items-center gap-2 transition-all border border-slate-700"
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}