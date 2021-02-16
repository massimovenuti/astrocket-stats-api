const { all } = require('../app');
const dbConfig = require('../config/dbConfig');
const knex = require('knex')(dbConfig);

/*
knex.select('nbPoints')
    .from('stats')
    .where({idUser : 1})
    .then(function(row) { 
        console.log("Connected to DB : " + row.first);
    })
    .catch((err) => { console.log("Not connected to DB : " + err);})
    .finally(() => {
        knex.destroy();
    });
*/
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
        .then(function(rows) { 
            res.status(200).json(rows);
        })
        .catch((err) => { res.status(400).json("Impossible de répondre"); console.log(err);})
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
        .where({username : req.body.username})
        .join('users','users.idUser','=','stats.idUser')
        .then(function(rows) { 
            res.status(200).json(rows);
        })
        .catch((err) => { res.status(400).json("Impossible de répondre"); console.log(err);})
        .finally(() => {
            knex.destroy();
        });
};

exports.sendOneStats = (req, res) => {
    
};

exports.sendMultipleStats = (req, res) => {
    
};

exports.modifyOneStats = (req, res) => {
    
};
