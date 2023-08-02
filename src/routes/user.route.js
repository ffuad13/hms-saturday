const express = require("express")
const {create, login, update, deleteUser, uploadPic, changepassword} = require("../controllers/user.controller")
const {verifyToken} = require('../middlewares/verifyToken')
const multer = require('multer')

//middleware upload
const uploadFotoDir = `${process.cwd()}/upload`
const uploadDocDir = `${process.cwd()}/dokumen`
const uploadFoto = multer({dest: uploadFotoDir})
const uploadDoc = multer({dest: uploadDocDir})

const router = express.Router()

router.post('/register', create)
router.post('/login', login)
router.put('/update', verifyToken, update)
router.delete('/delete', verifyToken, deleteUser)

router.post('/uploadfoto', verifyToken, uploadFoto.single('profilepic'), uploadPic)
router.put('/changepassword', verifyToken, changepassword)

module.exports = router