//get user phone data
exports.getUserPhone = (req, res, next) => {
    const user_id = req.params.user_id;
    //getting data from the address
    global.connection.query(`SELECT * FROM tbl_telefone_usuario 
    WHERE id_user = ${user_id}`,
        function(error, result, fields){
            if(error) throw error;
           
            res.send(JSON.stringify({"status":200, "error": null, "response": result}));
        })
};
//get contact phone data
exports.getConPhone = (req, res, next) => {
    const con_id = req.params.con_id;
    //getting data from the address
    global.connection.query(`SELECT * FROM tbl_telefone 
    WHERE id_con = ${con_id}`,
        function(error, result, fields){
            if(error) throw error;
           
            res.send(JSON.stringify({"status":200, "error": null, "response": result}));
        })
};


//inserting contact phone 
exports.insertContactPhone = (req, res) => {
    const id_con = req.body.id_con;
    const telefone = req.body.tel;
    const desc = req.body.desc;
    const tipotel = req.body.tipotel;

    global.connection.query(
        `INSERT INTO 
            tbl_telefone(telefone, c_desctel, c_tipotel,
                id_con)
         VALUES(
             '${telefone}', '${desc}', '${tipotel}', 
              ${id_con}
             )`,
             function (error, contact){
                 if(error) throw error;
               
                 res.json({'status': 200, 'message': 
                 'A new contact´s phone was added'});
             }
        );
};

//inserting user address
exports.insertUserPhone = (req, res) => {
    const id_user = req.body.id_user;
    const telefone = req.body.tel;
    const desc = req.body.desc;
    const tipotel = req.body.tipotel;

    global.connection.query(
        `INSERT INTO 
            tbl_telefone_usuario(telefone, c_desctel, c_tipotel,
                id_user)
         VALUES(
             '${telefone}', '${desc}', '${tipotel}', 
              ${id_user}
             )`,
             function (error, contact){
                 if(error) throw error;
               
                 res.json({'status': 200, 'message': 
                 'A new user´s phone was added'});
             }
        );
};

//deleting phone
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
        table = "tbl_telefone_usuario";
        field = "id_tel_usuario";
    } else if (obj == "c"){
        table = "tbl_telefone";
        field = "id_telefone";
    } else {
        res.json({"status": 404, "message":`Option not found. 
        Use 'c' for contacts or 'u' for user`});
    }

    global.connection.query(`DELETE FROM ${table} 
    WHERE ${field} = ${id}`, function(error){
        if(error) throw error;
        console.log(table);
        res.json({"status": 200, "message":"Phone was deleted"});
    });
};

//updating contact phone
exports.update = (req, res, next) => {
    //contact´s data
    const telefone = req.body.tel;
    const desc = req.body.desc;
    const tipotel = req.body.tipotel;
    const obj = req.body.obj;
    const id = req.body.id;

    let table, field = "";

    if(obj == "c"){
        table = "tbl_telefone";
        field = "id_telefone";
    } 

    else if(obj == "u"){
        table = "tbl_telefone_usuario";
        field = "id_tel_usuario";
    } else {
        res.json({"status": 404, "message":`Option not found. 
        Use 'c' for contacts or 'u' for user`});
    }
    console.log(table);
    global.connection.query(`UPDATE ${table} 
        SET telefone = '${telefone}', c_desctel= '${desc}', 
        c_tipotel = '${tipotel}'
        WHERE ${field} = ${id}`, function(error){
            if(error) throw error;
            res.json({"status":"200", 
            "message":" phone was updated with success!"});
    });
};
