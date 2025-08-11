import { Router } from "express";
import {
  registerOwner,
  loginOwner,
  ownerRequest,
  verifyOwnerOTP,
  resendOwnerOTP,
} from "../../controllers/owner/auth.controller.js";
import {
  validateRegisterInput,
  validateLoginInput,
  validateOwnerRequestInput,
} from "../../middleware/validators/owner/authValidator.js";
import {
  validateOTPInput,
  validateResendOTPInput,
} from "../../middleware/validators/user/authValidator.js";

const authRouter = Router();
authRouter.post("/register", validateRegisterInput, registerOwner);
authRouter.post("/login", validateLoginInput, loginOwner);
authRouter.post("/ownerRequest", validateOwnerRequestInput, ownerRequest);
authRouter.post("/verify-otp", validateOTPInput, verifyOwnerOTP);
authRouter.post("/resend-otp", validateResendOTPInput, resendOwnerOTP);

export default authRouter;
