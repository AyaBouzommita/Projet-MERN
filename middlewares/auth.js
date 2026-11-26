const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Verify JWT token
const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Accès refusé. Aucun token fourni." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mern_default_secret");

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ msg: "Utilisateur non trouvé ou session invalide." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token invalide ou expiré.", error: error.message });
  }
};

// Check Admin privileges
const isAdmin = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.role === "admin")) {
    next();
  } else {
    return res.status(403).json({ msg: "Action réservée aux administrateurs." });
  }
};

module.exports = { isAuth, isAdmin };
