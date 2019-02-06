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

exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`requisição recebida com sucesso ${id}`);
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`requisição recebida com sucesso ${id}`)
}



