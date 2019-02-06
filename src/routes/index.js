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
            "/address/id": "you can see the contact address"
        }
    });
});
/*
//view phone data of the contact
router.get('/contacts/:con_id/phone', function(req, res){
    const con_id = req.params.con_id;
    
    //getting phone data
    global.connection.query(`SELECT * FROM tbl_telefone WHERE id_con = ${con_id}`,
    function(error, result){
        if(error) throw error;
        res.send(JSON.stringify({"status":200, "error":null, "response":result}));
    });
});
*/
module.exports = router;
