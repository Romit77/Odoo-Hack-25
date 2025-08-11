import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  MapPin,
  LogIn,
  User,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { MotionDiv, MotionNav } from "../common/MotionWrapper";
import {
  fadeInDown,
  staggerContainer,
  staggerItem,
} from "../../utils/animations";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get authentication state from Redux
  const { isLoggedIn, token } = useSelector((state) => state.auth);

  // Debug logs
  console.log("Navbar - isLoggedIn:", isLoggedIn);
  console.log("Navbar - token:", token);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:user");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Courts", href: "/turfs", icon: MapPin },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <MotionNav
      initial="initial"
      animate="animate"
      variants={fadeInDown}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <MotionDiv
            variants={staggerItem}
            className="flex items-center space-x-3"
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="QuickCourt"
                  className="h-10 w-10 rounded-xl transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary-500/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300" />
              </div>
              <span className="text-2xl font-bold font-display text-white">
                Quick<span className="text-gradient">Court</span>
              </span>
            </Link>
          </MotionDiv>

          {/* Desktop Navigation */}
          <MotionDiv
            variants={staggerContainer}
            className="hidden lg:flex items-center space-x-8"
          >
            {navigation.map((item) => (
              <MotionDiv key={item.name} variants={staggerItem}>
                <Link
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? "bg-primary-500 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-primary-500/10"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              </MotionDiv>
            ))}
          </MotionDiv>

          {/* Desktop Auth Buttons */}
          <MotionDiv
            variants={staggerContainer}
            className="hidden lg:flex items-center space-x-4"
          >
            {isLoggedIn ? (
              // Authenticated user buttons
              <>
                <MotionDiv variants={staggerItem}>
                  <Link
                    to="/auth/profile"
                    className="btn-ghost-modern flex items-center space-x-2"
                  >
                    <UserCircle className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </MotionDiv>
                <MotionDiv variants={staggerItem}>
                  <button
                    onClick={handleLogout}
                    className="btn-ghost-modern flex items-center space-x-2 text-red-400 hover:text-red-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </MotionDiv>
              </>
            ) : (
              // Guest user buttons
              <>
                <MotionDiv variants={staggerItem}>
                  <Link
                    to="/login"
                    className="btn-ghost-modern flex items-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </MotionDiv>
                <MotionDiv variants={staggerItem}>
                  <Link
                    to="/signup"
                    className="btn-primary-modern flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </MotionDiv>
              </>
            )}
          </MotionDiv>

          {/* Mobile Menu Button */}
          <MotionDiv variants={staggerItem} className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-surface-light/50 text-gray-300 hover:text-white hover:bg-primary-500/20 transition-all duration-300"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </MotionDiv>
        </div>

        {/* Mobile Navigation */}
        <MotionDiv
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden"
        >
          <div className="glass-dark rounded-xl p-6 mt-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? "bg-primary-500 text-white"
                    : "text-gray-300 hover:text-white hover:bg-primary-500/10"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}

            <div className="border-t border-border pt-4 space-y-3">
              {isLoggedIn ? (
                // Authenticated user buttons
                <>
                  <Link
                    to="/auth/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-primary-500/10 transition-all duration-300"
                  >
                    <UserCircle className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                // Guest user buttons
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-primary-500/10 transition-all duration-300"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 btn-primary-modern w-full"
                  >
                    <User className="w-5 h-5" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionNav>
  );
};

export default Navbar;
