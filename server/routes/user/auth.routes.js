import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifyUserOTP,
  resendOTP,
} from "../../controllers/user/auth.controller.js";
import {
  validateRegisterInput,
  validateLoginInput,
  validateOTPInput,
  validateResendOTPInput,
} from "../../middleware/validators/user/authValidator.js";

const authRouter = Router();
authRouter.post("/register", validateRegisterInput, registerUser);
authRouter.post("/login", validateLoginInput, loginUser);
authRouter.post("/verify-otp", validateOTPInput, verifyUserOTP);
authRouter.post("/resend-otp", validateResendOTPInput, resendOTP);

export default authRouter;
