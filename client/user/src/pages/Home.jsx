import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronRight, MapPin, Clock, Users, Star } from "lucide-react";
import Carousel from "../components/common/Carousel";
import Footer from "../components/layout/Footer";
import useTurfData from "../hooks/useTurfData";
import TurfCard from "../components/turf/TurfCard";
import TurfCardSkeleton from "../components/ui/TurfCardSkeleton";
import {
  MotionDiv,
  MotionH1,
  MotionP,
  MotionSection,
} from "../components/common/MotionWrapper";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
} from "../utils/animations";
import banner1 from "/banner-1.png";
import banner2 from "/banner-2.jpeg";
import banner3 from "/banner-3.jpeg";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { turfs, loading } = useTurfData();
  const slides = [banner1, banner2, banner3];

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Find Nearby Courts",
      description:
        "Discover premium turf fields in your area with real-time availability",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Booking",
      description:
        "Book your slot in seconds with our streamlined booking system",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description:
        "Join thousands of sports enthusiasts and find your perfect match",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Only the highest rated and well-maintained turf fields",
    },
  ];

  return (
    <MotionDiv
      className="min-h-screen bg-gradient-dark text-gray-100"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Hero Section */}
      <MotionSection
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        variants={fadeInUp}
      >
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-light to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <MotionDiv variants={fadeInLeft} className="space-y-8">
              <div className="space-y-6">
                <MotionH1 className="text-6xl lg:text-7xl font-bold font-display">
                  <span className="text-gradient">Discover</span>
                  <br />
                  <span className="text-white">Perfect Courts</span>
                </MotionH1>

                <MotionP className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Find and book premium turf fields in your area. Whether
                  you&apos;re planning a casual game or organizing a tournament,
                  QuickCourt connects you with the best sports facilities.
                </MotionP>
              </div>

              <MotionDiv className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={isLoggedIn ? "/auth/turfs" : "/signup"}
                  className="btn-primary-modern group"
                >
                  Get Started
                  {/* <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" /> */}
                </Link>
                <Link to="/about" className="btn-ghost-modern">
                  Learn More
                </Link>
              </MotionDiv>

              {/* Stats */}
              <MotionDiv className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400">
                    500+
                  </div>
                  <div className="text-sm text-gray-400">Turf Fields</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-400">10K+</div>
                  <div className="text-sm text-gray-400">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400">50+</div>
                  <div className="text-sm text-gray-400">Cities</div>
                </div>
              </MotionDiv>
            </MotionDiv>

            {/* Right Content - Carousel */}
            <MotionDiv variants={fadeInRight} className="relative">
              <div className="relative rounded-2xl overflow-hidden glass-dark p-4">
                <Carousel slides={slides} />
              </div>

              {/* Floating elements */}
              <MotionDiv
                className="absolute -top-6 -right-6 w-24 h-24 bg-primary-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <MotionDiv
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </MotionDiv>
          </div>
        </div>
      </MotionSection>

      {/* Features Section */}
      <MotionSection className="py-24 relative" variants={fadeInUp}>
        <div className="container mx-auto px-6 lg:px-8">
          <MotionDiv className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
              Why Choose <span className="text-gradient">QuickCourt</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the future of sports facility booking with our
              cutting-edge platform
            </p>
          </MotionDiv>

          <MotionDiv
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <MotionDiv
                key={index}
                className="card-modern group text-center"
                variants={staggerItem}
                whileHover={{ y: -5 }}
              >
                <div className="text-primary-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Featured Turfs Section */}
      <MotionSection className="py-24 bg-surface/50" variants={fadeInUp}>
        <div className="container mx-auto px-6 lg:px-8">
          <MotionDiv
            className="flex justify-between items-center mb-12"
            variants={fadeInUp}
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4">
                Featured <span className="text-gradient">Courts</span>
              </h2>
              <p className="text-xl text-gray-400">
                Discover our most popular and highly-rated turf fields
              </p>
            </div>
            <Link
              to={isLoggedIn ? "/auth/turfs" : "/signup"}
              className="btn-ghost-modern hidden lg:flex"
            >
              View All
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </MotionDiv>

          <MotionDiv
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <MotionDiv key={`skeleton-${index}`} variants={staggerItem}>
                    <TurfCardSkeleton />
                  </MotionDiv>
                ))
              : turfs.slice(0, 3).map((turf) => (
                  <MotionDiv key={turf._id} variants={staggerItem}>
                    <TurfCard turf={turf} />
                  </MotionDiv>
                ))}
          </MotionDiv>

          <MotionDiv
            className="text-center mt-12 lg:hidden"
            variants={fadeInUp}
          >
            <Link
              to={isLoggedIn ? "/auth/turfs" : "/signup"}
              className="btn-primary-modern"
            >
              View All Courts
            </Link>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* CTA Section */}
      <MotionSection
        className="py-24 relative overflow-hidden"
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <MotionDiv
            className="text-center max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
              Ready to Play?{" "}
              <span className="text-gradient">Join QuickCourt</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Start your journey with us today and experience seamless turf
              booking like never before. Join thousands of sports enthusiasts
              who trust QuickCourt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={isLoggedIn ? "/auth/turfs" : "/signup"}
                className="btn-primary-modern text-lg px-8 py-4"
              >
                Start Booking Now
              </Link>
              <Link
                to="/contact"
                className="btn-ghost-modern text-lg px-8 py-4"
              >
                Contact Us
              </Link>
            </div>
          </MotionDiv>
        </div>
      </MotionSection>

      <Footer />
    </MotionDiv>
  );
};

export default Home;
