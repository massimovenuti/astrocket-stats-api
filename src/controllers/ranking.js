const dbConfig = require('../config/dbConfig');
const knex = require('knex')(dbConfig);

function getOffset(req) {
    var offset = req.query.offset;
    if (!offset)
    {
        offset = 0;
    }
    return offset;
}

function getLimit(req) {
    var limit = req.query.limit;
    if (!limit)
    {
        limit = 20;
    }
    return limit;
}

function getStat(req) {
    var stat = req.params.limit;
    if (!stat)
    {
        stat = 'nbPoints';
    }
    return stat;
}

exports.getRanking = (req, res) => {
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
        .orderBy(getStat(req), 'desc')
        .limit(getLimit(req))
        .offset(getOffset(req))
        .then(function(rows) {
            res.status(200).json(rows);
        })
        .catch(function(error) {
            res.status(400).send('Requête invalide : l\'un des champs est incorrect');
        });
};
