const express = require('express');
const router = express.Router();
const { getTurfs, createTurf } = require('../controllers/turfController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getTurfs)
    .post(protect, admin, createTurf);

module.exports = router;
