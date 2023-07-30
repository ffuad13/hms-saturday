const express = require("express")
const {allProduct, productById} = require("../controllers/product.controller")
const {verifyToken} = require('../middlewares/verifyToken')

const router = express.Router()

router.get('/', verifyToken, allProduct)
router.get('/:productId', verifyToken, productById)

module.exports = router