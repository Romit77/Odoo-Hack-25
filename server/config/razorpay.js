import Razorpay from "razorpay"
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id:  "rzp_test_WgOAkE4biCLlE6",
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;