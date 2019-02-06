const express = require('express');
const router = express.Router();

const controller = require('../controller/phoneController');
router.get('/:con_id', controller.getConPhone);
router.get('/u/:user_id', controller.getUserPhone);
module.exports = router;