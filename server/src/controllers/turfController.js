const Turf = require('../models/Turf');

// @desc    Get all turfs
// @route   GET /api/turfs
// @access  Public
const getTurfs = async (req, res) => {
    try {
        const turfs = await Turf.find({});
        res.json(turfs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new turf
// @route   POST /api/turfs
// @access  Private/Admin
const createTurf = async (req, res) => {
    try {
        const { name, location, pricePerHour, description, images } = req.body;

        if (!name || !location || !pricePerHour) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const turf = new Turf({
            name,
            location,
            pricePerHour,
            description,
            images,
        });

        const createdTurf = await turf.save();
        res.status(201).json(createdTurf);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getTurfs,
    createTurf,
};
