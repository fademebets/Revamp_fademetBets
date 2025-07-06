const EV = require('../models/EV');

// Create new EV entry
exports.createEV = async (req, res) => {
  try {
    const { title, description, odds, evValue, coverPercentage, confidence, status } = req.body;

    if (!title || odds === undefined || evValue === undefined || coverPercentage === undefined || !confidence) {
      return res.status(400).json({ message: 'Title, odds, EV value, confidence, and cover percentage are required' });
    }

    const newEV = await EV.create({
      title,
      description,
      odds,
      evValue,
      coverPercentage,
      confidence,
      status: status || 'draft',
    });

    res.status(201).json({ message: 'EV of the Day created successfully', ev: newEV });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all active EVs
exports.getActiveEVs = async (req, res) => {
  try {
    const activeEVs = await EV.find({ status: 'active' }).sort({ date: -1 });

    if (!activeEVs.length) return res.status(404).json({ message: 'No active EVs found' });

    res.json({ evs: activeEVs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all EVs (regardless of status)
exports.getAllEVs = async (req, res) => {
  try {
    const evs = await EV.find().sort({ date: -1 });
    res.json({ evs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit an existing EV
exports.updateEV = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEV = await EV.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEV) {
      return res.status(404).json({ message: "EV entry not found" });
    }

    res.json({ message: "EV updated successfully", ev: updatedEV });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete an EV
exports.deleteEV = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEV = await EV.findByIdAndDelete(id);
    if (!deletedEV) {
      return res.status(404).json({ message: 'EV entry not found' });
    }

    res.json({ message: 'EV entry deleted successfully', ev: deletedEV });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
