const express = require('express');
const router = express.Router();
const pm = require('../Controller/PmContoller');
const upload = require('../Config/multer');
const verifyToken = require("../Middleware/Auth");

// Basic CRUD Operations
router.post('/', verifyToken(['Sales','BA','PM','Admin']), pm.createProject);
router.get('/', verifyToken(['BA','PM','Sales','Developer','Admin']), pm.getAllProjects);
router.get('/:id', verifyToken(['BA','PM','Sales','Developer','Admin']), pm.getProjectById);
router.put('/:id', verifyToken(['BA','PM','Developer','Admin']), pm.updateProject);
router.delete('/:id', verifyToken(['Admin']), pm.deleteProject);

// FIX: Stage Management - Unified endpoint
router.put('/:id/stage', verifyToken(['BA','PM','Admin']), pm.updateStage);

// FIX: Team Assignment - Unified endpoint
router.put('/:id/assign', verifyToken(['BA','PM','Admin']), pm.assignTeamMembers);

// FIX: Progress Updates
router.post('/:id/progress', verifyToken(['BA','PM','Developer','Admin']), pm.addProgressUpdate);

// Task Management
router.post('/:id/tasks', verifyToken(['BA','PM','Admin']), pm.addTask);
router.put('/:id/tasks/:taskId/status', verifyToken(['BA','PM','Developer','Admin']), pm.updateTaskStatus);

// FIX: Document Management - Added authentication to all routes
router.post('/:id/documents', verifyToken(['BA','PM','Developer','Admin']), upload.single('document'), pm.uploadDocument);
router.post('/:id/documents/multiple', verifyToken(['BA','PM','Developer','Admin']), upload.array('documents', 10), pm.uploadMultipleDocuments);
router.delete('/:id/documents/:documentId', verifyToken(['BA','PM','Admin']), pm.deleteDocument);
router.get('/:id/documents/:documentId/download', verifyToken(['BA','PM','Sales','Developer','Admin']), pm.downloadDocument);

// FIX: Roadmap Management
router.post('/:id/roadmap', verifyToken(['BA','PM','Admin']), pm.addRoadmapMilestone);
router.put('/:id/roadmap/:milestoneId/status', verifyToken(['BA','PM','Developer','Admin']), pm.updateRoadmapMilestoneStatus);
router.put('/:id/roadmap/:milestoneId', verifyToken(['BA','PM','Admin']), pm.updateRoadmapMilestone);
router.delete('/:id/roadmap/:milestoneId', verifyToken(['BA','PM','Admin']), pm.deleteRoadmapMilestone);

// Progress Update Management
router.put('/:id/progress/:progressId', verifyToken(['BA','PM','Developer','Admin']), pm.updateProgressUpdate);
router.delete('/:id/progress/:progressId', verifyToken(['BA','PM','Admin']), pm.deleteProgressUpdate);

// Task Management - Additional endpoints
router.put('/:id/tasks/:taskId', verifyToken(['BA','PM','Admin']), pm.updateTask);
router.delete('/:id/tasks/:taskId', verifyToken(['BA','PM','Admin']), pm.deleteTask);

module.exports = router;