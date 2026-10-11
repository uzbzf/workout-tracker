const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', summaryController.getSummary);
router.get('/progress', summaryController.getProgress);
router.get('/activity', summaryController.getActivity);

module.exports = router;
