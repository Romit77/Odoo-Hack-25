import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, RotateCcw, Timer } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/useAxiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId, phone } = location.state || {};

  useEffect(() => {
    if (!userId) {
      navigate("/signup", { replace: true });
    }
  }, [userId, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/user/auth/verify-otp", {
        userId,
        otp: otpString,
      });

      const result = response.data;
      console.log("OTP Verification result:", result); // Debug log

      toast.success(result.message);

      // Dispatch login action to Redux
      dispatch(login(result.token));
      console.log("Token dispatched to Redux:", result.token); // Debug log

      // Set Authorization header for future requests
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.token}`;

      // Navigate to home page
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      const response = await axiosInstance.post("/api/user/auth/resend-otp", {
        userId,
      });

      const result = response.data;
      toast.success(result.message);
      setTimer(600); // Reset timer
      setOtp(["", "", "", "", "", ""]); // Clear OTP inputs
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const maskPhone = (phone) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.replace(/(\d{2})(\d{4})(\d+)/, "$1****$3");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Phone
          </h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to{" "}
            <span className="font-semibold">{maskPhone(phone)}</span>
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Enter verification code
          </label>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-colors"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Timer className="w-4 h-4 mr-1" />
            {timer > 0 ? (
              <span>Code expires in {formatTime(timer)}</span>
            ) : (
              <span className="text-red-500">Code expired</span>
            )}
          </div>

          <button
            onClick={handleResendOTP}
            disabled={resendLoading || timer > 0}
            className="flex items-center text-sm text-emerald-600 hover:text-emerald-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw
              className={`w-4 h-4 mr-1 ${resendLoading ? "animate-spin" : ""}`}
            />
            Resend Code
          </button>
        </div>

        <button
          onClick={handleVerifyOTP}
          disabled={loading || otp.join("").length !== 6}
          className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Didn't receive the code?{" "}
          <button
            onClick={handleResendOTP}
            disabled={resendLoading || timer > 0}
            className="text-emerald-600 hover:text-emerald-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
