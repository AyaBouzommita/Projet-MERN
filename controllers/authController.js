const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "mern_default_secret", {
    expiresIn: "7d",
  });
};

// @desc    Register a new user
// @route   POST /auth/register ou /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password, age, img, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Veuillez remplir tous les champs obligatoires (nom, email, mot de passe)." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Un compte avec cette adresse email existe déjà." });
    }

    const isAdmin = role === "admin";
    const user = await User.create({
      name,
      email,
      password,
      age: age || 18,
      img: img || undefined,
      role: role || "user",
      isAdmin,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      msg: "Compte créé avec succès !",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        img: user.img,
        role: user.role,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /auth/login ou /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email et mot de passe requis." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Identifiants invalides (utilisateur non trouvé)." });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Mot de passe incorrect." });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      msg: "Connexion réussie !",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        img: user.img,
        role: user.role,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /auth/current ou /api/auth/current
const current = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, current };
