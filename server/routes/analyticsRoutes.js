const express = require("express");
const router = express.Router();
const { getSummary } = require("../controllers/analyticsController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/summary", protect, getSummary);

module.exports = router;