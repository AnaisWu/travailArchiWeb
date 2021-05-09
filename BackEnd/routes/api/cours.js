var express = require('express');
var router = express.Router();
var database = require('../../database/database');

// Prendre tous les cours
router.get('/', (req, res) => {
    try {
        database.query('SELECT * FROM cours', (errors, values) => {
            res.send(values)
        });
    } catch (error) {
        return res.status(500).send("Base de donnée offline")
    }

});

// Prendre un cours spécifique
router.get('/:id', (req, res) => {
    try {
        var parametre = req.params;
        database.query("SELECT * FROM cours WHERE id = ?", parametre.id, (errors, values) => {
            if (values.length == 0) {
                return res.send("Cours not found")
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
        database.query('SELECT * FROM cours WHERE Diplome = ?', parametre.Diplome, (errors, values) => {
            res.send(values)
        });
    } catch (error) {
        return res.status(500).send("Base de donnée offline")
    }
});

// Ajouter un cours
router.post('/', (req, res) => {
    if (req.body.Nom == null) {
        return res.status(400).send("Veuillez introduire le nom du cours")
    }
    if (req.body.Nom.length > 50) {
        return res.status(400).send('Le nom introduit est trop long')
    }
    if (req.body.Credit == null) {
        return res.status(400).send("Veuillez introduire le nombre de crédits")
    }
    if (req.body.Diplome == null) {
        return res.status(400).send("Veuillez introduire à quel diplôme appartient ce cours")
    }
    database.query('INSERT INTO cours SET ?', req.body, () => {
        res.send(req.body)
    });
});

// Supprimer un cours
router.delete('/:id', (req, res) => {
    var parametre = req.params;
    database.query("DELETE FROM cours WHERE id = ?", parametre.id, (errors, values) => {
        res.send("Suppression réussie")
    });
});

// Modifier un cours
router.put('/:id', (req, res) => {
    var parametre = req.params;
    if (req.body.Nom == null) {
        return res.status(400).send("Veuillez introduire le nom du cours")
    }
    if (req.body.Nom.length > 50) {
        return res.status(400).send('Le nom introduit est trop long')
    }
    if (req.body.Credit == null) {
        return res.status(400).send("Veuillez introduire le nombre de crédits")
    }
    if (req.body.Diplome == null) {
        return res.status(400).send("Veuillez introduire à quel diplôme appartient ce cours")
    }
    database.query('UPDATE cours SET ? WHERE id = ?', [req.body, parametre.id], (errors, values) => {
        res.send("Modification réussie")
    });
});

module.exports = router;