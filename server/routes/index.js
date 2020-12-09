// routes/index.js
const router = require('express').Router();
const userRoutes = require('./api');
const path = require('path');

// API routes
router.use('/api/users', userRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../../client/src/index.html'));
});

module.exports = router;