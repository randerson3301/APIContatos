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