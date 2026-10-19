const express = require('express');
const userController = require('../controllers/userController');
const { requireLogin } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/dashboard'));

router.get('/dashboard', requireLogin, userController.showDashboard);
router.get('/me', requireLogin, userController.getMe);

module.exports = router;
