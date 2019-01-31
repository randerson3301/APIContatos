const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
   /*
    res.status(200).send({
        title: "Node API",
        version: "0.0.1"
    });
    */
    global.connection.query('SELECT * from tbl_users', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});
//dados dos contatos
router.get('/persons', function(req, res, next){
    global.connection.query('SELECT * from tbl_contacts', function (error, results, fields) {
         if (error) throw error;
         res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
     });
 });
module.exports = router;
