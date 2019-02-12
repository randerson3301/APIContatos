/*
    **********NOTES**********
    Esse arquivo representa os routes dos contatos,seu objetivo é
    fazer a conexão com o controller de contatos, e preparar para 
    ser exportado para o app.js que seria o main da API.
*/ 
const express = require('express');
const router = express.Router();

const controller = require('../controller/contactController');
router.post('/', controller.post);
router.get('/:con_id', controller.get);
router.post('/add', controller.insert);
router.get('/delete/:con_id', controller.delete);
router.post('/update', controller.update);
module.exports = router;