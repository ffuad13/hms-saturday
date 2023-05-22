const express = require('express');
const Controller = require('../controllers/controller');

const router = express.Router();

router.get('/me', Controller.helloWorld);

module.exports = router;
