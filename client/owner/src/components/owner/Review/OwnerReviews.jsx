import { Star } from "lucide-react";
import useOwnerReviews from "@hooks/owner/useOwnerReviews";
import ReviewsSkeleton from "./ReviewSkeleton";
const OwnerReviews = () => {
  const { turfs, selectedTurf, setSelectedTurf, loading, error } =
    useOwnerReviews();

  if (loading) return <ReviewsSkeleton />;
  if (error) return <div className="text-error p-4">{error}</div>;

  return (
    <div className="bg-white min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Turf Reviews</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <ul className="bg-gray-50 rounded-xl shadow-sm p-4 space-y-2">
              {turfs.map((turf) => (
                <li key={turf.id}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTurf === turf.id
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSelectedTurf(turf.id)}
                  >
                    <span>{turf.name}</span>
                    <span className="ml-2 text-yellow-500 font-semibold">
                      <Star size={14} className="inline mr-1" />
                      {turf.avgRating.toFixed(1)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-2/3">
            {selectedTurf ? (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {turfs.find((t) => t.id === selectedTurf).name} Reviews
                </h2>
                <div className="space-y-4">
                  {turfs
                    .find((t) => t.id === selectedTurf)
                    ?.reviews?.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-50 rounded-xl shadow-sm p-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-lg">
                            {review.userName}
                          </h3>
                          <div className="flex items-center">
                            <Star size={16} className="text-yellow-400 mr-1" />
                            <span className="font-bold">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-12">
                Select a turf to view reviews.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerReviews;
