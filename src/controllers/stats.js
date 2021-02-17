const { all } = require('../app');
const dbConfig = require('../config/dbConfig');
const knex = require('knex')(dbConfig);
const axios = require('axios')

exports.getAllStats = (req, res) => {
    knex.select(
            'idUser',
            'nbKills',
            'nbPoints',
            'nbDeaths',
            'nbPowerUps',
            'nbGames',
            'nbWins',
            'maxKills',
            'maxPoints',
            'maxPowerUps',
            'maxDeaths')
        .from('stats')
        .then(rows => {
            res.status(200).json(rows);
        })
        .catch((err) => {
            res.status(500).json("Erreur interne au serveur");
            console.error(err);
        })
        .finally(() => {
            knex.destroy();
        });
};

exports.getOneStats = (req, res) => {
    knex.select(
            'username',
            'nbKills',
            'nbPoints',
            'nbDeaths',
            'nbPowerUps',
            'nbGames',
            'nbWins',
            'maxKills',
            'maxPoints',
            'maxPowerUps',
            'maxDeaths')
        .from('stats')
        .where({ username: req.params.username })
        .join('users', 'users.idUser', '=', 'stats.idUser')
        .then(rows => {
            res.status(200).json(rows);
        })
        .catch((err) => {
            res.status(500).json("Erreur interne au serveur");
            console.error(err);
        })
        .finally(() => {
            knex.destroy();
        });
};

exports.modifyOneStats = (req, res) => {
    if (!req.headers.servertoken) {
        res.status(400).send("Requête invalide : vérifiez la syntaxe");
    } else {
        axios.post('http://localhost:8080/server/check', { token: req.headers.servertoken })
            .then(() => {
                knex.select('idUser')
                    .from('users')
                    .where({ username: req.params.username })
                    .then((rows) => {
                        if (!rows[0]) {
                            res.status(404).send("L'utilisateur demandé n'a pas été trouvé");
                        } else {

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
                                .where({ idUser: rows[0].idUser })
                                .then(() => {
                                    res.status(200).send('Modification réalisée avec succès');
                                })
                                .catch(error => {
                                    console.error(error)
                                    res.status(400).send('Requête invalide : vérifiez la syntaxe');
                                });
                        }
                    })
            })
            .catch(error => {
                console.error(error);
                res.status(403).send("Vous n'êtes pas autorisé à modifier les statistiques");
            })
    }
};

exports.resetOneStats = (req, res) => {

}