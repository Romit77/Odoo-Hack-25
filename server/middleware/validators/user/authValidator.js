import { body } from "express-validator";

export const validateRegisterInput = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("phone")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10-15 digits"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

export const validateLoginInput = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateOTPInput = [
  body("userId").notEmpty().withMessage("User ID is required"),
  body("otp")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must contain only numbers"),
];

export const validateResendOTPInput = [
  body("userId").notEmpty().withMessage("User ID is required"),
];
