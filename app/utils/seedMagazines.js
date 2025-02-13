const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Magazine = require('../models/Magazine');

// Load environment variables
dotenv.config();

// Sample magazine data
const magazines = [
  {
    name: "Tech Weekly",
    description: "Stay updated with the latest tech trends.",
    base_price: 100,
  },
  {
    name: "Health Matters",
    description: "Your monthly guide to a healthy lifestyle.",
    base_price: 80,
  },
  {
    name: "Travel & Leisure",
    description: "Explore the world from your couch.",
    base_price: 120,
  },
];

// Seed function
const seedMagazines = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Clear existing magazines
    await Magazine.deleteMany();
    console.log('Existing magazines cleared.');

    // Insert sample magazines
    await Magazine.insertMany(magazines);
    console.log('Magazines seeded successfully.');

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding magazines:', error);
    mongoose.connection.close();
  }
};

// Execute the seed function
seedMagazines();
