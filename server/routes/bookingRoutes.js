const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getTurfBookings, getOwnerBookings } = require('../controllers/bookingController');
const { auth, isOwner } = require('../middleware/auth');

// Public route to see which slots are unavailable
router.get('/turf/:turfId', getTurfBookings);

// Owner route to see all bookings on their turfs
router.get('/owner', auth, isOwner, getOwnerBookings);

// Protected routes for users to book and view history
router.post('/', auth, createBooking);
router.get('/me', auth, getMyBookings);

module.exports = router;
