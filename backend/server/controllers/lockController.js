const Lock = require('../models/Lock');

// ✅ Create Lock (Admin only)
exports.createLock = async (req, res) => {
  try {
    const { sport, game, pick, odds, confidence, analysis, status } = req.body;

    if (!sport || !game || !pick || !odds || !confidence || !analysis) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newLock = await Lock.create({ sport, game, pick, odds, confidence, analysis, status });
    res.status(201).json({ message: 'Lock created successfully', lock: newLock });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Edit Lock (Admin only)
exports.editLock = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLock = await Lock.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedLock) {
      return res.status(404).json({ message: 'Lock not found' });
    }

    res.json({ message: 'Lock updated successfully', lock: updatedLock });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Lock (Admin only)
exports.deleteLock = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLock = await Lock.findByIdAndDelete(id);

    if (!deletedLock) {
      return res.status(404).json({ message: 'Lock not found' });
    }

    res.json({ message: 'Lock deleted successfully', lock: deletedLock });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Locks (Admin — latest first)
exports.getAllLocks = async (req, res) => {
  try {
    const locks = await Lock.find().sort({ date: -1 });
    res.json({ locks });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get lock for public
exports.getActiveLockOfTheDay = async (req, res) => {
  try {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const lock = await Lock.findOne({
      status: 'active',
      date: { $gte: yesterday }
    }).sort({ date: -1 });

    if (!lock) {
      return res.status(404).json({ message: 'No active Lock of the Day found' });
    }

    res.json({ lock });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

