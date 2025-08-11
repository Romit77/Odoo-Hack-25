import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../hooks/useAxiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(useLocation().search);
  const email = params.get("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/user/auth/verify-otp", {
        email,
        otp,
      });
      toast.success(data.message);
      dispatch(login(data.token));
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;
      navigate("/auth", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-4">
      <form
        onSubmit={handleSubmit}
        className="glass-dark p-8 rounded-xl space-y-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          Verify OTP
        </h2>
        <p className="text-gray-400 text-center text-sm">
          Enter the 6-digit code sent to your phone for {email}
        </p>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="input-modern w-full text-center tracking-widest text-xl"
          placeholder="XXXXXX"
        />
        <button
          disabled={loading || otp.length !== 6}
          type="submit"
          className="btn-primary-modern w-full"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}
