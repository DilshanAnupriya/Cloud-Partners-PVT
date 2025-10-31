const Pm = require('../Model/PmSchema');
const User = require('../Model/UserModel');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Send notification email
const sendNotificationEmail = async (to, subject, message) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: message
        });
    } catch (error) {
        console.error('Email sending failed:', error);
    }
};

// Create Project
exports.createProject = async (req, res) => {
    try {
        const { name, description, client, salesperson, startDate, estimatedEndDate } = req.body;

        const project = new Pm({
            name,
            description,
            client,
            salesperson,
            startDate,
            estimatedEndDate,
            stage: 'sales',
            stageHistory: [{
                stage: 'sales',
                changedBy: req.user.id
            }]
        });

        await project.save();
        await project.populate('salesperson', 'username email');

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating project',
            error: error.message
        });
    }
};

// Get All Projects
exports.getAllProjects = async (req, res) => {
    try {
        const { stage, isActive } = req.query;
        const filter = {};

        if (stage) filter.stage = stage;
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        const projects = await Pm.find(filter)
            .populate('salesperson', 'username email')
            .populate('projectManager', 'username email')
            .populate('businessAnalyst', 'username email')
            .populate('developers', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching projects',
            error: error.message
        });
    }
};

// FIX: Get Single Project - Fixed populate paths
exports.getProjectById = async (req, res) => {
    try {
        const project = await Pm.findById(req.params.id)
            .populate('salesperson', 'username email role')
            .populate('projectManager', 'username email role')
            .populate('businessAnalyst', 'username email role')
            .populate('developers', 'username email role')
            .populate('tasks.assignedTo', 'username email')
            .populate('progressUpdates.createdBy', 'username email')  // ✅ FIXED: Changed from developer to createdBy
            .populate('documents.uploadedBy', 'username email')
            .populate('stageHistory.changedBy', 'username email');

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching project',
            error: error.message
        });
    }
};

// Update Project (Basic info)
exports.updateProject = async (req, res) => {
    try {
        const project = await Pm.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('salesperson projectManager businessAnalyst developers');

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating project',
            error: error.message
        });
    }
};

