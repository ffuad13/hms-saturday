const express = require("express")
const {create, login} = require("../controllers/user.controller")

const router = express.Router()

router.post('/', create)
router.post('/login', login)

module.exports = router