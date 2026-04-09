const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getTurfBookings } = require('../controllers/bookingController');
const { auth } = require('../middleware/auth');

// Public route to see which slots are unavailable
router.get('/turf/:turfId', getTurfBookings);

// Protected routes for users to book and view history
router.post('/', auth, createBooking);
router.get('/me', auth, getMyBookings);

module.exports = router;
