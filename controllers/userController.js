const User = require("../models/user");
const bcrypt = require("bcryptjs");

// @desc    Get all users (with optional search)
// @route   GET /user ou /api/user
const getUsers = async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };
    }
    const users = await User.find(query).select("-password").sort({ createdAt: -1 });
    res.status(200).json({ users, msg: "all users", count: users.length });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by id
// @route   GET /user/:id ou /api/user/:id
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur introuvable" });
    }
    res.status(200).json({ user, msg: "one user" });
  } catch (error) {
    next(error);
  }
};

// @desc    Add new user (CRUD)
// @route   POST /user/add ou /api/user/add
const addUser = async (req, res, next) => {
  try {
    const { name, email, age, img, password, role, isAdmin } = req.body;
    if (!name || !email) {
      return res.status(400).json({ msg: "Le nom et l'email sont requis." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Cet email est déjà utilisé." });
    }

    const newUser = new User({
      name,
      email,
      age: age ? Number(age) : 18,
      img: img || undefined,
      password: password || "123456",
      role: role || (isAdmin ? "admin" : "user"),
      isAdmin: Boolean(isAdmin),
    });

    const result = await newUser.save();
    res.status(201).json({ user: result, msg: "user is added" });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /user/:id ou /api/user/:id
const updateUser = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    // If updating password, hash it
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "Utilisateur introuvable" });
    }

    res.status(200).json({ user, msg: "user is updated" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /user/:id ou /api/user/:id
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur introuvable" });
    }
    res.status(200).json({ msg: "user is deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUserById, addUser, updateUser, deleteUser };
