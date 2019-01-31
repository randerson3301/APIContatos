const app = require('../src/app');

const port = normalizaPort(process.env.PORT || '3000');

function normalizaPort(val){
    const port = parseInt(val, 10); //o 10 é a base do val

    //caso n seja um número a function vai retornar o valor inserido
    if(isNaN(port)){
        return val;
    }

    //para podermos obter a porta é necessário que ela seja maior ou igual que 0
    if(port >= 0){
        return port;
    }
    return false;
}

app.listen(port, function(){
    console.log(`executando na porta ${port}`)
})