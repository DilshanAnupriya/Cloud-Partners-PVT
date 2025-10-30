const express = require('express');
const router = express.Router();
const pm = require('../controller/PmContoller');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../config/multer');
const verifyToken = require("../Middleware/Auth");

// Protect all routes (require authentication)


// Basic CRUD Operations
router.post('/', verifyToken(['BA','PM','Admin']), pm.createProject);

router.get('/',verifyToken(['BA','PM','Sales','Developer','Admin']), pm.getAllProjects);

router.get('/:id',verifyToken(['BA','PM','Sales','Developer','Admin']), pm.getProjectById);

router.put('/:id', verifyToken(['BA','PM','Developer','Admin']), pm.updateProject);

router.delete('/:id', verifyToken(['Admin']), pm.deleteProject);

// Stage Management
router.post('/:id/requirement-gathering', verifyToken(['BA','PM','Developer','Admin']), pm.moveToRequirementGathering);

router.post('/:id/handover-pm', verifyToken(['BA','PA','Admin']), pm.handoverToPM);

router.post('/:id/assign-developers', verifyToken(['BA','PM','Admin']), pm.assignDevelopers);

// Progress Updates
router.post('/:id/progress', verifyToken(['Developer','Admin']), pm.updateProgress);

// Task Management
router.post('/:id/tasks', verifyToken(['BA','PM','Admin']), pm.addTask);

router.put('/:id/tasks/:taskId', verifyToken(['BA','PM','Developer','Admin']), pm.updateTaskStatus);

// Document Management
router.post('/:id/documents', upload.single('document'), pm.uploadDocument);

router.post('/:id/documents/multiple', upload.array('documents', 10), pm.uploadMultipleDocuments);

router.delete('/:id/documents/:documentId', verifyToken(['BA','PM','Admin']), pm.deleteDocument);

router.get('/:id/documents/:documentId/download', pm.downloadDocument);

// Roadmap Management
router.post('/:id/roadmap', verifyToken(['BA','PM','Admin']), pm.addRoadmapMilestone);

router.put('/:id/roadmap/:milestoneId', verifyToken(['BA','PM','Developer','Admin']), pm.updateRoadmapMilestone);

module.exports = router;