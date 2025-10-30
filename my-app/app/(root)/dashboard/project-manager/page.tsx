'use client';

import React, { useState, useEffect } from 'react';
import {
    FolderKanban,
    Users,
    FileText,
    Calendar,
    CheckCircle2,
    Clock,
    Upload,
    Download,
    Plus,
    Edit2,
    Trash2,
    Send,
    AlertCircle,
    TrendingUp,
    Filter,
    Search,
    X,
    ChevronRight,
    ChevronDown
} from 'lucide-react';

import { useAuth } from '../../../Context/AuthContext';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1/pm';

// Types
interface User {
    _id: string;
    username: string;
    email: string;
    role: string[];
}

interface Project {
    _id: string;
    name: string;
    description: string;
    client: string;
    stage: string;
    salesperson?: User;
    projectManager?: User;
    businessAnalyst?: User;
    developers: User[];
    startDate?: string;
    estimatedEndDate?: string;
    actualEndDate?: string;
    tasks: Task[];
    documents: Document[];
    roadmap: Milestone[];
    progressUpdates: ProgressUpdate[];
    isActive: boolean;
    createdAt: string;
}

interface Task {
    _id: string;
    title: string;
    description: string;
    assignedTo?: User;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate?: string;
    completedAt?: string;
}

interface Document {
    _id: string;
    name: string;
    url: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    uploadedBy: User;
    uploadedAt: string;
}

interface Milestone {
    _id: string;
    milestone: string;
    description: string;
    targetDate: string;
    status: 'pending' | 'in-progress' | 'completed';
    completedAt?: string;
}

interface ProgressUpdate {
    _id: string;
    developer: User;
    status: 'on-going' | 'finished';
    notes: string;
    percentage: number;
    updatedAt: string;
}

