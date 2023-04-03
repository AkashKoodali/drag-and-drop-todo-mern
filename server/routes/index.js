const express = require( 'express');
const checkAuth = require('../utils/checkAuth.js') ;
const authRoutes = require('./auth.js') ;
const usersRoutes = require( './users.js');
const tasksRoutes = require( './tasks.js');

const router = express.Router();

// authentication
router.use('/auth', authRoutes);

// for user actions
router.use('/users', checkAuth, usersRoutes);

// for task actions
router.use('/tasks', checkAuth, tasksRoutes);

module.exports = router;