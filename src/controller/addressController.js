exports.get = (req, res, next) => {
    const con_id = req.params.con_id;
    //getting data from the contact
    global.connection.query(`SELECT * FROM tbl_enderecos 
    WHERE id_con = ${con_id}`,
        function(error, result, fields){
            if(error) throw error;
           
            res.send(JSON.stringify({"status":200, "error": null, "response": result}));
        })
};
//get user address data
exports.getUserAddress = (req, res, next) => {
    const user_id = req.params.user_id;
    //getting data from the address
    global.connection.query(`SELECT * FROM tbl_address_user 
    WHERE id_user = ${user_id}`,
        function(error, result, fields){
            if(error) throw error;
           
            res.send(JSON.stringify({"status":200, "error": null, "response": result}));
        })
};

//inserting contact address
exports.insertContactAddress = (req, res) => {
    const id_con = req.body.id_con;
    const logradouro = req.body.logradouro;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const uf = req.body.uf;

    global.connection.query(
        `INSERT INTO 
            tbl_enderecos(c_logradouro, c_bairro, c_cidade,
                c_uf, id_con)
         VALUES(
             '${logradouro}', '${bairro}', '${cidade}', 
             '${uf}', ${id_con}
             )`,
             function (error, contact){
                 if(error) throw error;
                 console.log(" a new contact´s address was added to database");
                 res.json({'status': 200, 'message': 
                 'A new contact´s address was added'});
             }
        );
};

//inserting user address
exports.insertUserAddress = (req, res) => {
    const id_user = req.body.id_user;
    const logradouro = req.body.logradouro;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const uf = req.body.uf;
   

    global.connection.query(
        `INSERT INTO 
            tbl_address_user(c_logradouro, c_bairro, c_cidade,
                c_uf, id_user)
         VALUES(
             '${logradouro}', '${bairro}', '${cidade}', 
             '${uf}', ${id_user}
             )`,
             function (error){
                 if(error) throw error;
                 console.log(" a new user´s address was added to database");
                 res.json({'status': 200, 'message': 
                 'A new user´s address was added'});
             }
        );
};

//deleting address
exports.delete = (req, res) => {
    const obj = req.params.obj;
    const id = req.params.id;

    //a variável table irá receber o nome da tabela de onde resgistro está
    let table = "";
    let field = "";
    /**
     * a variavel obj irá identificar por um caractere se o usuário
     * quer excluir um endereço de contato ou o seu próprio. De acordo
     * com a escolha, as variaveis table e field irão mudar o nome do 
     * campo e da tabela de onde o user quer excluir.
     */
    if(obj == "u"){
        table = "tbl_address_user";
        field = "id_user";
    } else if (obj == "c"){
        table = "tbl_enderecos";
        field = "id_con";
    } else {
        res.json({"status": 404, "message":`Option not found. 
        Use 'c' for contacts or 'u' for user`});
    }

    global.connection.query(`DELETE FROM ${table} 
    WHERE ${field} = ${id}`, function(error){
        if(error) throw error;
        console.log(table);
        res.json({"status": 200, "message":"Address was deleted"});
    });
};

//updating contact address
exports.updateContactAddress = (req, res, next) => {
    //contact´s data
    const con_id = req.body.id;
    const logradouro = req.body.logradouro;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const uf = req.body.uf;

    global.connection.query(`UPDATE tbl_enderecos 
        SET c_logradouro = '${logradouro}', c_bairro= '${bairro}', 
        c_cidade = '${cidade}', c_uf = '${uf}' 
        WHERE id_con = ${con_id}`, function(error){
            if(error) throw error;
            res.json({"status":"200", 
            "message":"contact´s address was updated with success!"});
    });
};

//updating contact address
exports.updateUserAddress = (req, res) => {
    //user data
    const user_id = req.body.id;
    const logradouro = req.body.logradouro;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const uf = req.body.uf;
    const id_address = req.body.id_address;

    global.connection.query(`UPDATE tbl_address_user 
        SET c_logradouro = '${logradouro}', c_bairro= '${bairro}', 
        c_cidade = '${cidade}', c_uf = '${uf}' 
        WHERE id_user = ${user_id} 
        AND id_address_user = ${id_address}`, function(error){
            if(error) throw error;
            res.json({"status":"200", 
            "message":"user´s address was updated with success!"});
    });
};