import twilio from "twilio";
import dotenv from "dotenv";

// Ensure environment variables are loaded even if this module is imported before server.js runs dotenv.config()
dotenv.config();

let client = null;

function getClient() {
  if (!client) {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
    if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
      client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    }
  }
  return client;
}

export async function sendOtp(phone, code) {
  const { TWILIO_PHONE_NUMBER } = process.env;
  const twilioClient = getClient();
  if (!twilioClient) {
    throw new Error("Twilio not configured (missing SID/AUTH env vars)");
  }
  if (!TWILIO_PHONE_NUMBER) {
    throw new Error("Twilio phone number not configured");
  }
  await twilioClient.messages.create({
    body: `Your verification code is ${code}`,
    from: TWILIO_PHONE_NUMBER,
    to: phone,
  });
}
