const express = require( 'express');
const checkAuth = require('../utils/checkAuth.js') ;
const authRoutes = require('./auth.js') ;
const usersRoutes = require( './users.js');
const tasksRoutes = require( './tasks.js');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', checkAuth, usersRoutes);
router.use('/tasks', checkAuth, tasksRoutes);

module.exports = router;