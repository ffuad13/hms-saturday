const express = require('express')
const {GetAllData, GetDataById} = require('../controllers/product_controller')

const router = express.Router()

router.get('/all', GetAllData)
router.get('/:idloe', GetDataById)

module.exports = router