const router = require('express').Router();

router.use('/centres', require('./centres'));
router.use('/comments', require('./comments'));
router.use('/courses', require('./courses'));
router.use('/leads', require('./leads'));
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));

module.exports = router;