'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/Context/AuthContext';
import Sidebar from '@/components/ui/Sidebar';
import DashboardNavbar from '@/components/ui/DashboardNavbar';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  FileText,
  User,
  Building,
  ArrowRight
} from 'lucide-react';
import { log } from 'console';

// API Base URL
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
  salesperson: User;
  projectManager?: User;
  businessAnalyst?: User;
  developers: User[];
  stage: 'sales' | 'requirement-gathering' | 'handover-to-pm' | 'assigned-to-developer' | 'finished';
  startDate: string;
  estimatedEndDate: string;
  actualEndDate?: string;
  isActive: boolean;
  createdAt: string;
  tasks: any[];
  documents: any[];
  roadmap: any[];
  progressUpdates: any[];
}

const ProjectManagerDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // State
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: '',
    salesperson: '',
    startDate: '',
    estimatedEndDate: ''
  });

  // API Functions
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      setProjects(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/user/all-users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch users');
      console.log('Response:', response);
      const data = await response.json();
      setUsers(data.data || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    }
  };

  const createProject = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to create project');
      
      await fetchProjects();
      setShowCreateModal(false);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    }
  };

  const updateProject = async () => {
    if (!editingProject) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/${editingProject._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to update project');
      
      await fetchProjects();
      setEditingProject(null);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete project');
      
      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      client: '',
      salesperson: '',
      startDate: '',
      estimatedEndDate: ''
    });
  };

  // Effects
  useEffect(() => {
    if (token) {
      Promise.all([fetchProjects(), fetchUsers()])
        .finally(() => setLoading(false));
    }
  }, [token]);

  // Utility functions
  const getStageColor = (stage: string) => {
    const colors = {
      'sales': 'bg-blue-100 text-blue-800',
      'requirement-gathering': 'bg-yellow-100 text-yellow-800',
      'handover-to-pm': 'bg-purple-100 text-purple-800',
      'assigned-to-developer': 'bg-green-100 text-green-800',
      'finished': 'bg-gray-100 text-gray-800'
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStageIcon = (stage: string) => {
    const icons = {
      'sales': <User className="w-4 h-4" />,
      'requirement-gathering': <FileText className="w-4 h-4" />,
      'handover-to-pm': <ArrowRight className="w-4 h-4" />,
      'assigned-to-developer': <Users className="w-4 h-4" />,
      'finished': <CheckCircle className="w-4 h-4" />
    };
    return icons[stage as keyof typeof icons] || <AlertCircle className="w-4 h-4" />;
  };

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || project.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  // Statistics
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.isActive).length,
    finished: projects.filter(p => p.stage === 'finished').length,
    inProgress: projects.filter(p => p.stage === 'assigned-to-developer').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} title="Project Manager" />
      
      <div className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Manager Dashboard</h1>
            <p className="text-gray-600">Manage and track all your projects</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
                <button 
                  onClick={() => setError(null)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Development</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.finished}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={stageFilter}
                    onChange={(e) => setStageFilter(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Stages</option>
                    <option value="sales">Sales</option>
                    <option value="requirement-gathering">Requirement Gathering</option>
                    <option value="handover-to-pm">Handover to PM</option>
                    <option value="assigned-to-developer">Assigned to Developer</option>
                    <option value="finished">Finished</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Project
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.client}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStageColor(project.stage)}`}>
                    {getStageIcon(project.stage)}
                    {project.stage.replace('-', ' ')}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Salesperson:</span>
                    <span className="font-medium">{project.salesperson?.username}</span>
                  </div>
                  {project.projectManager && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">PM:</span>
                      <span className="font-medium">{project.projectManager.username}</span>
                    </div>
                  )}
                  {project.developers.length > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Developers:</span>
                      <span className="font-medium">{project.developers.length}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(project.estimatedEndDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push(`/dashboard/project-manager/${project._id}`)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setFormData({
                        name: project.name,
                        description: project.description,
                        client: project.client,
                        salesperson: project.salesperson._id,
                        startDate: project.startDate.split('T')[0],
                        estimatedEndDate: project.estimatedEndDate.split('T')[0]
                      });
                    }}
                    className="bg-gray-50 hover:bg-gray-100 text-gray-600 p-2 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  {user?.role?.includes('Admin') && (
                    <button
                      onClick={() => deleteProject(project._id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || stageFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by creating your first project'
                }
              </p>
              {!searchTerm && stageFilter === 'all' && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Project
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Project Modal */}
      {(showCreateModal || editingProject) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter project description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter client name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salesperson</label>
                <select
                  value={formData.salesperson}
                  onChange={(e) => setFormData({...formData, salesperson: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select salesperson</option>
                  {users.filter(u => u.role.includes('Sales')).map(user => (
                    <option key={user._id} value={user._id}>{user.username}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.estimatedEndDate}
                    onChange={(e) => setFormData({...formData, estimatedEndDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingProject(null);
                  resetForm();
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingProject ? updateProject : createProject}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingProject ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagerDashboard;