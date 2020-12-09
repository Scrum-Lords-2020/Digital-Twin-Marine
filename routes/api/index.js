const router = require('express').Router();
const userRoutes = require('./users');
const vesselRoutes = require('./vessels');
const path = require('path');

router.use('/api/users', userRoutes);
router.use('/api/vessels', vesselRoutes);

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;