'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Code,
    Plus,
    Search,
    Star,
    Eye,
    Calendar,
    Trash2,
    Globe,
    Lock,
    TrendingUp
} from 'lucide-react';
import Sidebar from "@/components/ui/Sidebar";
import DashboardNavbar from "@/components/ui/DashboardNavbar";

// Types
interface Project {
    _id: string;
    name: string;
    description?: string;
    tags: string[];
    isPublic: boolean;
    color: string;
    icon: string;
    snippetCount: number;
    createdAt: string;
    updatedAt: string;
}

interface Snippet {
    _id: string;
    title: string;
    description?: string;
    code: string;
    language: string;
    tags: string[];
    isFavorite: boolean;
    isPublic: boolean;
    views: number;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

const API_BASE_URL = '/api/code';

const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.productId as string;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [project, setProject] = useState<Project | null>(null);
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');
    const [sortBy, setSortBy] = useState<'createdAt' | 'updatedAt' | 'title'>('createdAt');

    const fetchProjectData = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const [projectRes, snippetsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/projects/${projectId}`, {
                    headers: getAuthHeaders()
                }),
                fetch(`${API_BASE_URL}/projects/${projectId}/snippets`, {
                    headers: getAuthHeaders()
                })
            ]);

            if (projectRes.ok) {
                const projectData = await projectRes.json();
                setProject(projectData.project);
            } else {
                setError('Failed to load project');
            }

            if (snippetsRes.ok) {
                const snippetsData = await snippetsRes.json();
                setSnippets(snippetsData.snippets || []);
            }
        } catch (error) {
            console.error('Error fetching project data:', error);
            setError('Failed to load project data');
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchProjectData();
    }, [fetchProjectData]);

    const handleDeleteSnippet = async (id: string) => {
        if (!confirm('Are you sure you want to delete this snippet?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/snippets/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                await fetchProjectData();
            }
        } catch (error) {
            console.error('Error deleting snippet:', error);
        }
    };

    const handleToggleFavorite = async (id: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/snippets/${id}/favorite`, {
                method: 'POST',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                setSnippets(snippets.map(s =>
                    s._id === id ? { ...s, isFavorite: !s.isFavorite } : s
                ));
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    // Filter and sort snippets
    const filteredSnippets = snippets
        .filter(snippet => {
            const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                snippet.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLanguage = !languageFilter || snippet.language === languageFilter;
            return matchesSearch && matchesLanguage;
        })
        .sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            }
            return new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime();
        });

    const languages = Array.from(new Set(snippets.map(s => s.language)));

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading project...</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || 'Project not found'}</p>
                    <button
                        onClick={() => router.push('/dashboard/code-manager')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pl-10 lg:pl-65 ">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <DashboardNavbar
                onMenuClick={() => setSidebarOpen(true)}
                title="Profile Settings"
            />
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <button
                        onClick={() => router.push('/dashboard/code-manager')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Dashboard
                    </button>

                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div
                                className="text-5xl p-4 rounded-xl"
                                style={{ backgroundColor: `${project.color}20` }}
                            >
                                {project.icon}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                                    {project.isPublic ? (
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
                                {project.description && (
                                    <p className="text-gray-600 mb-3 max-w-2xl">{project.description}</p>
                                )}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            New Snippet
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-gray-50 shadow-2xs border-1 border-gray-700 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <Code className="w-4 h-4" />
                                <span className="text-sm font-medium">Total Snippets</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{snippets.length}</p>
                        </div>
                        <div className="bg-gray-50 shadow-2xs border-1 border-gray-700  rounded-lg p-4">
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-medium">Languages</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{languages.length}</p>
                        </div>
                        <div className="bg-gray-50 shadow-2xs border-1 border-gray-700  rounded-lg p-4">
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">Last Updated</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">
                                {new Date(project.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search snippets..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={languageFilter}
                            onChange={(e) => setLanguageFilter(e.target.value)}
                        >
                            <option value="">All Languages</option>
                            {languages.map(lang => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'createdAt' | 'updatedAt' | 'title')}
                        >
                            <option value="createdAt">Newest First</option>
                            <option value="updatedAt">Recently Updated</option>
                            <option value="title">Title A-Z</option>
                        </select>
                    </div>
                </div>

                {/* Snippets Grid */}
                {filteredSnippets.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredSnippets.map((snippet) => (
                            <div
                                key={snippet._id}
                                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                                onClick={() => router.push(`/dashboard/code-manager/${project?._id}/snippet/${snippet._id}`)}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-lg text-gray-900">{snippet.title}</h3>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleToggleFavorite(snippet._id);
                                                }}
                                                className="hover:scale-110 transition-transform"
                                            >
                                                <Star className={`w-5 h-5 ${snippet.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                                            </button>
                                        </div>
                                        {snippet.description && (
                                            <p className="text-sm text-gray-600 mb-3">{snippet.description}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                            {snippet.language}
                                        </span>
                                        {snippet.tags.slice(0, 3).map((tag, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                                            <Eye className="w-3 h-3" />
                                            {snippet.views}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {new Date(snippet.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/dashboard/code-manager/${project?._id}/snippet/${snippet._id}`);
                                        }}
                                        className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2 text-sm transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteSnippet(snippet._id);
                                        }}
                                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center gap-2 text-sm transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <Code className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-4">
                            {searchTerm || languageFilter ? 'No snippets match your filters' : 'No snippets yet'}
                        </p>
                        <button
                            onClick={() => router.push(`/dashboard/code-manager?createSnippet=true`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Create First Snippet
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
