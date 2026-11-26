const express = require("express");
const router = express.Router();
const { register, login, current } = require("../controllers/authController");
const { isAuth } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/current", isAuth, current);

module.exports = router;
