const express = require("express");
const router = express.Router();
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");
const { validateBody } = require("../middlewares/validateMiddleware");

router.use(protect);

router.post("/", validateBody(["title"]), createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;