import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Github, Twitter, Instagram } from "lucide-react";
import { MotionDiv, MotionFooter } from "../common/MotionWrapper";
import { staggerContainer, staggerItem } from "../../utils/animations";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
    ],
    services: [
      { name: "Find Turfs", href: "/turfs" },
      { name: "Book Online", href: "/booking" },
      { name: "List Your Turf", href: "/owner/signup" },
      { name: "Support", href: "/support" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refund" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "GitHub", icon: Github, href: "https://github.com/RijoKsd" },
  ];

  return (
    <MotionFooter
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="bg-surface border-t border-border"
    >
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <MotionDiv
          variants={staggerContainer}
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-8"
        >
          <MotionDiv variants={staggerItem} className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/logo.png"
                alt="TurfSpot"
                className="h-10 w-10 rounded-xl"
              />
              <span className="text-2xl font-bold font-display text-white">
                Quick<span className="text-gradient">Court</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting sports enthusiasts with premium turf facilities. Book
              your perfect game today and experience the difference.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-sm">Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-sm">hello@QuickCourt.com</span>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv variants={staggerItem}>
            <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </MotionDiv>

          <MotionDiv variants={staggerItem}>
            <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </MotionDiv>

          {/* Legal Links */}
          <MotionDiv variants={staggerItem}>
            <h3 className="text-lg font-semibold text-white mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </MotionDiv>
        </MotionDiv>

        {/* Newsletter Section */}
        <MotionDiv
          variants={staggerItem}
          className="mt-16 pt-8 border-t border-border"
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-6">
              Get the latest updates on new turfs and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-modern flex-1 rounded-r-none"
              />
              <button className="btn-primary-modern rounded-l-none mx-4">
                Subscribe
              </button>
            </div>
          </div>
        </MotionDiv>
      </div>

      <MotionDiv
        variants={staggerItem}
        className="bg-surface-light border-t border-border"
      >
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </MotionDiv>
    </MotionFooter>
  );
};

export default Footer;
