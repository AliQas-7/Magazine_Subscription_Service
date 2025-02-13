const express = require('express');
const { register, login, resetPassword } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware to verify JWT

const router = express.Router();

// Routes
router.post('/register', register);              // User registration
router.post('/login', login);                   // User login
router.post('/reset-password', authMiddleware, resetPassword); // Secure password reset

module.exports = router;
