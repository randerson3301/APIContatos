const express = require('express');
const app = express();
const router = express.Router();


var mysql = require('mysql');

//Conexão com o banco
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'db_contatos'
	});
	connection.connect();
	next();
});

//rotas
const index = require('./routes/index');
const personRoute = require('./routes/personRoute');

//config endpoints
app.use('/', index);
app.use('/contacts', personRoute);



module.exports = app;
