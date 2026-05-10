const express = require('express');
const router = express.Router();
const { signup, login, logout, forgotPassword } = require('../controllers/auth.controller');

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/logout
router.post('/logout', logout);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

module.exports = router;
