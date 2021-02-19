const { off } = require('../app');
const dbConfig = require('../config/dbConfig');
const knex = require('knex')(dbConfig);

function checkStat(stat) {
    return [
            'nbKills',
            'nbPoints',
            'nbAsteroids',
            'nbDeaths',
            'nbPowerUps',
            'nbGames',
            'nbWins',
            'maxKills',
            'maxPoints',
            'maxPowerUps',
            'maxDeaths'
        ]
        .indexOf(stat) >= 0;
}

exports.getRanking = (req, res) => {
    var limit = req.params.limit ? req.params.limit : 30;
    var offset = req.params.offset ? req.params.offset : 0;
    var stat = req.params.stat ? req.params.stat : 'nbKills';

    if (!checkStat(stat) || isNaN(offset) || isNaN(limit)) {
        res.status(400).send('Requête invalide : l\'un des champs est incorrect');
    } else {
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
                console.error(error);
                res.status(500).json("Erreur interne au serveur");
            });
    }
};