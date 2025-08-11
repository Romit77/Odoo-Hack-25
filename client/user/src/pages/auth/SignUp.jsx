import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import useSignUpForm from "../../hooks/useSignUpForm";
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

const SignUp = () => {
  const { register, handleSubmit, errors, onSubmit, loading } = useSignUpForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const benefits = [
    "Book premium turf facilities instantly",
    "Access exclusive member discounts",
    "Track your booking history",
    "Join sports communities",
    "Get personalized recommendations",
  ];

  return (
    <MotionDiv
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="min-h-screen bg-gradient-dark flex items-center justify-center p-4"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Side - Welcome Content */}
        <MotionDiv variants={fadeInLeft} className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <MotionDiv
              variants={staggerItem}
              className="flex items-center space-x-3"
            >
              <Sparkles className="w-8 h-8 text-primary-400" />
              <span className="text-primary-400 font-semibold text-lg">
                Join QuickCourt
              </span>
            </MotionDiv>

            <MotionH1
              variants={staggerItem}
              className="text-5xl lg:text-6xl font-bold font-display"
            >
              <span className="text-white">Start Your</span>
              <br />
              <span className="text-gradient">Sports Adventure</span>
            </MotionH1>

            <MotionP
              variants={staggerItem}
              className="text-xl text-gray-400 leading-relaxed"
            >
              Create your account and unlock access to the best turf facilities
              in your area. Connect, play, and be part of the growing sports
              community.
            </MotionP>
          </div>

          {/* Benefits List */}
          <MotionDiv variants={staggerContainer} className="space-y-4">
            {benefits.map((benefit, index) => (
              <MotionDiv
                key={index}
                variants={staggerItem}
                className="flex items-center space-x-3"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">{benefit}</span>
              </MotionDiv>
            ))}
          </MotionDiv>

          <MotionDiv
            variants={staggerItem}
            className="glass-dark p-6 rounded-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">10K+</div>
                <div className="text-sm text-gray-400">Members</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-400">500+</div>
                <div className="text-sm text-gray-400">Courts</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">50+</div>
                <div className="text-sm text-gray-400">Cities</div>
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>

        {/* Right Side - SignUp Form */}
        <MotionDiv variants={fadeInRight}>
          <div className="glass-dark p-8 lg:p-12 rounded-2xl">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-white font-display">
                  Create Account
                </h2>
                <p className="text-gray-400">
                  Join thousands of sports enthusiasts today
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <MotionDiv variants={staggerItem} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("name")}
                      type="text"
                      className={`input-modern pl-12 ${
                        errors.name ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </MotionDiv>

                {/* Email Field */}
                <MotionDiv variants={staggerItem} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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

                {/* Phone Field */}
                <MotionDiv variants={staggerItem} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("phone")}
                      type="text"
                      className={`input-modern pl-12 ${
                        errors.phone ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                      placeholder="Enter phone with country code"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </MotionDiv>

                {/* Password Field */}
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
                      placeholder="Create a password"
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

                {/* Confirm Password Field */}
                <MotionDiv variants={staggerItem} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      className={`input-modern pl-12 pr-12 ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </MotionDiv>

                {/* Terms and Conditions */}
                <MotionDiv variants={staggerItem}>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-500 bg-surface-light border-border rounded focus:ring-primary-500 mt-1"
                      required
                    />
                    <span className="text-sm text-gray-400 leading-relaxed">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-primary-400 hover:text-primary-300"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-primary-400 hover:text-primary-300"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </MotionDiv>

                {/* Submit Button */}
                <MotionDiv variants={staggerItem}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary-modern w-full group relative overflow-hidden"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="spinner mr-2" />
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Create Account
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </button>
                </MotionDiv>
              </form>

              {/* Divider */}
              <MotionDiv variants={staggerItem} className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 text-gray-400 bg-surface">
                    Already have an account?
                  </span>
                </div>
              </MotionDiv>

              {/* Login Link */}
              <MotionDiv variants={staggerItem} className="text-center">
                <p className="text-gray-400">
                  <Link
                    to="/login"
                    className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                  >
                    Sign in to your account
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

export default SignUp;
