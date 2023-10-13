const express = require('express')
const { CreateUser, GetUsers, UpdateUser, DeleteUser, Login, GetProfile, UploadPic } = require('../controllers/user.controller')
const {ValidateCreateUser, ValidateLogin} = require('../middlewares/validator')
const {verifyJWT} = require('../middlewares/verifyToken')
const { uploadProfile } = require('../middlewares/multer')

const router = express.Router()

router.post('/create', ValidateCreateUser, CreateUser)
router.get('/getuser', verifyJWT, GetUsers)
router.put('/update', UpdateUser)
router.delete('/delete', DeleteUser)

router.post('/login', ValidateLogin, Login)
router.get('/profile', verifyJWT, GetProfile)

router.put('/uploadfoto', verifyJWT, uploadProfile.single('foto'), UploadPic)

module.exports = router