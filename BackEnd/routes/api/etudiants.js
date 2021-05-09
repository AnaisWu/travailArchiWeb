var express = require('express');
var router = express.Router();
var database = require('../../database/database');

// Prendre tous les étudiants
router.get('/', (req, res) => {
    try {  //try-catch pour gestion erreurs DB
        database.query('SELECT * FROM etudiant', (errors, values) => {
            res.send(values)
        });
    } catch (error) {
        return res.status(500).send("Base de donnée offline")
    }
});
// Prendre un étudiant
router.get('/:MatriculeEtudiant', (req, res) => {
    try {
        var parametre = req.params;
        database.query("SELECT * FROM etudiant WHERE MatriculeEtudiant = ?", parametre.MatriculeEtudiant, (errors, values) => {  // = ? car critère
            if (values.length === 0) { //Lorsque le tableau est vide = taille de la valeur est 0 -> not found
                return res.status(404).send("L'étudiant n'a pas été trouvé")
            }
            res.send(values)
        });
    } catch (error) {
        return res.status(500).send("Base de donnée offline")
    }
});

// Filtre diplôme
router.get('/diplome/:Diplome', (req, res) => {
    try {
        var parametre = req.params;
        database.query('SELECT * FROM etudiant WHERE Diplome = ?', parametre.Diplome, (errors, values) => {
            res.send(values)
        });
    } catch (error) {
        return res.status(500).send("Base de donnée offline")
    }
});    

// Ajouter un étudiant
router.post('/', (req, res) => {
    if (req.body.Nom == null) {
        return res.status(400).send("Veuillez introduire le nom de l'étudiant")
    }
    if (req.body.Nom.length > 30) {
        return res.status(400).send('Le nom introduit est trop long')
    }
    if (req.body.Sexe !== 'M' && req.body.Sexe !== 'F') {
        return res.status(400).send('La donnée sexe est invalide ou vide')
    }
    if (req.body.NumTelephone.length !== 10 && req.body.NumTelephone.length !== 0) {
        return res.status(400).send('Le numéro introduit est invalide')
    }
    if (req.body.dateNaissance == null) {
        return res.status(400).send("Veuillez introduire la date de naissance de l'étudiant")
    }
    if (req.body.Diplome == null) {
        return res.status(400).send("Veuillez introduire le diplôme de l'étudiant")
    }
    database.query('INSERT INTO etudiant SET ?', req.body, (errors, values) => { //insérer l'entier body
        if (errors) {
            res.status(400).send(errors)
        } else {
            res.send(req.body)
        }
    });
});

//Supprimer un étudiant
router.delete('/:MatriculeEtudiant', (req, res) => {
    var parametre = req.params;
    database.query("DELETE FROM etudiant WHERE MatriculeEtudiant = ?", parametre.MatriculeEtudiant, (errors, values) => {
        res.send("Suppression réussie")
    });
});

// Modifier Etudiant
router.put('/:MatriculeEtudiant', (req, res) => {
    var parametre = req.params;
    if (req.body.Nom == null) {
        return res.status(400).send("Veuillez introduire le nom de l'étudiant")
    }
    if (req.body.Nom.length > 30) {
        return res.status(400).send('Le nom introduit est trop long')
    }
    if (req.body.Sexe !== 'M' && req.body.Sexe !== 'F') {
        return res.status(400).send('La donnée sexe est invalide ou vide')
    }
    if (req.body.NumTelephone.length !== 10 && req.body.NumTelephone.length !== 0) {
        return res.status(400).send('Le numéro introduit est invalide')
    }
    if (req.body.dateNaissance == null) {
        return res.status(400).send("Veuillez introduire la date de naissance de l'étudiant")
    }
    if (req.body.Diplome == null) {
        return res.status(400).send("Veuillez introduire le diplôme de l'étudiant")
    }
    //... Si pas de modification, alors -> réussie
    database.query('UPDATE etudiant SET ? WHERE MatriculeEtudiant = ?', [req.body, parametre.MatriculeEtudiant], (errors, values) => {
        if (errors) {
            return res.status(400).send(errors)
        }
        res.send("Modification réussie") // PRQ PAS res.send(req.body.Sexe) ???
    });
});

module.exports = router;