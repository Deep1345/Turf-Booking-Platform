const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    turf: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Turf',
    },
    date: {
        type: Date,
        required: true,
    },
    timeSlot: {
        type: String, // e.g., '10:00 AM - 11:00 AM'
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'confirmed', // Assuming auto-confirmed for MVP
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
