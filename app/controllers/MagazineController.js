const Magazine = require('../models/Magazine');
const Plan = require('../models/Plan');

// Retrieve all magazines with predefined plans
exports.getMagazines = async (req, res) => {
  try {
    // Fetch all magazines
    const magazines = await Magazine.find();

    // Fetch predefined plans (since they are already seeded)
    const plans = await Plan.find();

    if (magazines.length === 0) {
      return res.status(404).json({ message: 'No magazines available.' });
    }

    // Map magazines with plans
    const magazineList = magazines.map((magazine) => ({
      ...magazine.toObject(),
      plans, // Attach the predefined plans to each magazine
    }));

    res.status(200).json(magazineList);
  } catch (error) {
    console.error('Error retrieving magazines:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
