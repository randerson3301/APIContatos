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
            "/contacts/id": "view the contact individually(selected by id)"
        }
    });
});
//dados dos contatos
router.post('/contacts', function(req, res, next){
    //getting post data
    const login_name = req.body.login;
    const password = req.body.password;

    //getting user id
    global.connection.query(`SELECT id_user FROM tbl_users WHERE c_loginname = 
        '${login_name}' AND c_senha = '${password}'`, function(error, user, fields){
            if (error) throw error;
        /*
            para pegar o valor do id do user é necessario acessar o RowDataPacket(user param), depois a pos 0 
            dentro do array retornado, e em seguida a propriedade id_user que só aparece via JSON
        */ 
        const id = user[0].id_user;
       
        //getting contacts by user_id
        global.connection.query(`SELECT * FROM tbl_contacts WHERE id_user = ${id}`, 
            function (error, results, fields) {
                if (error) throw error;
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            });
         });
 });
//view contact data by the id
router.get('/contacts/:con_id', function(req, res, next){
    const con_id = req.params.con_id; //getting contact id from the URL

    //getting data from the contact
    global.connection.query(`SELECT * FROM tbl_contacts WHERE id_con = ${con_id}`,
        function(error, result, fields){
            if(error) throw error;
            res.send(JSON.stringify({"status":200, "error": null, "response": result}));
        });
});
//view address data of the contact by id
router.get('/contacts/:con_id/address', function(req, res){
    const con_id = req.params.con_id;

    //getting contact address
    global.connection.query(`SELECT * FROM tbl_enderecos WHERE id_con = ${con_id}`,
        function(error, result, fields){
            if(error) throw error;
            res.send(JSON.stringify({"status":200, "error": null, "response":result}));
        });
});

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
module.exports = router;
