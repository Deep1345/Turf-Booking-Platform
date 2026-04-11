const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // Must be called before passport

const session = require('express-session');
const connectDB = require('./config/db');
const passport = require('./config/passport');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Session (required by Passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/turfs', require('./routes/turfRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Turf Booking API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
