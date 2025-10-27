const CodeSnippet = require('../Model/CodeSnippetModel');
const Project = require('../Model/ProjectModel');

// Create a new code snippet
const createSnippet = async (req, res) => {
    try {
        // Add this at the very beginning
        if (!req.user) {
            console.error('❌ No user in request');
            return res.status(401).json({
                error: 'Authentication required. Please log in.'
            });
        }

        console.log('✅ User authenticated:', req.user._id);

        const { title, description, code, language, project, tags, notes, isPublic, isFavorite } = req.body;

        // Validation
        if (!title || !code || !project) {
            return res.status(400).json({
                error: 'Title, code, and project are required'
            });
        }

        // Verify project exists and user owns it
        const projectDoc = await Project.findById(project);
        if (!projectDoc) {
            return res.status(404).json({ error: 'Project not found' });
        }

        console.log('📁 Project owner:', projectDoc.owner.toString());
        console.log('👤 Current user:', req.user._id.toString());

        if (projectDoc.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                error: 'You can only add snippets to your own projects'
            });
        }

        const snippet = new CodeSnippet({
            title: title.trim(),
            description: description?.trim(),
            code,
            language: language || 'javascript',
            project,
            owner: req.user._id,
            tags: tags || [],
            notes: notes?.trim(),
            isPublic: isPublic || false,
            isFavorite: isFavorite || false
        });

        await snippet.save();

        // Update project's snippet count
        await Project.findByIdAndUpdate(project, {
            $inc: { snippetCount: 1 }
        });

        const populatedSnippet = await CodeSnippet.findById(snippet._id)
            .populate('project', 'name icon color')
            .populate('owner', 'username email');

        res.status(201).json({
            message: 'Code snippet created successfully',
            snippet: populatedSnippet
        });
    } catch (error) {
        console.error('❌ Error creating snippet:', error);
        res.status(500).json({
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
// Get all snippets for a project
const getProjectSnippets = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { search, language, favorite, sortBy = 'createdAt', order = 'desc' } = req.query;

        // Verify project access
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (project.owner.toString() !== req.user._id.toString() && !project.isPublic) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const filter = { project: projectId };

        // Search filter
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } }
            ];
        }

        // Language filter
        if (language) {
            filter.language = language;
        }

        // Favorite filter
        if (favorite === 'true') {
            filter.isFavorite = true;
        }

        const sortOrder = order === 'asc' ? 1 : -1;

        const snippets = await CodeSnippet.find(filter)
            .sort({ [sortBy]: sortOrder })
            .populate('project', 'name icon color')
            .populate('owner', 'username email');

        res.status(200).json({
            message: 'Snippets retrieved successfully',
            snippets,
            count: snippets.length
        });
    } catch (error) {
        console.error('Error fetching snippets:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get all snippets for current user
const getMySnippets = async (req, res) => {
    try {
        const { search, language, project, favorite, sortBy = 'createdAt', order = 'desc' } = req.query;

        const filter = { owner: req.user._id };

        // Search filter
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } }
            ];
        }

        // Language filter
        if (language) {
            filter.language = language;
        }

        // Project filter
        if (project) {
            filter.project = project;
        }

        // Favorite filter
        if (favorite === 'true') {
            filter.isFavorite = true;
        }

        const sortOrder = order === 'asc' ? 1 : -1;

        const snippets = await CodeSnippet.find(filter)
            .sort({ [sortBy]: sortOrder })
            .populate('project', 'name icon color')
            .populate('owner', 'username email');

        res.status(200).json({
            message: 'Your snippets retrieved successfully',
            snippets,
            count: snippets.length
        });
    } catch (error) {
        console.error('Error fetching snippets:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get single snippet by ID
const getSnippetById = async (req, res) => {
    try {
        const { id } = req.params;

        const snippet = await CodeSnippet.findById(id)
            .populate('project', 'name icon color')
            .populate('owner', 'username email');

        if (!snippet) {
            return res.status(404).json({ error: 'Snippet not found' });
        }

        // Check access
        if (snippet.owner._id.toString() !== req.user._id.toString() && !snippet.isPublic) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Increment views if not owner
        if (snippet.owner._id.toString() !== req.user._id.toString()) {
            snippet.views += 1;
            await snippet.save();
        }

        res.status(200).json({
            message: 'Snippet retrieved successfully',
            snippet
        });
    } catch (error) {
        console.error('Error fetching snippet:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update snippet
const updateSnippet = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, code, language, tags, notes, isPublic, isFavorite } = req.body;

        const snippet = await CodeSnippet.findById(id);

        if (!snippet) {
            return res.status(404).json({ error: 'Snippet not found' });
        }

        // Check ownership
        if (snippet.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Update fields
        if (title) snippet.title = title.trim();
        if (description !== undefined) snippet.description = description?.trim();
        if (code) snippet.code = code;
        if (language) snippet.language = language;
        if (tags) snippet.tags = tags;
        if (notes !== undefined) snippet.notes = notes?.trim();
        if (isPublic !== undefined) snippet.isPublic = isPublic;
        if (isFavorite !== undefined) snippet.isFavorite = isFavorite;

        await snippet.save();

        const populatedSnippet = await CodeSnippet.findById(snippet._id)
            .populate('project', 'name icon color')
            .populate('owner', 'username email');

        res.status(200).json({
            message: 'Snippet updated successfully',
            snippet: populatedSnippet
        });
    } catch (error) {
        console.error('Error updating snippet:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete snippet
const deleteSnippet = async (req, res) => {
    try {
        const { id } = req.params;

        const snippet = await CodeSnippet.findById(id);

        if (!snippet) {
            return res.status(404).json({ error: 'Snippet not found' });
        }

        // Check ownership
        if (snippet.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Update project's snippet count
        await Project.findByIdAndUpdate(snippet.project, {
            $inc: { snippetCount: -1 }
        });

        await CodeSnippet.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Snippet deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting snippet:', error);
        res.status(500).json({ error: error.message });
    }
};

// Toggle favorite status
const toggleFavorite = async (req, res) => {
    try {
        const { id } = req.params;

        const snippet = await CodeSnippet.findById(id);

        if (!snippet) {
            return res.status(404).json({ error: 'Snippet not found' });
        }

        // Check ownership
        if (snippet.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        snippet.isFavorite = !snippet.isFavorite;
        await snippet.save();

        res.status(200).json({
            message: `Snippet ${snippet.isFavorite ? 'added to' : 'removed from'} favorites`,
            isFavorite: snippet.isFavorite
        });
    } catch (error) {
        console.error('Error toggling favorite:', error);
        res.status(500).json({ error: error.message });
    }
};

// Duplicate snippet
const duplicateSnippet = async (req, res) => {
    try {
        const { id } = req.params;

        const originalSnippet = await CodeSnippet.findById(id);

        if (!originalSnippet) {
            return res.status(404).json({ error: 'Snippet not found' });
        }

        // Check ownership
        if (originalSnippet.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const duplicatedSnippet = new CodeSnippet({
            title: `${originalSnippet.title} (Copy)`,
            description: originalSnippet.description,
            code: originalSnippet.code,
            language: originalSnippet.language,
            project: originalSnippet.project,
            owner: req.user._id,
            tags: originalSnippet.tags,
            notes: originalSnippet.notes,
            isPublic: false,
            isFavorite: false
        });

        await duplicatedSnippet.save();

        // Update project's snippet count
        await Project.findByIdAndUpdate(originalSnippet.project, {
            $inc: { snippetCount: 1 }
        });

        const populatedSnippet = await CodeSnippet.findById(duplicatedSnippet._id)
            .populate('project', 'name icon color')
            .populate('owner', 'username email');

        res.status(201).json({
            message: 'Snippet duplicated successfully',
            snippet: populatedSnippet
        });
    } catch (error) {
        console.error('Error duplicating snippet:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSnippet,
    getProjectSnippets,
    getMySnippets,
    getSnippetById,
    updateSnippet,
    deleteSnippet,
    toggleFavorite,
    duplicateSnippet
};