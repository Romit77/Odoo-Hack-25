const TurfCardSkeleton = () => {
  return (
    <div className="card-modern animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-t-xl"></div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title and Location */}
        <div className="space-y-3">
          <div className="h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg w-3/4"></div>
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded w-2/3"></div>
        </div>

        {/* Sport Types */}
        <div className="flex space-x-2">
          <div className="h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full w-16"></div>
          <div className="h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full w-20"></div>
          <div className="h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full w-12"></div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="h-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded w-20"></div>
          <div className="h-10 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default TurfCardSkeleton;
