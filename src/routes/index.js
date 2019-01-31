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
    
   /*
    global.connection.query('SELECT * from tbl_users', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
    */
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
        global.connection.query(`SELECT * from tbl_contacts WHERE id_user = ${id}`, function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            
        });
        
    });
 });
module.exports = router;
