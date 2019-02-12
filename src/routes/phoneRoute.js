const express = require('express');
const router = express.Router();

const controller = require('../controller/phoneController');
router.get('/:con_id', controller.getConPhone);
router.get('/u/:user_id', controller.getUserPhone);
router.post('/c/insert', controller.insertContactPhone);
router.post('/u/insert', controller.insertUserPhone);
router.get('/delete/:obj/:id', controller.delete);
router.post('/obj/update', controller.update);
module.exports = router;