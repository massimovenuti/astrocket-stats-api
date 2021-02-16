const express = require('express');
const rankingCtrl = require('../controllers/ranking');

const router = express.Router();

router.get('/', rankingCtrl.getArbitraryRanking);
router.get('/:stat', rankingCtrl.getParticularRanking);

module.exports = router;
