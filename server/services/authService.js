const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const userRepo = require("../repositories/userRepository");

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const register = async ({ name, email, password }) => {
  const existing = await userRepo.findByEmail(email);
  if (existing) throw new ApiError(409, "Email already registered");
  const user = await userRepo.createUser({ name, email, password });
  const token = generateToken(user._id);
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

const login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new ApiError(401, "Invalid email or password");
  const match = await user.comparePassword(password);
  if (!match) throw new ApiError(401, "Invalid email or password");
  const token = generateToken(user._id);
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

const getMe = async (userId) => {
  const user = await userRepo.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

const getAllUsers = () => userRepo.getAllUsers();

module.exports = { register, login, getMe, getAllUsers };