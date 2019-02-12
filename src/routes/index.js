const express = require('express');
const router = express.Router();
//invocando o modulo body-parser que permite trabalhar com dados via POST
const bodyParser = require('body-parser');

//config body-parser
router.use(bodyParser.json()); //suporta os dados dos bodies do json
router.use(bodyParser.urlencoded({extended: true})); //suporta bodies encoded

router.get('/', function(req, res, next){
   
    res.status(200).send({
        title: "API de Contatos",
        version: "0.0.2",
        endpoints: {
            "/": "API index(this page)",
            "/contacts": "where you can se the contacts",
            "/contacts/id": "view the contact individually(selected by id)",
            "/address/id": "you can see the contact address",
            "/phones/id": "you can see the contact phone"
        }
    });
});

module.exports = router;
