import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useSelector((state) => state?.auth);

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "owner") {
        navigate("/owner", { replace: true });
      } else if (role === "admin") {
        navigate("/admin", { replace: true });
      }
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="min-h-screen bg-[#0a0d1a] text-[#e2e8f0] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to TurfSpot</h1>
        <p className="text-lg mb-6">
          Discover and book the best turf fields in your area.
        </p>
        <p className="text-sm text-gray-400">
          Whether you're planning a casual game or a tournament, TurfSpot has
          got you covered.
        </p>
        <div className="mt-8">
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-[#e2e8f0] px-6 py-3 rounded-lg font-semibold shadow hover:from-[#4f46e5] hover:to-[#6366f1] transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedRedirect;

