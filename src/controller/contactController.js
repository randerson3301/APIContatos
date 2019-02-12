/*
    **********NOTES**********
    Esse arquivo representa o controller dos contatos, nele devem
    ficar toda a interação com o banco de dados bem como o
    output em JSON.
*/ 

//contact data by user
exports.post = (req, res, next) => {
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

        if(id == undefined){
            res.status(401).send({
                "status": 401,
                "causa": "Usuário não autenticado",
                "solucao":"Por favor, faça o login correntamente"
            });
        }
       
        //getting contacts by user_id
        global.connection.query(`SELECT * FROM tbl_contacts WHERE id_user = ${id}`, 
            function (error, results, fields) {
                if (error) throw error;
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            });
         });
    
    //res.status(201).send(`requisição recebida com sucesso`);
};
//contact data by id
exports.get = (req, res, next) => {
    const con_id = req.params.con_id; //getting contact id from the URL

    //getting data from the contact
    global.connection.query(`SELECT * FROM tbl_contacts WHERE id_con = 
    ${con_id}`,
        function(error, result, fields){
            if(error) throw error;
            res.send(JSON.stringify({"status":200, "error": null, "response": result}));
        });
};

//INSERT para cadastrar contato no banco de dados
exports.insert = (req, res, next) => {
   
    const name = req.body.name;
    const email = req.body.email;
    const dtnasc = req.body.dt_nasc;
    const img_con = req.body.img_con;
    const id_user = req.body.user_id;

    //inserting data in contact´s table
    global.connection.query(
        `INSERT INTO 
            tbl_contacts(c_nomecon, c_emailcon, d_datanasc,
                c_imgcon, id_user)
         VALUES(
             '${name}', '${email}', '${dtnasc}', '${img_con}', ${id_user}
             )`,
             function (error, contact){
                 if(error) throw error;
                 console.log(" a new contact was added to database");
                 res.json({'status': 200, 'message': 
                 'A new contact was added'});
             }
        );
    
   //res.send(name);
}
exports.update = (req, res, next) => {
    //contact´s data
    const con_id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const dtnasc = req.body.dt_nasc;
    const img_con = req.body.img_con;

    global.connection.query(`UPDATE tbl_contacts 
        SET c_nomecon = '${name}', c_emailcon = '${email}', 
        d_datanasc = '${dtnasc}', c_imgcon = '${img_con}' 
        WHERE id_con = ${con_id}`, function(error){
            if(error) throw error;
            res.json({"status":"200", 
            "message":"contact´s data was updated with success!"});
    });
    
};
//delete contact
exports.delete = (req, res, next) => {
    const id = req.params.con_id;
    
    //sql statement
    global.connection.query(`DELETE FROM tbl_contacts 
    WHERE id_con = ${id}`, 
    function(error){
        if(error) throw error;
        res.json({'status':200, 
        'message':'contact was deleted with success.'});
    });
}



