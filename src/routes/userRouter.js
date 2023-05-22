const express = require('express');
const userController = require('../controllers/userController');
const middleware = require('../middleware/authorization')

const router = express.Router();

router.get('/users', middleware.verifyToken, middleware.verifyAdmin, userController.user);
router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/getuser/:id', userController.getUser)
router.get('/getme', middleware.verifyToken, userController.getMe)

module.exports = router;
