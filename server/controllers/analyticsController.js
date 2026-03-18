const taskService = require("../services/taskService");

const getSummary = async (req, res, next) => {
  try {
    const data = await taskService.getAnalytics();
    res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
};

module.exports = { getSummary };