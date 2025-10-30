const Project = require('../Model/PmSchema');
const User = require('../model/UserModel');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Email configuration (configure with your email service)
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

        const project = new Project({
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

        const projects = await Project.find(filter)
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

// Get Single Project
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('salesperson', 'username email role')
            .populate('projectManager', 'username email role')
            .populate('businessAnalyst', 'username email role')
            .populate('developers', 'username email role')
            .populate('tasks.assignedTo', 'username email')
            .populate('progressUpdates.developer', 'username email')
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

// Update Project
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
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

// Delete Project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

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

// Move to Requirement Gathering
exports.moveToRequirementGathering = async (req, res) => {
    try {
        const { businessAnalyst } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        if (project.stage !== 'sales') {
            return res.status(400).json({ success: false, message: 'Invalid stage transition' });
        }

        project.stage = 'requirement-gathering';
        project.businessAnalyst = businessAnalyst;
        project.stageHistory.push({
            stage: 'requirement-gathering',
            changedBy: req.user.id
        });

        await project.save();
        await project.populate('businessAnalyst', 'username email');

        // Send email to BA
        const ba = await User.findById(businessAnalyst);
        if (ba) {
            await sendNotificationEmail(
                ba.email,
                'New Project Assignment - Requirement Gathering',
                `<h3>Project: ${project.name}</h3>
                <p>You have been assigned to gather requirements for this project.</p>
                <p>Client: ${project.client}</p>`
            );
        }

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Handover to PM
exports.handoverToPM = async (req, res) => {
    try {
        const { projectManager } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        if (project.stage !== 'requirement-gathering') {
            return res.status(400).json({ success: false, message: 'Invalid stage transition' });
        }

        project.stage = 'handover-to-pm';
        project.projectManager = projectManager;
        project.stageHistory.push({
            stage: 'handover-to-pm',
            changedBy: req.user.id
        });

        await project.save();
        await project.populate('projectManager', 'username email');

        // Send email to PM
        const pm = await User.findById(projectManager);
        if (pm) {
            await sendNotificationEmail(
                pm.email,
                'New Project Assignment - Project Manager',
                `<h3>Project: ${project.name}</h3>
                <p>You have been assigned as the Project Manager for this project.</p>
                <p>Client: ${project.client}</p>
                <p>Please review and assign developers.</p>`
            );
        }

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Assign Developers
exports.assignDevelopers = async (req, res) => {
    try {
        const { developers } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        if (project.stage !== 'handover-to-pm') {
            return res.status(400).json({ success: false, message: 'Invalid stage transition' });
        }

        project.developers = developers;
        project.stage = 'assigned-to-developer';
        project.stageHistory.push({
            stage: 'assigned-to-developer',
            changedBy: req.user.id
        });

        await project.save();
        await project.populate('developers', 'username email');

        // Send emails to all developers
        for (const devId of developers) {
            const developer = await User.findById(devId);
            if (developer) {
                await sendNotificationEmail(
                    developer.email,
                    'New Project Assignment - Developer',
                    `<h3>Project: ${project.name}</h3>
                    <p>You have been assigned to develop this project.</p>
                    <p>Client: ${project.client}</p>
                    <p>Please check the project details and start working.</p>`
                );
            }
        }

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update Progress (by Developer)
exports.updateProgress = async (req, res) => {
    try {
        const { status, notes, percentage } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        project.progressUpdates.push({
            developer: req.user.id,
            status,
            notes,
            percentage
        });

        // If all developers mark as finished, move to finished stage
        if (status === 'finished') {
            const allFinished = project.developers.every(devId => {
                const lastUpdate = project.progressUpdates
                    .filter(u => u.developer.toString() === devId.toString())
                    .pop();
                return lastUpdate && lastUpdate.status === 'finished';
            });

            if (allFinished) {
                project.stage = 'finished';
                project.actualEndDate = new Date();
                project.stageHistory.push({
                    stage: 'finished',
                    changedBy: req.user.id
                });

                // Notify PM
                if (project.projectManager) {
                    const pm = await User.findById(project.projectManager);
                    await sendNotificationEmail(
                        pm.email,
                        'Project Completed',
                        `<h3>Project: ${project.name}</h3>
                        <p>All developers have completed their work.</p>
                        <p>The project is now finished.</p>`
                    );
                }
            }
        }

        await project.save();
        await project.populate('progressUpdates.developer', 'username email');

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Add Task
exports.addTask = async (req, res) => {
    try {
        const { title, description, assignedTo, dueDate } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        project.tasks.push({
            title,
            description,
            assignedTo,
            dueDate
        });

        await project.save();
        await project.populate('tasks.assignedTo', 'username email');

        // Send email to assigned developer
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

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update Task Status
exports.updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        const project = await Project.findOne({ 'tasks._id': taskId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        const task = project.tasks.id(taskId);
        task.status = status;

        if (status === 'completed') {
            task.completedAt = new Date();
        }

        await project.save();

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Upload Document
exports.uploadDocument = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        // File information
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
            data: project.documents[project.documents.length - 1]
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Upload Multiple Documents
exports.uploadMultipleDocuments = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'Please upload at least one file' });
        }

        // Add all uploaded files to project documents
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
            data: uploadedDocs
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete Document
exports.deleteDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const project = await Project.findOne({ 'documents._id': documentId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        const document = project.documents.id(documentId);

        // Delete file from filesystem
        const fs = require('fs');
        const filePath = path.join(__dirname, '..', document.url);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Remove document from array
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
        const project = await Project.findOne({ 'documents._id': documentId });

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
        const { milestone, description, targetDate } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        project.roadmap.push({
            milestone,
            description,
            targetDate
        });

        await project.save();

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update Roadmap Milestone
exports.updateRoadmapMilestone = async (req, res) => {
    try {
        const { milestoneId } = req.params;
        const { status } = req.body;

        const project = await Project.findOne({ 'roadmap._id': milestoneId });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Milestone not found' });
        }

        const milestone = project.roadmap.id(milestoneId);
        milestone.status = status;

        if (status === 'completed') {
            milestone.completedAt = new Date();
        }

        await project.save();

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};