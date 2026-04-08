const Booking = require('../models/Booking');
const Turf = require('../models/Turf');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    try {
        const { turfId, date, timeSlot } = req.body;

        if (!turfId || !date || !timeSlot) {
            return res.status(400).json({ message: 'Please provide turfId, date, and timeSlot' });
        }

        // Check if turf exists
        const turf = await Turf.findById(turfId);
        if (!turf) {
            return res.status(404).json({ message: 'Turf not found' });
        }

        // Check if slot is already booked on that date
        const existingBooking = await Booking.findOne({
            turf: turfId,
            date: new Date(date),
            timeSlot,
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'Time slot already booked for this date' });
        }

        const booking = new Booking({
            user: req.user.id,
            turf: turfId,
            date,
            timeSlot,
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('turf', 'name location pricePerHour');
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createBooking,
    getUserBookings,
};
