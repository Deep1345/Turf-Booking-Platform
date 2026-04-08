const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    images: [{
        type: String, // URLs to images
    }],
}, { timestamps: true });

module.exports = mongoose.model('Turf', turfSchema);
