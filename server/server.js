require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/turfs', require('./src/routes/turfRoutes'));
app.use('/api/bookings', require('./src/routes/bookingRoutes'));

app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running' });
});

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/turf_booking')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });
