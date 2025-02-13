const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plan = require('../models/Plan');

// Load environment variables
dotenv.config();

// Predefined plans
const plans = [
  { title: "Silver Plan", description: "Basic plan", renewalPeriod: 1, tier: 1, discount: 0.0 },
  { title: "Gold Plan", description: "Standard plan", renewalPeriod: 3, tier: 2, discount: 0.05 },
  { title: "Platinum Plan", description: "Premium plan", renewalPeriod: 6, tier: 3, discount: 0.10 },
  { title: "Diamond Plan", description: "Exclusive plan", renewalPeriod: 12, tier: 4, discount: 0.25 },
];

// Seed function
const seedPlans = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Clear existing plans
    await Plan.deleteMany();
    console.log('Existing plans cleared.');

    // Insert predefined plans
    await Plan.insertMany(plans);
    console.log('Plans seeded successfully.');

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding plans:', error);
    mongoose.connection.close();
  }
};

// Execute the seed function
seedPlans();
