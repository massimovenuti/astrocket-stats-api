const dbConfig = require('../config/dbConfig');
const knex = require('knex')(dbConfig);

exports.getArbitraryRanking = (req, res) => {
    offset = req.params.offset;
    if (!offset)
    {
        offset = 0;
    }
    
    limit = req.params.limit; 
    if (!limit)
    {
        limit = 10;
    }

    knex.select('*').from('stats').orderBy('nbPoints').offset(offset).limit(limit);

    res.status(200).json({ message: 'message reçu'});
};

exports.getParticularRanking = (req, res) => {
    offset = req.params.offset;
    if (!offset)
    {
        offset = 0;
    }
    
    limit = req.params.limit; 
    if (!limit)
    {
        limit = 10;
    }


    knex.select('*').from('stats').orderBy(req.params.stat).offset(offset).limit(limit);

};
