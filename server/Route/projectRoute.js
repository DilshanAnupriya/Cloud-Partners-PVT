const express = require('express');
const router = express.Router();
const {
    createProject,
    getMyProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectStats
} = require('../Controller/ProjectController');
const verifyToken = require('../middleware/auth');
// All routes require an authentication
router.use(verifyToken());

// Project routes
router.post('/projects',verifyToken(['User', 'Admin']), createProject);
router.get('/projects',verifyToken(['User', 'Admin']), getMyProjects);
router.get('/projects/stats',verifyToken(['User', 'Admin']), getProjectStats);
router.get('/projects/:id',verifyToken(['User', 'Admin']), getProjectById);
router.put('/projects/:id',verifyToken(['User', 'Admin']), updateProject);
router.delete('/projects/:id',verifyToken(['User', 'Admin']), deleteProject);

module.exports = router;