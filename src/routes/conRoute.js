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

router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
module.exports = router;