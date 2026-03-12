const express = require('express');
const { getProjects, getProject, createProject, updateProject } = require('../controllers/projectController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getProjects);
router.get('/:id', getProject);

// Admin only routes
router.post('/', restrictTo('admin'), createProject);
router.patch('/:id', restrictTo('admin'), updateProject);

module.exports = router;
