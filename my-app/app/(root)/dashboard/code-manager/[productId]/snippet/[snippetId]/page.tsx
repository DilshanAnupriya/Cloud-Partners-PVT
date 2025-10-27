'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Copy,
    Check,
    Star,
    Eye,
    Calendar,
    Edit,
    Trash2,
    Globe,
    Lock,
    Tag,
    FileCode,
    StickyNote
} from 'lucide-react';

// Types
interface Snippet {
    _id: string;
    title: string;
    description?: string;
    code: string;
    language: string;
    project: {
        _id: string;
        name: string;
        icon: string;
        color: string;
    };
    tags: string[];
    isFavorite: boolean;
    isPublic: boolean;
    views: number;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

const API_BASE_URL = 'http://localhost:8080/api/code';

const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export default function SnippetDetailPage() {
    const params = useParams();
    const router = useRouter();
    const snippetId = params.snippetId as string;

    const [snippet, setSnippet] = useState<Snippet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchSnippet();
    }, [snippetId]);

    const fetchSnippet = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/snippets/${snippetId}`, {
                headers: getAuthHeaders()
            });

            if (response.ok) {
                const data = await response.json();
                setSnippet(data.snippet);
            } else {
                setError('Failed to load snippet');
            }
        } catch (error) {
            console.error('Error fetching snippet:', error);
            setError('Failed to load snippet');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyCode = async () => {
        if (!snippet) return;

        try {
            await navigator.clipboard.writeText(snippet.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            // Fallback method
            const textArea = document.createElement('textarea');
            textArea.value = snippet.code;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Fallback copy failed:', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const handleToggleFavorite = async () => {
        if (!snippet) return;

        try {
            const response = await fetch(`${API_BASE_URL}/snippets/${snippetId}/favorite`, {
                method: 'POST',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                setSnippet({ ...snippet, isFavorite: !snippet.isFavorite });
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this snippet?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/snippets/${snippetId}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Error deleting snippet:', error);
        }
    };

    const handleDuplicate = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/snippets/${snippetId}/duplicate`, {
                method: 'POST',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                const data = await response.json();
                router.push(`/snippet/${data.snippet._id}`);
            }
        } catch (error) {
            console.error('Error duplicating snippet:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading snippet...</p>
                </div>
            </div>
        );
    }

    if (error || !snippet) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || 'Snippet not found'}</p>
                    <button
                        onClick={() => router.push(`/dashboard/code-manager`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => router.push(`/dashboard/code-manager/${snippet.project._id}`)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to {snippet.project.name}
                        </button>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleToggleFavorite}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <Star className={`w-5 h-5 ${snippet.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                            </button>
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Edit className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={handleDuplicate}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                Duplicate
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <h1 className="text-3xl font-bold text-gray-900">{snippet.title}</h1>
                                {snippet.isPublic ? (
                                    <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                        <Globe className="w-4 h-4" />
                                        Public
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        <Lock className="w-4 h-4" />
                                        Private
                                    </span>
                                )}
                            </div>
                            {snippet.description && (
                                <p className="text-gray-600 mb-4">{snippet.description}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    onClick={() => router.push(`/project/${snippet.project._id}`)}
                                    className="px-3 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                                    style={{
                                        backgroundColor: `${snippet.project.color}20`,
                                        color: snippet.project.color
                                    }}
                                >
                                    {snippet.project.icon} {snippet.project.name}
                                </button>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    {snippet.language}
                                </span>
                                {snippet.tags.map((tag, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{snippet.views} views</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">Created {new Date(snippet.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">Updated {new Date(snippet.updatedAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Code Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FileCode className="w-5 h-5 text-gray-300" />
                                    <span className="text-gray-300 font-medium">{snippet.title}</span>
                                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                                        {snippet.language}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCopyCode}
                                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                                        copied
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            Copy Code
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="bg-gray-900 p-6 overflow-x-auto">
                                <pre className="text-gray-100 text-sm font-mono leading-relaxed">
                                    <code>{snippet.code}</code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Notes Section */}
                        {snippet.notes && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <StickyNote className="w-5 h-5 text-yellow-600" />
                                    <h3 className="font-semibold text-gray-900">Notes</h3>
                                </div>
                                <p className="text-sm text-gray-600 whitespace-pre-wrap">{snippet.notes}</p>
                            </div>
                        )}

                        {/* Tags Section */}
                        {snippet.tags.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Tag className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-semibold text-gray-900">Tags</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {snippet.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={handleCopyCode}
                                    className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2 text-sm transition-colors"
                                >
                                    <Copy className="w-4 h-4" />
                                    Copy to Clipboard
                                </button>
                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 text-sm transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit Snippet
                                </button>
                            </div>
                        </div>

                        {/* Code Stats */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Code Statistics</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Lines of Code</span>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {snippet.code.split('\n').length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Characters</span>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {snippet.code.length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Language</span>
                                    <span className="text-sm font-semibold text-gray-900 capitalize">
                                        {snippet.language}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}