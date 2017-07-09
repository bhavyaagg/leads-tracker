var router = require('express').Router();
router.use('/centres', require('./centres'));
router.use('/comments', require('./comments'));
router.use('/courses', require('./courses'));
router.use('/leads', require('./leads'));
router.use('/users', require('./users'));
module.exports = router;
//# sourceMappingURL=index.js.map