const PMDashboard: React.FC = () => {
    const { token, user } = useAuth(); // ✅ Get token from useAuth
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'documents' | 'roadmap' | 'team'>('overview');
    const [stageFilter, setStageFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string>('');

    // Modal states
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showMilestoneModal, setShowMilestoneModal] = useState(false);
    const [showAssignDevModal, setShowAssignDevModal] = useState(false);
    const [availableUsers, setAvailableUsers] = useState<User[]>([]);

    // Form states
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: ''
    });

    const [milestoneForm, setMilestoneForm] = useState({
        milestone: '',
        description: '',
        targetDate: ''
    });

    const [selectedDevs, setSelectedDevs] = useState<string[]>([]);

    // ✅ FIXED: Fetch projects using token from useAuth
    const fetchProjects = async () => {
        if (!token) {
            console.error("❌ No token available from useAuth");
            setError("Authentication required. Please log in.");
            setLoading(false);
            return;
        }

        console.log('🔍 Fetching projects with token:', token.substring(0, 20) + '...');

        try {
            setLoading(true);
            setError('');

            const response = await fetch(`${API_BASE_URL}/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`, // ✅ Use token from useAuth
                    "Content-Type": "application/json",
                },
            });

            console.log('📡 Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("❌ Failed to fetch projects:", errorData.message || response.statusText);
                setError(errorData.message || "Failed to fetch projects");
                return;
            }

            const data = await response.json();
            console.log('✅ Projects fetched:', data.data?.length || 0);
            setProjects(data.data || []);
        } catch (error) {
            console.error("❌ Error fetching projects:", error);
            setError("Network error. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ FIXED: Fetch single project
    const fetchProjectDetails = async (projectId: string) => {
        if (!token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/${projectId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // ✅ Use token from useAuth
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setSelectedProject(data.data);
            }
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    // ✅ FIXED: Fetch available users
    const fetchUsers = async () => {
        if (!token) return;

        try {
            // Note: This endpoint seems wrong - should it be '/api/v1/user/users'?
            const response = await fetch(`http://localhost:8080/api/v1/user/all-users`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // ✅ Use token from useAuth
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAvailableUsers(data.users || []);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // ✅ FIXED: Add task
    const handleAddTask = async () => {
        if (!selectedProject || !taskForm.title || !token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/${selectedProject._id}/tasks`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // ✅ Use token from useAuth
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskForm),
            });

            if (response.ok) {
                await fetchProjectDetails(selectedProject._id);
                setShowTaskModal(false);
                setTaskForm({ title: '', description: '', assignedTo: '', dueDate: '' });
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // ✅ FIXED: Update task status
    const handleUpdateTaskStatus = async (taskId: string, status: string) => {
        if (!selectedProject || !token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/${selectedProject._id}/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`, // ✅ Use token from useAuth
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                await fetchProjectDetails(selectedProject._id);
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // ✅ FIXED: Add milestone
    const handleAddMilestone = async () => {
        if (!selectedProject || !milestoneForm.milestone || !token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/${selectedProject._id}/roadmap`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // ✅ Use token from useAuth
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(milestoneForm),
            });

            if (response.ok) {
                await fetchProjectDetails(selectedProject._id);
                setShowMilestoneModal(false);
                setMilestoneForm({ milestone: '', description: '', targetDate: '' });
            }
        } catch (error) {
            console.error('Error adding milestone:', error);
        }
    };

    // ✅ FIXED: Update milestone status
    const handleUpdateMilestoneStatus = async (milestoneId: string, status: string) => {
        if (!selectedProject || !token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/${selectedProject._id}/roadmap/${milestoneId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`, // ✅ Use token from useAuth
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                await fetchProjectDetails(selectedProject._id);
            }
        } catch (error) {
            console.error('Error updating milestone:', error);
        }
    };

    // ✅ FIXED: Assign developers
    const handleAssignDevelopers = async () => {
        if (!selectedProject || selectedDevs.length === 0 || !token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/${selectedProject._id}/assign-developers`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // ✅ Use token from useAuth
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ developers: selectedDevs }),
            });

            if (response.ok) {
                await fetchProjectDetails(selectedProject._id);
                setShowAssignDevModal(false);
                setSelectedDevs([]);
            }
        } catch (error) {
            console.error('Error assigning developers:', error);
        }
    };

    // ✅ FIXED: Document download
    const handleDownloadDocument = async (docId: string) => {
        if (!selectedProject || !token) return;

        try {
            const response = await fetch(
                `${API_BASE_URL}/${selectedProject._id}/documents/${docId}/download`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // ✅ Use token from useAuth
                    },
                }
            );

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'document';
                a.click();
            }
        } catch (error) {
            console.error('Error downloading document:', error);
        }
    };

    // ✅ FIXED: Only fetch when token is available
    useEffect(() => {
        if (token) {
            console.log('✅ Token available, fetching data...');
            fetchProjects();
            fetchUsers();
        } else {
            console.log('⚠️ No token available yet');
        }
    }, [token]); // ✅ Re-fetch when token changes

    // Filter projects
    const filteredProjects = projects.filter(project => {
        const matchesStage = stageFilter === 'all' || project.stage === stageFilter;
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.client.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStage && matchesSearch;
    });

    // Get stage color
    const getStageColor = (stage: string) => {
        const colors: Record<string, string> = {
            'sales': 'bg-blue-100 text-blue-800',
            'requirement-gathering': 'bg-purple-100 text-purple-800',
            'handover-to-pm': 'bg-yellow-100 text-yellow-800',
            'assigned-to-developer': 'bg-green-100 text-green-800',
            'finished': 'bg-gray-100 text-gray-800',
        };
        return colors[stage] || 'bg-gray-100 text-gray-800';
    };

    // Get status badge
    const getStatusBadge = (status: string) => {
        const badges: Record<string, { bg: string; text: string }> = {
            'pending': { bg: 'bg-gray-100', text: 'text-gray-800' },
            'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800' },
            'completed': { bg: 'bg-green-100', text: 'text-green-800' },
        };
        return badges[status] || badges.pending;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading projects...</p>
                </div>
            </div>
        );
    }

    // ✅ Show error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Projects</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={fetchProjects}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Project Manager Dashboard</h1>
                            <p className="text-sm text-gray-600 mt-1">Manage and track all your projects</p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <span className="text-gray-600">Welcome,</span>
                            <span className="font-semibold text-gray-900">{user?.username}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Projects</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{projects.length}</p>
                            </div>
                            <FolderKanban className="w-12 h-12 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Active Projects</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {projects.filter(p => p.isActive).length}
                                </p>
                            </div>
                            <TrendingUp className="w-12 h-12 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">In Development</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {projects.filter(p => p.stage === 'assigned-to-developer').length}
                                </p>
                            </div>
                            <Users className="w-12 h-12 text-purple-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Completed</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {projects.filter(p => p.stage === 'finished').length}
                                </p>
                            </div>
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Projects List */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Projects</h2>

                                {/* Search and Filter */}
                                <div className="mt-4 space-y-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search projects..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <select
                                        value={stageFilter}
                                        onChange={(e) => setStageFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">All Stages</option>
                                        <option value="sales">Sales</option>
                                        <option value="requirement-gathering">Requirement Gathering</option>
                                        <option value="handover-to-pm">Handover to PM</option>
                                        <option value="assigned-to-developer">In Development</option>
                                        <option value="finished">Finished</option>
                                    </select>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-200 max-h-[calc(100vh-400px)] overflow-y-auto">
                                {filteredProjects.map((project) => (
                                    <div
                                        key={project._id}
                                        onClick={() => {
                                            setSelectedProject(project);
                                            fetchProjectDetails(project._id);
                                        }}
                                        className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                                            selectedProject?._id === project._id ? 'bg-blue-50' : ''
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 truncate">{project.name}</p>
                                                <p className="text-sm text-gray-600 mt-1">{project.client}</p>
                                                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getStageColor(project.stage)}`}>
                          {project.stage.replace(/-/g, ' ')}
                        </span>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                                        </div>
                                    </div>
                                ))}

                                {filteredProjects.length === 0 && (
                                    <div className="p-8 text-center text-gray-500">
                                        <FolderKanban className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                        <p>No projects found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Project Details - Rest of the component remains the same */}
                    <div className="lg:col-span-2">
                        {selectedProject ? (
                            <div className="bg-white rounded-lg shadow">
                                {/* Keep all the existing project details tabs and content */}
                                {/* I'm truncating here for brevity - keep all your existing tab content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {selectedProject.name}
                                    </h3>
                                    <p className="text-gray-600 mt-2">{selectedProject.description}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow p-12 text-center">
                                <FolderKanban className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Project</h3>
                                <p className="text-gray-600">Choose a project from the list to view details and manage tasks</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Keep all your modals - Add Task, Add Milestone, Assign Developers */}
        </div>
    );
};

export default PMDashboard;