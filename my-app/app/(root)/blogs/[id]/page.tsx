"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Heart, MessageCircle, Eye, Clock, ArrowLeft, Share2, Bookmark, User } from 'lucide-react';

interface Author {
    _id: string;
    username: string;
    email: string;
    role?: string;
}

interface Comment {
    _id: string;
    user: {
        _id: string;
        username: string;
        email: string;
    };
    comment: string;
    createdAt: string;
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
    comments: Comment[];
}

const API_BASE_URL = '/api/blogs';

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (params.id) {
            fetchBlogDetails();
        }
    }, [params.id]);

    const fetchBlogDetails = async () => {
        setLoading(true);
        setError('');
        try {
            // Using the slug endpoint for better SEO
            const response = await fetch(`${API_BASE_URL}/blogs/${params.id}/public`);

            if (!response.ok) {
                throw new Error('Blog not found');
            }

            const data = await response.json();
            setBlog(data.blog);
        } catch (err: any) {
            console.error('Error fetching blog:', err);
            setError(err.message || 'Failed to load blog');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatReadTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return `${readTime} min read`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white ">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                        <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
                        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Blog Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || 'The blog you are looking for does not exist.'}</p>
                    <button
                        onClick={() => router.push('/blogs')}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Blogs
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-28">
            {/* Hero Section with Featured Image */}
            {blog.featuredImage && (
                <div className="relative h-96 bg-gray-900">
                    <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
            )}

            {/* Main Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Badge */}
                {blog.category && (
                    <div className="mb-6">
                        <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 text-sm font-bold rounded-full">
                            {blog.category}
                        </span>
                    </div>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {blog.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-gray-200">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {blog.author.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-gray-900 font-semibold">{blog.author.username}</p>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <Clock className="w-3.5 h-3.5" />
                                {formatDate(blog.publishedAt || blog.createdAt)}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 ml-auto">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Eye className="w-5 h-5" />
                            <span className="text-sm font-medium">{blog.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Heart className="w-5 h-5" />
                            <span className="text-sm font-medium">{blog.likes.length}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">{blog.comments.length}</span>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {blog.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium rounded-lg"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Read Time */}
                <div className="mb-8 text-gray-600 text-sm font-medium">
                    ⏱️ {formatReadTime(blog.content)}
                </div>

                {/* Blog Content */}
                <div className="prose prose-lg max-w-none mb-12">
                    <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {blog.content}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 py-8 border-y border-gray-200">
                    <button className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors">
                        <Heart className="w-5 h-5" />
                        Like ({blog.likes.length})
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-xl transition-colors">
                        <Share2 className="w-5 h-5" />
                        Share
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 font-semibold rounded-xl transition-colors">
                        <Bookmark className="w-5 h-5" />
                        Save
                    </button>
                </div>

                {/* Comments Section */}
                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Comments ({blog.comments.length})
                    </h3>

                    {blog.comments.length > 0 ? (
                        <div className="space-y-6">
                            {blog.comments.map((comment) => (
                                <div key={comment._id} className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                            {comment.user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-gray-900">
                                                    {comment.user.username}
                                                </span>
                                                <span className="text-gray-400 text-sm">•</span>
                                                <span className="text-gray-500 text-sm">
                                                    {formatDate(comment.createdAt)}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">
                                                {comment.comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
}