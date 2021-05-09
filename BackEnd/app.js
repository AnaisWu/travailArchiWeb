var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())
var bodyparser = require('body-parser'); // Recevoir les données sous forme de json (postman)
app.use(bodyparser.json()); // Recevoir les données sous forme de json (postman)
app.get('/', (req, res) => {
    res.send('It is working')
});

app.use('/diplome', require('./routes/api/diplome'));
app.use('/etudiants', require('./routes/api/etudiants'));
app.use('/cours', require('./routes/api/cours'));
app.use('/join', require('./routes/api/join'));
app.listen(3000, () => console.log("server started"));