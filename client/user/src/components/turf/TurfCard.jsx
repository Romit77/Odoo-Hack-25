import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Clock, MapPin, Star, Users } from "lucide-react";
import { MotionDiv } from "../common/MotionWrapper";
import { hoverFloat, scaleIn } from "../../utils/animations";

const TurfCard = ({ turf }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <MotionDiv
      variants={scaleIn}
      whileHover={hoverFloat.whileHover}
      className="group relative"
    >
      <div className="card-modern overflow-hidden">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <img
            src={turf.image}
            alt={turf.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-white">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.8</span>
              </div>
              <div className="flex items-center space-x-1 bg-accent-500 px-2 py-1 rounded-full text-white text-xs font-medium">
                <Users className="w-3 h-3" />
                <span>Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
              {turf.name}
            </h3>

            <div className="flex items-center space-x-2 text-gray-400 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{turf.location || "Location"}</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-400 mb-4">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {turf.openTime} - {turf.closeTime}
              </span>
            </div>
          </div>

          {/* Sport Types */}
          <div className="flex flex-wrap gap-2">
            {turf.sportTypes.slice(0, 3).map((sport, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-medium border border-primary-500/30"
              >
                {sport}
              </span>
            ))}
            {turf.sportTypes.length > 3 && (
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium">
                +{turf.sportTypes.length - 3} more
              </span>
            )}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="text-2xl font-bold text-white">
                ₹{turf.price || "500"}
              </span>
              <span className="text-gray-400 text-sm ml-1">/hour</span>
            </div>

            <Link
              to={isLoggedIn ? `/auth/turf/${turf._id}` : `/turf/${turf._id}`}
              className="btn-primary-modern group/btn text-sm"
            >
              View Details
              {/* <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" /> */}
            </Link>
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10" />
        </div>
      </div>
    </MotionDiv>
  );
};

export default TurfCard;
