var express = require('express');
var router = express.Router();
var database = require('../../database/database');

// Prendre tous les diplomes
router.get('/', (req, res) => {
    try {
        database.query('SELECT * FROM diplome', (errors, values) => {
            res.send(values)
        });
    } catch (error) {
        return res.status(500).send("Base de donnée offline")
    }
});

// Prendre un diplome specifique
router.get('/:id', (req, res) => {
    try {
        var parametre = req.params;
        database.query("SELECT * FROM diplome WHERE id = ?", parametre.id, (errors, values) => {
            if (values.length == 0) {
                return res.send("Diplome not found")
            }
            res.send(values)
        });
    } catch (error) {
        return res.status(500).send("Base de donnée offline") //try-catch pour gestion erreurs DB
    }
});

// Ajouter un diplome
router.post('/', (req, res) => {
    if (req.body.NomDiplome == null) {
        return res.status(400).send("Veuillez introduire le diplôme")
    }
    if (req.body.NomDiplome.length > 20) {
        return res.status(400).send('Le nom introduit est trop long')
    }
    if (req.body.TotalCredit == null) {
        return res.status(400).send("Veuillez introduire le total crédits")
    }
    database.query('INSERT INTO diplome SET ?', req.body, () => {
        res.send(req.body)
    })
});

// Supprimer un diplôme
router.delete('/:id', (req, res) => {
    var parametre = req.params;
    database.query("DELETE FROM diplome WHERE id = ?", parametre.id, (errors, values) => {
        res.send("Suppression réussie")
    });
});

//Modifier un diplôme
router.put('/:id', (req, res) => {
    var parametre = req.params;
    if (req.body.NomDiplome == null) {
        return res.status(400).send("Veuillez introduire le diplôme")
    }
    if (req.body.NomDiplome.length > 20) {
        return res.status(400).send('Le nom introduit est trop long')
    }
    if (req.body.TotalCredit == null) {
        return res.status(400).send("Veuillez introduire le total crédits")
    }
    database.query('UPDATE diplome SET ? WHERE id = ?', [req.body, parametre.id], (errors, values) => {
        res.send("Modification réussie")
    });
});


module.exports = router;