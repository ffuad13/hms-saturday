const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authorization = require('../middlewares/authorization')

router.get('/me', authorization.verifyToken, userController.getDetailUser)
router.get('/all', authorization.verifyToken, authorization.verifyAdmin, userController.getAllUser)

router.put('/:id/update', authorization.verifyToken, authorization.userUpdateDeleteAuthorize, userController.updateUser)
router.delete('/:id/delete', authorization.verifyToken, authorization.userUpdateDeleteAuthorize, userController.deleteUser)

module.exports = router