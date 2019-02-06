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