// Update Stage - Single unified endpoint
exports.updateStage = async (req, res) => {
    try {
        const { stage } = req.body;
        const project = await Pm.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        // Update stage
        project.stage = stage;
        project.stageHistory.push({
            stage: stage,
            changedBy: req.user.id
        });

        await project.save();
        await project.populate('salesperson projectManager businessAnalyst developers');

        res.status(200).json({ 
            success: true, 
            message: 'Stage updated successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Assign Team Members - Single unified endpoint
exports.assignTeamMembers = async (req, res) => {
    try {
        const { projectManager, businessAnalyst, developers } = req.body;
        const project = await Pm.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        // Update team members
        if (projectManager) project.projectManager = projectManager;
        if (businessAnalyst) project.businessAnalyst = businessAnalyst;
        if (developers && Array.isArray(developers)) project.developers = developers;

        await project.save();
        await project.populate('projectManager businessAnalyst developers', 'username email');

        // Send notification emails
        if (projectManager) {
            const pm = await User.findById(projectManager);
            if (pm) {
                await sendNotificationEmail(
                    pm.email,
                    'New Project Assignment - Project Manager',
                    `<h3>Project: ${project.name}</h3>
                    <p>You have been assigned as the Project Manager.</p>
                    <p>Client: ${project.client}</p>`
                );
            }
        }

        if (businessAnalyst) {
            const ba = await User.findById(businessAnalyst);
            if (ba) {
                await sendNotificationEmail(
                    ba.email,
                    'New Project Assignment - Business Analyst',
                    `<h3>Project: ${project.name}</h3>
                    <p>You have been assigned as the Business Analyst.</p>
                    <p>Client: ${project.client}</p>`
                );
            }
        }

        if (developers && developers.length > 0) {
            for (const devId of developers) {
                const dev = await User.findById(devId);
                if (dev) {
                    await sendNotificationEmail(
                        dev.email,
                        'New Project Assignment - Developer',
                        `<h3>Project: ${project.name}</h3>
                        <p>You have been assigned to this project.</p>
                        <p>Client: ${project.client}</p>`
                    );
                }
            }
        }

        res.status(200).json({ 
            success: true, 
            message: 'Team members assigned successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete Project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Pm.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting project',
            error: error.message
        });
    }
};

// Add Progress Update
exports.addProgressUpdate = async (req, res) => {
    try {
        const { title, description } = req.body;
        const project = await Pm.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        project.progressUpdates.push({
            title,
            description,
            createdBy: req.user.id
        });

        await project.save();
        await project.populate('progressUpdates.createdBy', 'username email');

        res.status(200).json({ 
            success: true, 
            message: 'Progress update added successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Add Task
exports.addTask = async (req, res) => {
    try {
        const { title, description, assignedTo, priority, dueDate } = req.body;
        const project = await Pm.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        project.tasks.push({
            title,
            description,
            assignedTo,
            priority: priority || 'medium',
            dueDate,
            status: 'pending'
        });

        await project.save();
        await project.populate('tasks.assignedTo', 'username email');

        // Send email notification
        if (assignedTo) {
            const developer = await User.findById(assignedTo);
            if (developer) {
                await sendNotificationEmail(
                    developer.email,
                    'New Task Assignment',
                    `<h3>Project: ${project.name}</h3>
                    <p><strong>Task:</strong> ${title}</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <p><strong>Due Date:</strong> ${dueDate}</p>`
                );
            }
        }

        res.status(200).json({ 
            success: true, 
            message: 'Task added successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update Task Status
exports.updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        const project = await Pm.findOne({ 'tasks._id': taskId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        const task = project.tasks.id(taskId);
        task.status = status;

        if (status === 'completed') {
            task.completedAt = new Date();
        }

        await project.save();
        await project.populate('tasks.assignedTo', 'username email');

        res.status(200).json({ 
            success: true, 
            message: 'Task status updated successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Upload Document
exports.uploadDocument = async (req, res) => {
    try {
        const project = await Pm.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        const fileUrl = `/uploads/documents/${req.file.filename}`;

        project.documents.push({
            name: req.file.originalname,
            url: fileUrl,
            fileName: req.file.filename,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            uploadedBy: req.user.id
        });

        await project.save();
        await project.populate('documents.uploadedBy', 'username email');

        res.status(200).json({
            success: true,
            message: 'Document uploaded successfully',
            data: project
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Upload Multiple Documents
exports.uploadMultipleDocuments = async (req, res) => {
    try {
        const project = await Pm.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'Please upload at least one file' });
        }

        const uploadedDocs = req.files.map(file => ({
            name: file.originalname,
            url: `/uploads/documents/${file.filename}`,
            fileName: file.filename,
            fileSize: file.size,
            mimeType: file.mimetype,
            uploadedBy: req.user.id
        }));

        project.documents.push(...uploadedDocs);

        await project.save();
        await project.populate('documents.uploadedBy', 'username email');

        res.status(200).json({
            success: true,
            message: `${req.files.length} document(s) uploaded successfully`,
            data: project
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete Document
exports.deleteDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const project = await Pm.findOne({ 'documents._id': documentId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        const document = project.documents.id(documentId);
        const filePath = path.join(__dirname, '..', document.url);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        project.documents.pull(documentId);
        await project.save();

        res.status(200).json({
            success: true,
            message: 'Document deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Download Document
exports.downloadDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const project = await Pm.findOne({ 'documents._id': documentId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        const document = project.documents.id(documentId);
        const filePath = path.join(__dirname, '..', document.url);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ success: false, message: 'File not found on server' });
        }

        res.download(filePath, document.name);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Add Roadmap Milestone
exports.addRoadmapMilestone = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const project = await Pm.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        project.roadmap.push({
            title,
            description,
            dueDate,
            status: 'pending'
        });

        await project.save();

        res.status(200).json({ 
            success: true, 
            message: 'Milestone added successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update Roadmap Milestone Status
exports.updateRoadmapMilestoneStatus = async (req, res) => {
    try {
        const { milestoneId } = req.params;
        const { status } = req.body;

        const project = await Pm.findOne({ 'roadmap._id': milestoneId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Milestone not found' });
        }

        const milestone = project.roadmap.id(milestoneId);
        milestone.status = status;

        if (status === 'completed') {
            milestone.completedAt = new Date();
        }

        await project.save();

        res.status(200).json({ 
            success: true, 
            message: 'Milestone status updated successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update Progress Update
exports.updateProgressUpdate = async (req, res) => {
    try {
        const { progressId } = req.params;
        const { title, description } = req.body;

        const project = await Pm.findOne({ 'progressUpdates._id': progressId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Progress update not found' });
        }

        const progressUpdate = project.progressUpdates.id(progressId);
        if (title) progressUpdate.title = title;
        if (description) progressUpdate.description = description;

        await project.save();
        await project.populate('progressUpdates.createdBy', 'username email');

        res.status(200).json({ 
            success: true, 
            message: 'Progress update updated successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete Progress Update
exports.deleteProgressUpdate = async (req, res) => {
    try {
        const { progressId } = req.params;

        const project = await Pm.findOne({ 'progressUpdates._id': progressId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Progress update not found' });
        }

        project.progressUpdates.pull(progressId);
        await project.save();

        res.status(200).json({ 
            success: true, 
            message: 'Progress update deleted successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update Roadmap Milestone
exports.updateRoadmapMilestone = async (req, res) => {
    try {
        const { milestoneId } = req.params;
        const { title, description, dueDate } = req.body;

        const project = await Pm.findOne({ 'roadmap._id': milestoneId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Milestone not found' });
        }

        const milestone = project.roadmap.id(milestoneId);
        if (title) milestone.title = title;
        if (description) milestone.description = description;
        if (dueDate) milestone.dueDate = dueDate;

        await project.save();

        res.status(200).json({ 
            success: true, 
            message: 'Milestone updated successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete Roadmap Milestone
exports.deleteRoadmapMilestone = async (req, res) => {
    try {
        const { milestoneId } = req.params;

        const project = await Pm.findOne({ 'roadmap._id': milestoneId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Milestone not found' });
        }

        project.roadmap.pull(milestoneId);
        await project.save();

        res.status(200).json({ 
            success: true, 
            message: 'Milestone deleted successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, assignedTo, priority, dueDate } = req.body;

        const project = await Pm.findOne({ 'tasks._id': taskId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        const task = project.tasks.id(taskId);
        if (title) task.title = title;
        if (description) task.description = description;
        if (assignedTo) task.assignedTo = assignedTo;
        if (priority) task.priority = priority;
        if (dueDate) task.dueDate = dueDate;

        await project.save();
        await project.populate('tasks.assignedTo', 'username email');

        res.status(200).json({ 
            success: true, 
            message: 'Task updated successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const project = await Pm.findOne({ 'tasks._id': taskId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        project.tasks.pull(taskId);
        await project.save();

        res.status(200).json({ 
            success: true, 
            message: 'Task deleted successfully',
            data: project 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};