const router = require("express").Router();
const { getUserInfo, updateUser } = require('../controllers/users.js');

router.get('/me', getUserInfo);
router.put('/me', updateUser);

module.exports = router;