const User = require("../models/User")

exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const totalUsers = await User.countDocuments()
    const totalPages = Math.ceil(totalUsers / limit)

    // Fetch users with lean to get plain JS objects
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Default fields structure based on your updated schema
    const defaultFields = {
      _id: null,
      email: null,
      password: null,
      firstName: null,        // ✅ new
      lastName: null,         // ✅ new
      phoneNumber: null,      // ✅ new
      address: null,          // ✅ new
      stripeCustomerId: null,
      subscriptionStatus: null,
      resetCode: null,
      subscriptionEndDate: null,
      resetCodeExpiry: null,
      lastSessionId: null,
      createdAt: null,
      updatedAt: null,
      __v: null,
    }

    // Normalize each user object to ensure all fields are present
    const normalizedUsers = users.map(user => ({
      ...defaultFields,
      ...user,
    }))

    res.status(200).json({
      totalUsers,
      totalPages,
      currentPage: page,
      users: normalizedUsers,
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error })
  }
}


// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { userId } = req.params

  try {
    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error })
  }
}

// Update user details
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  try {
    // Check if email is being updated
    if (updateData.email) {
      const existingUser = await User.findOne({ email: updateData.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Email already in use by another account." });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};



exports.getUserByEmail = async (req, res) => {
  const { email } = req.params

  try {
    const user = await User.findOne({ email }).lean()

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Default fields structure based on your updated schema
    const defaultFields = {
      _id: null,
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      address: null,
      stripeCustomerId: null,
      subscriptionStatus: null,
      resetCode: null,
      subscriptionEndDate: null,
      resetCodeExpiry: null,
      lastSessionId: null,
      createdAt: null,
      updatedAt: null,
      __v: null,
    }

    // Normalize the user object to include all fields
    const normalizedUser = {
      ...defaultFields,
      ...user,
    }

    res.status(200).json(normalizedUser)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user by email", error })
  }
}
