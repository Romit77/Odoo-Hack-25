import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifyUserOtp,
} from "../../controllers/user/auth.controller.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../middleware/validators/user/authValidator.js";

const authRouter = Router();
authRouter.post("/register", validateRegisterInput, registerUser);
authRouter.post("/login", validateLoginInput, loginUser);
authRouter.post("/verify-otp", verifyUserOtp);

export default authRouter;
