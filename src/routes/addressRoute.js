const express = require('express');
const router = express.Router();

const controller = require('../controller/addressController');
router.get('/:con_id', controller.get);
router.get('/u/:user_id', controller.getUserAddress);
router.post('/c/insert', controller.insertContactAddress);
router.post('/u/insert', controller.insertUserAddress);
router.get('/delete/:obj/:id', controller.delete);
router.post('/c/update', controller.updateContactAddress);
router.post('/u/update', controller.updateUserAddress);
module.exports = router;