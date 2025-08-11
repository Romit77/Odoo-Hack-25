import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import useLoginForm from "../../hooks/useLoginForm";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "../../components/common/MotionWrapper";
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
} from "../../utils/animations";

const Login = () => {
  const { register, handleSubmit, errors, onSubmit, loading } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MotionDiv
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="min-h-screen bg-gradient-dark flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <MotionDiv variants={fadeInLeft} className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <MotionDiv
              variants={staggerItem}
              className="flex items-center space-x-3"
            >
              <Sparkles className="w-8 h-8 text-primary-400" />
              <span className="text-primary-400 font-semibold text-lg">
                Welcome Back
              </span>
            </MotionDiv>

            <MotionH1
              variants={staggerItem}
              className="text-5xl lg:text-6xl font-bold font-display"
            >
              <span className="text-white">Continue Your</span>
              <br />
              <span className="text-gradient">Sports Journey</span>
            </MotionH1>

            <MotionP
              variants={staggerItem}
              className="text-xl text-gray-400 leading-relaxed"
            >
              Access your account to book amazing turf facilities, track your
              games, and connect with the sports community.
            </MotionP>
          </div>

          <MotionDiv variants={staggerItem} className="grid grid-cols-2 gap-6">
            <div className="glass-dark p-6 rounded-xl">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                10K+
              </div>
              <div className="text-gray-400">Happy Users</div>
            </div>
            <div className="glass-dark p-6 rounded-xl">
              <div className="text-3xl font-bold text-accent-400 mb-2">
                500+
              </div>
              <div className="text-gray-400">Turf Fields</div>
            </div>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv variants={fadeInRight}>
          <div className="glass-dark p-8 lg:p-12 rounded-2xl">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-white font-display">
                  Sign In
                </h2>
                <p className="text-gray-400">
                  Enter your credentials to access your account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <MotionDiv variants={staggerItem} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 p-3" />
                    <input
                      {...register("email")}
                      type="email"
                      className={`input-modern pl-12 ${
                        errors.email ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </MotionDiv>

                <MotionDiv variants={staggerItem} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      className={`input-modern pl-12 pr-12 ${
                        errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </MotionDiv>

                <MotionDiv
                  variants={staggerItem}
                  className="flex items-center justify-between"
                >
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-500 bg-surface-light border-border rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-400">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </MotionDiv>

                <MotionDiv variants={staggerItem}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary-modern w-full group relative overflow-hidden"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="spinner mr-2" />
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Sign In
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </button>
                </MotionDiv>
              </form>

              <MotionDiv variants={staggerItem} className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 text-gray-400 bg-surface">
                    New to QuickCourt?
                  </span>
                </div>
              </MotionDiv>

              <MotionDiv variants={staggerItem} className="text-center">
                <p className="text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                  >
                    Create one now
                  </Link>
                </p>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default Login;
