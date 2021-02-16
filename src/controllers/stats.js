const dbConfig = require('../config/dbConfig');
const knex = require('knex')(dbConfig);
const axios = require('axios')

exports.getAllStats = (req, res) => {

};

exports.getOneStats = (req, res) => {

};

exports.modifyOneStats = (req, res) => {
    if (req.headers.servertoken) {
        axios.post('http://localhost:8080/server/check', {
                token: req.headers.servertoken
            })
            .then(function() {
                knex('stats').update({
                        nbPoints: req.body.nbPoints,
                        nbKills: req.body.nbKills,
                        nbAsteroids: req.body.nbAsteroids,
                        nbDeaths: req.body.nbDeaths,
                        nbPowerUps: req.body.nbPowerUps,
                        nbGames: req.body.nbGames,
                        nbWins: req.body.nbWins,
                        maxKills: req.body.maxKills,
                        maxPoints: req.body.maxPoints,
                        maxPowerUps: req.body.maxPowerUps,
                        maxDeaths: req.body.maxDeaths
                    })
                    .whereIn('idUser', function() {
                        this.select('idUser').from('users');
                    })
                    .then(function() {
                        res.status(200).send('Modification réalisée avec succès');
                    })
                    .catch(error => {
                        console.error(error)
                        res.status(400).send('Requête invalide : vérifiez la syntaxe');
                    });
            })
            .catch(error => {
                console.error(error);
                res.status(403).send("Vous n'êtes pas autorisé à modifier les statistiques");
            })
    } else {
        res.status(400).send("Requête invalide : vérifiez la syntaxe");
    }
};