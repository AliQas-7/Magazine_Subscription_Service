const express = require('express');
const { getMagazines } = require('../controllers/MagazineController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.use(authMiddleware); // Protect all magazine-related routes
router.get('/', getMagazines); // Get list of magazines with plans

module.exports = router;
