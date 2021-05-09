var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'0303',
    database:'school'
});

connection.connect((err) => {
    if(err) return console.log('Erreur base de donnée : ' + err.message);
    console.log('connected')
});

module.exports = connection;