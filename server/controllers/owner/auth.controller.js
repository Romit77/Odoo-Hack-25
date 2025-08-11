import * as argon2 from "argon2";
import chalk from "chalk";
import { generateOwnerToken } from "../../utils/generateJwtToken.js";
import Owner from "../../models/owner.model.js";
import { validationResult } from "express-validator";
import OwnerRequest from "../../models/ownerRequest.model.js";
import { generateOTP, sendManualOTP } from "../../utils/twilio.js";

//  owner request controller when admin approves the owner, the owner can register and login

export const ownerRequest = async (req, res) => {
  const { name, email, phone } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try {
    const ownerRequest = await OwnerRequest.findOne({ email });
    if (ownerRequest) {
      return res
        .status(400)
        .json({ success: false, message: "Owner request already exists" });
    }
    const newOwnerRequest = new OwnerRequest({
      name,
      email,
      phone,
    });
    await newOwnerRequest.save();
    return res
      .status(201)
      .json({ success: true, message: "Owner request created successfully" });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const registerOwner = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  try {
    const ownerRequest = await OwnerRequest.findOne({ email });

    if (!ownerRequest) {
      return res
        .status(400)
        .json({ success: false, message: "Owner request does not exist" });
    }

    if (ownerRequest.status === "pending") {
      return res
        .status(400)
        .json({ success: false, message: "Owner request is not approved" });
    }

    if (ownerRequest.status === "rejected") {
      return res
        .status(400)
        .json({ success: false, message: "Owner request is rejected" });
    }

    const owner = await Owner.findOne({ email });
    if (owner) {
      return res
        .status(400)
        .json({ success: false, message: "Owner already exists" });
    }
    const hashedPassword = await argon2.hash(password);

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const newOwner = new Owner({
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpiry,
    });
    await newOwner.save();

    // Send OTP
    const otpResult = await sendManualOTP(phone, otp);

    if (!otpResult.success) {
      // If OTP sending fails, delete the owner
      await Owner.findByIdAndDelete(newOwner._id);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP. Please try again.",
      });
    }

    return res.status(201).json({
      success: true,
      message:
        "Owner registered successfully. Please verify your phone number with the OTP sent.",
      ownerId: newOwner._id,
    });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const loginOwner = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const owner = await Owner.findOne({ email });
    if (!owner) {
      return res
        .status(400)
        .json({ success: false, message: "Owner does not exist" });
    }

    if (!owner.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your phone number first",
        ownerId: owner._id,
      });
    }

    const isPasswordCorrect = await argon2.verify(owner.password, password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = generateOwnerToken(owner);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: owner.role,
    });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const verifyOwnerOTP = async (req, res) => {
  const { ownerId, otp } = req.body;

  try {
    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    if (owner.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Owner is already verified",
      });
    }

    if (!owner.otp || !owner.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new OTP.",
      });
    }

    if (new Date() > owner.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    if (owner.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Mark owner as verified and clear OTP
    owner.isVerified = true;
    owner.otp = undefined;
    owner.otpExpiry = undefined;
    await owner.save();

    const token = generateOwnerToken(owner);
    return res.status(200).json({
      success: true,
      message: "Phone number verified successfully",
      token,
      role: owner.role,
    });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const resendOwnerOTP = async (req, res) => {
  const { ownerId } = req.body;

  try {
    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    if (owner.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Owner is already verified",
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    owner.otp = otp;
    owner.otpExpiry = otpExpiry;
    await owner.save();

    // Send OTP
    const otpResult = await sendManualOTP(owner.phone, otp);

    if (!otpResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(400).json({ success: false, message: err.message });
  }
};
