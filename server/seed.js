require('dotenv').config();
const mongoose = require('mongoose');
const Turf = require('./src/models/Turf');

const sampleTurfs = [
    {
        name: "Greenfield Stadium 5v5",
        location: "Downtown Sports Complex, Arena 1",
        pricePerHour: 45,
        description: "Premium artificial grass turf ideal for fast-paced 5v5 matches. Floodlights included for night games.",
        images: ["https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop"]
    },
    {
        name: "Apex Arena 7v7",
        location: "Westside Recreation Center",
        pricePerHour: 65,
        description: "Large 7v7 turf equipped with professional netting, goal posts, and stadium-style bleachers.",
        images: ["https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=800&auto=format&fit=crop"]
    },
    {
        name: "Urban Rooftop Turf",
        location: "Skyline Tower, 12th Floor",
        pricePerHour: 90,
        description: "Experience the ultimate rooftop match with breathtaking city views. Perfect for corporate events or private games.",
        images: ["https://images.unsplash.com/photo-1551958219-acbc608c6aff?q=80&w=800&auto=format&fit=crop"]
    },
    {
        name: "Community Futsal Ground",
        location: "Eastville Public Park",
        pricePerHour: 30,
        description: "Affordable and highly durable hard-court futsal ground. Ideal for weekend leagues and training.",
        images: ["https://images.unsplash.com/photo-1518605368461-1ee7e1654b03?q=80&w=800&auto=format&fit=crop"]
    }
];

const seedTurfs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/turf_booking');
        console.log('Connected to Database. Clearing old turfs...');
        
        await Turf.deleteMany(); // Clear existing
        console.log('Inserting seed data...');
        
        await Turf.insertMany(sampleTurfs);
        console.log('Successfully added 4 sample turfs!');
        
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedTurfs();
