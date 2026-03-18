const User = require("../models/User");

const findByEmail = (email) => User.findOne({ email }).select("+password");
const findById = (id) => User.findById(id);
const createUser = (data) => User.create(data);
const getAllUsers = () => User.find({}, "_id name email role");

module.exports = { findByEmail, findById, createUser, getAllUsers };