const express = require("express");
const router = express.Router();
const { register, login, getMe, getAllUsers } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { validateBody } = require("../middlewares/validateMiddleware");

router.post("/register", validateBody(["name", "email", "password"]), register);
router.post("/login", validateBody(["email", "password"]), login);
router.get("/me", protect, getMe);
router.get("/users", protect, getAllUsers);

module.exports = router;