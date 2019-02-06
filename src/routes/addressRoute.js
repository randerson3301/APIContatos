const express = require('express');
const router = express.Router();

const controller = require('../controller/addressController');
router.get('/:con_id', controller.get);
router.get('/u/:user_id', controller.getUserAddress);
module.exports = router;