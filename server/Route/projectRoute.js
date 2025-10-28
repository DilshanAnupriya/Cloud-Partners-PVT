const express = require('express');
const router = express.Router();
const {
    createProject,
    getMyProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectStats,
    getAllProjectStats,
    getAllProjects
} = require('../Controller/ProjectController');
const verifyToken = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken());

// IMPORTANT: Specific routes MUST come before dynamic routes
// Stats routes (before /projects/:id)
router.get('/projects/stats/all', verifyToken(['Developer', 'Admin']), getAllProjectStats);
router.get('/projects/stats', verifyToken(['Developer', 'Admin']), getProjectStats);

// All projects route (before /projects/:id)
router.get('/projects/all', verifyToken(['Developer', 'Admin']), getAllProjects);

// Project CRUD routes
router.post('/projects', verifyToken(['Developer', 'Admin']), createProject);
router.get('/projects', verifyToken(['Developer', 'Admin']), getMyProjects);

// Dynamic routes come LAST
router.get('/projects/:id', verifyToken(['Developer', 'Admin']), getProjectById);
router.put('/projects/:id', verifyToken(['Developer', 'Admin']), updateProject);
router.delete('/projects/:id', verifyToken(['Developer', 'Admin']), deleteProject);

module.exports = router;