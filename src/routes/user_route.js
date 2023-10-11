const express = require('express')
const { CreateUser, GetUsers, UpdateUser, DeleteUser, Login } = require('../controllers/user.controller')

const router = express.Router()

router.post('/create', CreateUser)
router.get('/getuser', GetUsers)
router.put('/update', UpdateUser)
router.delete('/delete', DeleteUser)

router.post('/login', Login)

module.exports = router