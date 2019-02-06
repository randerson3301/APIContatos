const express = require('express');
const app = express();
const router = express.Router();

//invocando o modulo body-parser que permite trabalhar com dados via POST
const bodyParser = require('body-parser');

//config body-parser
router.use(bodyParser.json()); //suporta os dados dos bodies do json
router.use(bodyParser.urlencoded({extended: true})); //suporta bodies encoded


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
const conRoute = require('./routes/conRoute');
const addressRoute = require('./routes/addressRoute');
const phoneRoute = require('./routes/phoneRoute');


//config endpoints
//nesses endpoints não são necessários parametros,
//esses devem estar no file de routes
app.use('/', index);
app.use('/contacts/', conRoute);
app.use('/address/', addressRoute);
app.use('/phones/', phoneRoute);

module.exports = app;
