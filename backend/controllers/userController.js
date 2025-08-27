const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ msg: "No token provided" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const User = await UserModel.findById(verified.id);

    if (!User) return res.status(404).json({ msg: "User not found" });

    res.json({ user: User });
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};

const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await UserModel.findOne({ email });
    if (existing) return res.json({ msg: "Email already registered!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ msg: "You are successfully registered!" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await UserModel.findOne({ email });

    if (!User) return res.json("Invalid Email!");

    const validPassword = await bcrypt.compare(password, User.password);
    if (!validPassword) return res.json("Invalid Password!");

    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  userRegistration,
  userLogin,
  userAuth
};
