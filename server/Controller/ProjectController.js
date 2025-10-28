const Project = require('../Model/ProjectModel');
const CodeSnippet = require('../Model/CodeSnippetModel');

// Create a new project
const createProject = async (req, res) => {
    try {
        const { name, description, tags, isPublic, color, icon } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Project name is required' });
        }

        // Check if project with same name exists for this user
        const existingProject = await Project.findOne({
            name: name.trim(),
            owner: req.user._id
        });

        if (existingProject) {
            return res.status(400).json({
                error: 'A project with this name already exists'
            });
        }

        const project = new Project({
            name: name.trim(),
            description: description?.trim(),
            tags: tags || [],
            isPublic: isPublic || false,
            color: color || '#3B82F6',
            icon: icon || '📁',
            owner: req.user._id
        });

        await project.save();

        res.status(201).json({
            message: 'Project created successfully',
            project
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get all projects for current user
const getMyProjects = async (req, res) => {
    try {
        const { search, tag, sortBy = 'createdAt', order = 'desc' } = req.query;

        const filter = { owner: req.user._id };

        // Search filter
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Tag filter
        if (tag) {
            filter.tags = tag;
        }

        const sortOrder = order === 'asc' ? 1 : -1;

        const projects = await Project.find(filter)
            .sort({ [sortBy]: sortOrder })
            .populate('owner', 'username email');

        // Get snippet count for each project
        const projectsWithCount = await Promise.all(
            projects.map(async (project) => {
                const snippetCount = await CodeSnippet.countDocuments({
                    project: project._id
                });
                return {
                    ...project.toObject(),
                    snippetCount
                };
            })
        );

        res.status(200).json({
            message: 'Projects retrieved successfully',
            projects: projectsWithCount,
            count: projectsWithCount.length
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get ALL projects (Admin only)
const getAllProjects = async (req, res) => {
    try {
        const { search, tag, sortBy = 'createdAt', order = 'desc', owner } = req.query;

        const filter = {};

        // Filter by owner if provided
        if (owner) {
            filter.owner = owner;
        }

        // Search filter
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Tag filter
        if (tag) {
            filter.tags = tag;
        }

        const sortOrder = order === 'asc' ? 1 : -1;

        const projects = await Project.find(filter)
            .sort({ [sortBy]: sortOrder })
            .populate('owner', 'username email');

        // Get snippet count for each project
        const projectsWithCount = await Promise.all(
            projects.map(async (project) => {
                const snippetCount = await CodeSnippet.countDocuments({
                    project: project._id
                });
                return {
                    ...project.toObject(),
                    snippetCount
                };
            })
        );

        res.status(200).json({
            message: 'All projects retrieved successfully',
            projects: projectsWithCount,
            count: projectsWithCount.length
        });
    } catch (error) {
        console.error('Error fetching all projects:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get single project by ID
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id)
            .populate('owner', 'username email');

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Check if user has access
        if (project.owner._id.toString() !== req.user._id.toString() && !project.isPublic) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Get snippets count
        const snippetCount = await CodeSnippet.countDocuments({
            project: project._id
        });

        res.status(200).json({
            message: 'Project retrieved successfully',
            project: {
                ...project.toObject(),
                snippetCount
            }
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update project
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, tags, isPublic, color, icon } = req.body;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Check ownership
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Check for duplicate name
        if (name && name !== project.name) {
            const existingProject = await Project.findOne({
                name: name.trim(),
                owner: req.user._id,
                _id: { $ne: id }
            });

            if (existingProject) {
                return res.status(400).json({
                    error: 'A project with this name already exists'
                });
            }
        }

        // Update fields
        if (name) project.name = name.trim();
        if (description !== undefined) project.description = description?.trim();
        if (tags) project.tags = tags;
        if (isPublic !== undefined) project.isPublic = isPublic;
        if (color) project.color = color;
        if (icon) project.icon = icon;

        await project.save();

        res.status(200).json({
            message: 'Project updated successfully',
            project
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete project
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Check ownership
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Delete all snippets in this project
        await CodeSnippet.deleteMany({ project: id });

        // Delete project
        await Project.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Project and all its snippets deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get project statistics for current user
const getProjectStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalProjects = await Project.countDocuments({ owner: userId });
        const publicProjects = await Project.countDocuments({
            owner: userId,
            isPublic: true
        });
        const totalSnippets = await CodeSnippet.countDocuments({ owner: userId });

        // Get snippets by language
        const snippetsByLanguage = await CodeSnippet.aggregate([
            { $match: { owner: userId } },
            { $group: { _id: '$language', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        // Get recent projects
        const recentProjects = await Project.find({ owner: userId })
            .sort({ updatedAt: -1 })
            .limit(5)
            .select('name icon color updatedAt');

        res.status(200).json({
            message: 'Statistics retrieved successfully',
            stats: {
                totalProjects,
                publicProjects,
                totalSnippets,
                snippetsByLanguage,
                recentProjects
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get ALL projects statistics (Admin only)
const getAllProjectStats = async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments({});
        const publicProjects = await Project.countDocuments({ isPublic: true });
        const privateProjects = await Project.countDocuments({ isPublic: false });
        const totalSnippets = await CodeSnippet.countDocuments({});

        // Get projects by owner count
        const projectsByOwner = await Project.aggregate([
            { $group: { _id: '$owner', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'ownerInfo'
                }
            },
            { $unwind: '$ownerInfo' },
            {
                $project: {
                    _id: 1,
                    count: 1,
                    username: '$ownerInfo.username',
                    email: '$ownerInfo.email'
                }
            }
        ]);

        // Get snippets by language (all users)
        const snippetsByLanguage = await CodeSnippet.aggregate([
            { $group: { _id: '$language', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        // Get projects by tag
        const projectsByTag = await Project.aggregate([
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        // Get recent projects (all users)
        const recentProjects = await Project.find({})
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('owner', 'username email')
            .select('name icon color createdAt owner');

        res.status(200).json({
            message: 'All projects statistics retrieved successfully',
            stats: {
                totalProjects,
                publicProjects,
                privateProjects,
                totalSnippets,
                projectsByOwner,
                snippetsByLanguage,
                projectsByTag,
                recentProjects
            }
        });
    } catch (error) {
        console.error('Error fetching all project stats:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProject,
    getMyProjects,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectStats,
    getAllProjectStats
};