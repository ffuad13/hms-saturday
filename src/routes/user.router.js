const express = require('express');
const Controller = require('../controllers/user.controller');
const middleware = require('../middleware/middleware')

const router = express.Router();

router.get('/user', Controller.getUser);
router.post('/register', Controller.register)
router.get('/userdetail/:id', middleware.verifyToken, Controller.getDetailUser)
router.delete('/userdelete/:id', Controller.deleteUser)
router.put('/userupdate/:id', Controller.updateUser)
router.post('/login', Controller.login)

module.exports = router;
