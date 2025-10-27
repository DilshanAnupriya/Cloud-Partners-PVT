'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Folder, Code, Star, Eye, Calendar, TrendingUp, BarChart3, FileCode, Edit, Trash2, Copy, X, Save, AlertCircle } from 'lucide-react';
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

interface Stats {
    totalProjects: number;
    publicProjects: number;
    totalSnippets: number;
    snippetsByLanguage: Array<{ _id: string; count: number }>;
}

// API Configuration
const API_BASE_URL = 'http://localhost:8080/api/code';

// Add debugging to getAuthHeaders
const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    console.log('🔑 Token from localStorage:', token ? token.substring(0, 20) + '...' : 'NO TOKEN');

    if (!token) {
        console.error('❌ No auth token found!');
    }

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

// Available languages
const LANGUAGES = [
    'javascript', 'deluge', 'typescript', 'python', 'java', 'csharp',
    'cpp', 'c', 'go', 'rust', 'php', 'ruby', 'swift',
    'kotlin', 'dart', 'sql', 'html', 'css', 'scss',
    'json', 'xml', 'yaml', 'markdown', 'bash', 'shell',
    'powershell', 'other'
];

export default function CodeManagementDashboard() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'projects' | 'snippets'>('all');
    const [languageFilter, setLanguageFilter] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // Modal states
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showSnippetModal, setShowSnippetModal] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);

    // Form states
    const [projectForm, setProjectForm] = useState({
        name: '',
        description: '',
        tags: [] as string[],
        isPublic: false,
        color: '#3B82F6',
        icon: '📁'
    });

    const [snippetForm, setSnippetForm] = useState({
        title: '',
        description: '',
        code: '',
        language: 'javascript',
        project: '',
        tags: [] as string[],
        notes: '',
        isPublic: false,
        isFavorite: false
    });

    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        setError('');
        try {
            const [projectsRes, snippetsRes, statsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/projects`, { headers: getAuthHeaders() }),
                fetch(`${API_BASE_URL}/snippets`, { headers: getAuthHeaders() }),
                fetch(`${API_BASE_URL}/projects/stats`, { headers: getAuthHeaders() })
            ]);

            if (projectsRes.ok) {
                const projectsData = await projectsRes.json();
                setProjects(projectsData.projects || []);
            }

            if (snippetsRes.ok) {
                const snippetsData = await snippetsRes.json();
                setSnippets(snippetsData.snippets || []);
            }

            if (statsRes.ok) {
                const statsData = await statsRes.json();
                setStats(statsData.stats);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError('Failed to load dashboard data. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    // Project CRUD operations
    const handleCreateProject = async () => {
        if (!projectForm.name.trim()) {
            setError('Project name is required');
            return;
        }

        try {
            setError('');
            const response = await fetch(`${API_BASE_URL}/projects`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(projectForm)
            });

            const data = await response.json();

            if (response.ok) {
                await fetchDashboardData();
                setShowProjectModal(false);
                resetProjectForm();
            } else {
                setError(data.error || 'Failed to create project');
                console.error('Create project error:', data);
            }
        } catch (error) {
            console.error('Error creating project:', error);
            setError('Network error. Please try again.');
        }
    };

    const handleUpdateProject = async () => {
        if (!editingProject) return;

        try {
            setError('');
            const response = await fetch(`${API_BASE_URL}/projects/${editingProject._id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(projectForm)
            });

            const data = await response.json();

            if (response.ok) {
                await fetchDashboardData();
                setShowProjectModal(false);
                setEditingProject(null);
                resetProjectForm();
            } else {
                setError(data.error || 'Failed to update project');
            }
        } catch (error) {
            console.error('Error updating project:', error);
            setError('Network error. Please try again.');
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm('Are you sure? This will delete all snippets in this project.')) return;

        try {
            setError('');
            const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                await fetchDashboardData();
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to delete project');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            setError('Network error. Please try again.');
        }
    };

    // Snippet CRUD operations with detailed error logging
    const handleCreateSnippet = async () => {
        // Validation
        if (!snippetForm.title.trim()) {
            setError('Snippet title is required');
            return;
        }
        if (!snippetForm.code.trim()) {
            setError('Code is required');
            return;
        }
        if (!snippetForm.project) {
            setError('Please select a project');
            return;
        }

        try {
            setError('');
            console.log('Creating snippet with data:', {
                title: snippetForm.title,
                language: snippetForm.language,
                project: snippetForm.project,
                codeLength: snippetForm.code.length
            });

            const response = await fetch(`${API_BASE_URL}/snippets`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(snippetForm)
            });

            const data = await response.json();
            console.log('Response status:', response.status);
            console.log('Response data:', data);

            if (response.ok) {
                await fetchDashboardData();
                setShowSnippetModal(false);
                resetSnippetForm();
            } else {
                // Detailed error handling
                const errorMessage = data.error || data.message || 'Failed to create snippet';
                setError(`Error ${response.status}: ${errorMessage}`);
                console.error('Create snippet error:', {
                    status: response.status,
                    error: data
                });
            }
        } catch (error) {
            console.error('Network error creating snippet:', error);
            setError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleUpdateSnippet = async () => {
        if (!editingSnippet) return;

        try {
            setError('');
            const response = await fetch(`${API_BASE_URL}/snippets/${editingSnippet._id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(snippetForm)
            });

            const data = await response.json();

            if (response.ok) {
                await fetchDashboardData();
                setShowSnippetModal(false);
                setEditingSnippet(null);
                resetSnippetForm();
            } else {
                setError(data.error || 'Failed to update snippet');
            }
        } catch (error) {
            console.error('Error updating snippet:', error);
            setError('Network error. Please try again.');
        }
    };

    const handleDeleteSnippet = async (id: string) => {
        if (!confirm('Are you sure you want to delete this snippet?')) return;

        try {
            setError('');
            const response = await fetch(`${API_BASE_URL}/snippets/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                await fetchDashboardData();
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to delete snippet');
            }
        } catch (error) {
            console.error('Error deleting snippet:', error);
            setError('Network error. Please try again.');
        }
    };

    const handleToggleFavorite = async (id: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/snippets/${id}/favorite`, {
                method: 'POST',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                await fetchDashboardData();
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const handleDuplicateSnippet = async (id: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/snippets/${id}/duplicate`, {
                method: 'POST',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                await fetchDashboardData();
            }
        } catch (error) {
            console.error('Error duplicating snippet:', error);
        }
    };

    // Form handlers
    const openProjectModal = (project?: Project) => {
        setError('');
        if (project) {
            setEditingProject(project);
            setProjectForm({
                name: project.name,
                description: project.description || '',
                tags: project.tags,
                isPublic: project.isPublic,
                color: project.color,
                icon: project.icon
            });
        } else {
            resetProjectForm();
        }
        setShowProjectModal(true);
    };

    const openSnippetModal = (snippet?: Snippet) => {
        setError('');
        if (snippet) {
            setEditingSnippet(snippet);
            setSnippetForm({
                title: snippet.title,
                description: snippet.description || '',
                code: snippet.code,
                language: snippet.language,
                project: snippet.project._id,
                tags: snippet.tags,
                notes: snippet.notes || '',
                isPublic: snippet.isPublic,
                isFavorite: snippet.isFavorite
            });
        } else {
            resetSnippetForm();
        }
        setShowSnippetModal(true);
    };

    const resetProjectForm = () => {
        setProjectForm({
            name: '',
            description: '',
            tags: [],
            isPublic: false,
            color: '#3B82F6',
            icon: '📁'
        });
        setEditingProject(null);
    };

    const resetSnippetForm = () => {
        setSnippetForm({
            title: '',
            description: '',
            code: '',
            language: 'javascript',
            project: '',
            tags: [],
            notes: '',
            isPublic: false,
            isFavorite: false
        });
        setEditingSnippet(null);
    };

    const addTag = (formType: 'project' | 'snippet') => {
        if (!tagInput.trim()) return;

        if (formType === 'project') {
            setProjectForm(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
        } else {
            setSnippetForm(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
        }
        setTagInput('');
    };

    const removeTag = (formType: 'project' | 'snippet', index: number) => {
        if (formType === 'project') {
            setProjectForm(prev => ({
                ...prev,
                tags: prev.tags.filter((_, i) => i !== index)
            }));
        } else {
            setSnippetForm(prev => ({
                ...prev,
                tags: prev.tags.filter((_, i) => i !== index)
            }));
        }
    };

    // Search and filter logic
    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredSnippets = snippets.filter(snippet => {
        const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            snippet.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLanguage = !languageFilter || snippet.language === languageFilter;
        return matchesSearch && matchesLanguage;
    });


    return (
        <div className="min-h-screen bg-gray-50 pt-30 2xl:ml-30 lg:pl-23">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <DashboardNavbar
                onMenuClick={() => setSidebarOpen(true)}
                title="Code Management"
            />

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-16 h-16">
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <p className="text-gray-600 font-medium">Loading your content...</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Error Banner */}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4">
                            <div className="flex items-center max-w-7xl mx-auto">
                                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                                <div>
                                    <p className="text-red-800 font-medium">Error</p>
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                                <button
                                    onClick={() => setError('')}
                                    className="ml-auto text-red-500 hover:text-red-700"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Header */}
                    <header className="">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Code Management Dashboard</h1>
                                    <p className="text-sm text-gray-600 mt-1">Manage your projects and code snippets</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => openProjectModal()}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        New Project
                                    </button>
                                    <button
                                        onClick={() => openSnippetModal()}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                                        disabled={projects.length === 0}
                                    >
                                        <Code className="w-4 h-4" />
                                        New Snippet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Projects</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalProjects || 0}</p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <Folder className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Snippets</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalSnippets || 0}</p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <FileCode className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Public Projects</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.publicProjects || 0}</p>
                                    </div>
                                    <div className="p-3 bg-purple-100 rounded-lg">
                                        <TrendingUp className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Languages</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.snippetsByLanguage?.length || 0}</p>
                                    </div>
                                    <div className="p-3 bg-orange-100 rounded-lg">
                                        <BarChart3 className="w-6 h-6 text-orange-600" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Language Distribution */}
                        {stats && stats.snippetsByLanguage.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Language Distribution</h2>
                                <div className="space-y-3">
                                    {stats.snippetsByLanguage.map((lang) => (
                                        <div key={lang._id} className="flex items-center gap-3">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-700 capitalize">{lang._id}</span>
                                                    <span className="text-sm text-gray-600">{lang.count} snippets</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full transition-all"
                                                        style={{ width: `${(lang.count / (stats?.totalSnippets || 1)) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Search and Filter Bar */}
                        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 mb-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search projects and snippets..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedFilter('all')}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                            selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setSelectedFilter('projects')}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                            selectedFilter === 'projects' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Projects
                                    </button>
                                    <button
                                        onClick={() => setSelectedFilter('snippets')}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                            selectedFilter === 'snippets' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Snippets
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Projects Section */}
                        {(selectedFilter === 'all' || selectedFilter === 'projects') && (
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Projects</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProjects.map((project) => (
                                        <div
                                            key={project._id}
                                            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                                            onClick={() => router.push(`/dashboard/code-manager/${project._id}`)}
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="text-3xl p-2 rounded-lg"
                                                        style={{ backgroundColor: `${project.color}20` }}
                                                    >
                                                        {project.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                                                        <p className="text-sm text-gray-500">{project.snippetCount} snippets</p>
                                                    </div>
                                                </div>
                                                {project.isPublic && (
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Public</span>
                                                )}
                                            </div>
                                            {project.description && (
                                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                                            )}
                                            {project.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.tags.slice(0, 3).map((tag, idx) => (
                                                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex gap-2 pt-4 border-t border-gray-200">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openProjectModal(project);
                                                    }}
                                                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2 text-sm transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteProject(project._id);
                                                    }}
                                                    className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center justify-center gap-2 text-sm transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {filteredProjects.length === 0 && (
                                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                                        <Folder className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-600">No projects found</p>
                                        <button
                                            onClick={() => openProjectModal()}
                                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Create Your First Project
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Snippets Section */}
                        {(selectedFilter === 'all' || selectedFilter === 'snippets') && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-gray-900">Recent Snippets</h2>
                                    {selectedFilter === 'snippets' && snippets.length > 0 && (
                                        <select
                                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            value={languageFilter}
                                            onChange={(e) => setLanguageFilter(e.target.value)}
                                        >
                                            <option value="">All Languages</option>
                                            {Array.from(new Set(snippets.map(s => s.language))).map(lang => (
                                                <option key={lang} value={lang}>{lang}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {filteredSnippets.slice(0, selectedFilter === 'all' ? 5 : undefined).map((snippet) => (
                                        <div
                                            key={snippet._id}
                                            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-semibold text-gray-900">{snippet.title}</h3>
                                                        <button onClick={() => handleToggleFavorite(snippet._id)}>
                                                            <Star className={`w-4 h-4 ${snippet.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                                                        </button>
                                                    </div>
                                                    {snippet.description && (
                                                        <p className="text-sm text-gray-600 mb-3">{snippet.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <span
                                                        className="px-3 py-1 rounded-full text-xs font-medium"
                                                        style={{ backgroundColor: snippet.project.color + '20', color: snippet.project.color }}
                                                    >
                                                        {snippet.project.icon} {snippet.project.name}
                                                    </span>
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                                        {snippet.language}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                                                        <Eye className="w-3 h-3" />
                                                        {snippet.views}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 text-gray-500 text-xs">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(snippet.updatedAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 pt-4 border-t border-gray-200">
                                                <button
                                                    onClick={() => openSnippetModal(snippet)}
                                                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2 text-sm transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDuplicateSnippet(snippet._id)}
                                                    className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 flex items-center justify-center gap-2 text-sm transition-colors"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                    Duplicate
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteSnippet(snippet._id)}
                                                    className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center justify-center gap-2 text-sm transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {filteredSnippets.length === 0 && (
                                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                                        <Code className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-600">No snippets found</p>
                                        {projects.length > 0 && (
                                            <button
                                                onClick={() => openSnippetModal()}
                                                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                            >
                                                Create Your First Snippet
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </main>

                    {/* Project Modal */}
                    {showProjectModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {editingProject ? 'Edit Project' : 'Create New Project'}
                                    </h2>
                                    <button onClick={() => { setShowProjectModal(false); resetProjectForm(); }}>
                                        <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={projectForm.name}
                                            onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                                            placeholder="Enter project name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows={3}
                                            value={projectForm.description}
                                            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                            placeholder="Enter project description"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                value={projectForm.icon}
                                                onChange={(e) => setProjectForm({ ...projectForm, icon: e.target.value })}
                                                placeholder="📁"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                            <input
                                                type="color"
                                                className="w-full h-10 px-1 py-1 border border-gray-300 rounded-lg cursor-pointer"
                                                value={projectForm.color}
                                                onChange={(e) => setProjectForm({ ...projectForm, color: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('project'))}
                                                placeholder="Add a tag"
                                            />
                                            <button
                                                onClick={() => addTag('project')}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {projectForm.tags.map((tag, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                                                    {tag}
                                                    <button onClick={() => removeTag('project', idx)}>
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="isPublic"
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                            checked={projectForm.isPublic}
                                            onChange={(e) => setProjectForm({ ...projectForm, isPublic: e.target.checked })}
                                        />
                                        <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">Make this project public</label>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                                    <button
                                        onClick={() => { setShowProjectModal(false); resetProjectForm(); }}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={editingProject ? handleUpdateProject : handleCreateProject}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        {editingProject ? 'Update Project' : 'Create Project'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Snippet Modal */}
                    {showSnippetModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {editingSnippet ? 'Edit Snippet' : 'Create New Snippet'}
                                    </h2>
                                    <button onClick={() => { setShowSnippetModal(false); resetSnippetForm(); }}>
                                        <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={snippetForm.title}
                                            onChange={(e) => setSnippetForm({ ...snippetForm, title: e.target.value })}
                                            placeholder="Enter snippet title"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows={2}
                                            value={snippetForm.description}
                                            onChange={(e) => setSnippetForm({ ...snippetForm, description: e.target.value })}
                                            placeholder="Enter snippet description"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Project *</label>
                                            <select
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                value={snippetForm.project}
                                                onChange={(e) => setSnippetForm({ ...snippetForm, project: e.target.value })}
                                            >
                                                <option value="">Select a project</option>
                                                {projects.map((project) => (
                                                    <option key={project._id} value={project._id}>
                                                        {project.icon} {project.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Language *</label>
                                            <select
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                value={snippetForm.language}
                                                onChange={(e) => setSnippetForm({ ...snippetForm, language: e.target.value })}
                                            >
                                                {LANGUAGES.map((lang) => (
                                                    <option key={lang} value={lang}>{lang}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                                        <textarea
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                                            rows={10}
                                            value={snippetForm.code}
                                            onChange={(e) => setSnippetForm({ ...snippetForm, code: e.target.value })}
                                            placeholder="Paste your code here..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                        <textarea
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows={3}
                                            value={snippetForm.notes}
                                            onChange={(e) => setSnippetForm({ ...snippetForm, notes: e.target.value })}
                                            placeholder="Add any notes about this snippet"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('snippet'))}
                                                placeholder="Add a tag"
                                            />
                                            <button
                                                onClick={() => addTag('snippet')}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {snippetForm.tags.map((tag, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                                                    {tag}
                                                    <button onClick={() => removeTag('snippet', idx)}>
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="snippetPublic"
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                checked={snippetForm.isPublic}
                                                onChange={(e) => setSnippetForm({ ...snippetForm, isPublic: e.target.checked })}
                                            />
                                            <label htmlFor="snippetPublic" className="text-sm font-medium text-gray-700">Public</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="snippetFavorite"
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                checked={snippetForm.isFavorite}
                                                onChange={(e) => setSnippetForm({ ...snippetForm, isFavorite: e.target.checked })}
                                            />
                                            <label htmlFor="snippetFavorite" className="text-sm font-medium text-gray-700">Favorite</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                                    <button
                                        onClick={() => { setShowSnippetModal(false); resetSnippetForm(); }}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={editingSnippet ? handleUpdateSnippet : handleCreateSnippet}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        {editingSnippet ? 'Update Snippet' : 'Create Snippet'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}