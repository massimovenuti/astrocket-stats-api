const express = require('express');
const statsCtrl = require('../controllers/stats');

const router = express.Router();

router.get('/', statsCtrl.getAllStats);
router.post('/', statsCtrl.sendMultipleStats);
router.get('/:username', statsCtrl.getOneStats);
router.post('/:username', statsCtrl.sendOneStats);
router.put('/:username', statsCtrl.modifyOneStats);

module.exports = router;
