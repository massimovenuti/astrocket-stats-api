const dbConfig = require('../config/dbConfig');
const knex = require('knex')(dbConfig);

exports.getRanking = (req, res) => {
    var stat = req.params.stat;
    if (!stat) {
        stat = 'nbPoints';
    }

    var limit = req.query.limit;
    if (!limit) {
        limit = 20;
    }

    var offset = req.query.offset;
    if (!offset) {
        offset = 0;
    }

    knex.select(
            'u.username',
            's.nbPoints',
            's.nbKills',
            's.nbAsteroids',
            's.nbDeaths',
            's.nbPowerUps',
            's.nbGames',
            's.nbWins',
            's.maxKills',
            's.maxPoints',
            's.maxPowerUps',
            's.maxDeaths')
        .from({ s: 'stats' })
        .join({ u: 'users' }, 'u.idUser', 's.idUser')
        .orderBy(stat, 'desc')
        .limit(limit)
        .offset(offset)
        .then(rows => {
            res.status(200).json(rows);
        })
        .catch(error => {
            res.status(400).send('Requête invalide : l\'un des champs est incorrect');
        });
};