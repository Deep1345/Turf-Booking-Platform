const Booking = require('../models/Booking');
const Turf = require('../models/Turf');

// POST /api/bookings (Create a booking)
const createBooking = async (req, res) => {
  try {
    const { turfId, date, timeSlot } = req.body;

    // Check if turf exists
    const turf = await Turf.findById(turfId);
    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }

    // Phase 11: Prevent duplicate booking
    const existingBooking = await Booking.findOne({
      turf: turfId,
      date,
      timeSlot,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'This slot is already booked for the selected date' });
    }

    // Create the booking
    const booking = await Booking.create({
      turf: turfId,
      user: req.user.id,
      date,
      timeSlot,
      totalPrice: turf.pricePerHour // Or calculate duration if extending features
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/bookings/me (Get bookings for logged-in user)
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('turf', 'name location images');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/bookings/turf/:turfId (Get bookings for a specific turf to disable booked slots on frontend)
const getTurfBookings = async (req, res) => {
  try {
    // Only return date and timeSlot to keep user data private
    const bookings = await Booking.find({ 
      turf: req.params.turfId,
      status: { $ne: 'cancelled' }
    }).select('date timeSlot');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/bookings/owner (Get all bookings for turfs owned by logged-in owner)
const getOwnerBookings = async (req, res) => {
  try {
    const ownerTurfs = await Turf.find({ owner: req.user.id }).select('_id');
    const turfIds = ownerTurfs.map(t => t._id);

    const bookings = await Booking.find({ turf: { $in: turfIds } })
      .populate('turf', 'name location')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getTurfBookings,
  getOwnerBookings
};
