const express = require('express');
const rankingCtrl = require('../controllers/ranking');

const router = express.Router();

router.get('/', rankingCtrl.getRanking);
router.get('/:stat', rankingCtrl.getRanking);

module.exports = router;
