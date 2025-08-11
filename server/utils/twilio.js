// Load environment variables first
import "../config/env.js";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

if (!accountSid || !authToken) {
  console.error(
    "Twilio credentials missing. Please check TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env file"
  );
}

// Trim whitespace from environment variables
const client = twilio(accountSid?.trim(), authToken?.trim());

export const sendOTP = async (phoneNumber) => {
  try {
    const verification = await client.verify.v2
      .services(serviceSid?.trim())
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      });

    return {
      success: true,
      status: verification.status,
      sid: verification.sid,
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const verificationCheck = await client.verify.v2
      .services(serviceSid?.trim())
      .verificationChecks.create({
        to: phoneNumber,
        code: otp,
      });

    return {
      success: verificationCheck.status === "approved",
      status: verificationCheck.status,
      sid: verificationCheck.sid,
    };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Alternative method using manual OTP generation
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendManualOTP = async (phoneNumber, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your verification code is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER?.trim(),
      to: phoneNumber,
    });

    return {
      success: true,
      messageSid: message.sid,
    };
  } catch (error) {
    console.error("Error sending manual OTP:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
