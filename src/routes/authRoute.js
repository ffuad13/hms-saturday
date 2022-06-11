const express = require('express')
const useValidator = require('../middlewares/validators')
const authController = require('../controllers/authController')
const router = express.Router()

router.post('/register', useValidator.registerValidator, authController.register)
router.post('/login', authController.login)

module.exports = router