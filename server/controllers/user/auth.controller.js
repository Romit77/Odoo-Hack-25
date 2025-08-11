import * as argon2 from "argon2";
import chalk from "chalk";
import User from "../../models/user.model.js";
import { generateUserToken } from "../../utils/generateJwtToken.js";
import { validationResult } from "express-validator";
import { sendOtp } from "../../utils/sendOtp.js";
import crypto from "crypto";

export const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await argon2.hash(password);
    // generate numeric 6-digit OTP
    const otp = ("000000" + Math.floor(Math.random() * 1000000)).slice(-6);
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      otp,
      otpExpires,
      isVerified: false,
    });
    await newUser.save();
    if (phone) {
      try {
        await sendOtp(phone, otp);
      } catch (e) {
        console.log(chalk.red("OTP send failed:"), e.message);
      }
    }
    return res
      .status(201)
      .json({ success: true, message: "OTP sent. Please verify.", email });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const verifyUserOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    if (user.isVerified) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Already verified",
          token: generateUserToken(user._id),
        });
    }
    if (!user.otp || !user.otpExpires || user.otpExpires < new Date()) {
      return res
        .status(400)
        .json({
          success: false,
          message: "OTP expired. Please register again.",
        });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    const token = generateUserToken(user._id);
    return res
      .status(200)
      .json({ success: true, message: "Verification successful", token });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: "Account not verified" });
    }
    const isPasswordCorrect = await argon2.verify(user.password, password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = generateUserToken(user._id);
    return res
      .status(200)
      .json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(400).json({ success: false, message: err.message });
  }
};
