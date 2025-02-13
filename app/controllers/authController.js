const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists.' });

    // Create and save the user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    // Debug: Log hashed password from the database
    console.log('Hashed password in DB:', user.password);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    // Debug: Log comparison result
    console.log('Provided password:', password);
    console.log('Password match result:', isMatch);

    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const userId = req.user.id; // Extract the user ID from the authenticated token
    const { newPassword } = req.body;

    // Find the authenticated user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Reset Password Error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

