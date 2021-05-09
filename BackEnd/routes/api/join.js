var express = require('express');
var router = express.Router();
var database = require('../../database/database');

router.get('/', (req, res) => {
    try {
        database.query('SELECT etudiant.MatriculeEtudiant,etudiant.Nom,diplome.NomDiplome,diplome.TotalCredit FROM etudiant JOIN diplome ON etudiant.Diplome = diplome.id', (errors, values) => {
            res.send(values)
        });
    } catch (error) {
        return res.status(500).send("Base de donnée offline")
    }
});

router.get('/coursdiplome/', (req, res) => {
    try {
        database.query('SELECT cours.id,cours.Nom,cours.Credit,diplome.NomDiplome FROM cours JOIN diplome ON cours.diplome = diplome.id;', (errors, values) => {
            res.send(values)
        });
    } catch (error) {
        return res.status(500).send("Base de donnée offline")
    }
});


module.exports = router;