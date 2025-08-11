import { Link } from "react-router-dom";
import { Carousel, Footer } from "@components/common";
import banner1 from "/banner-1.png";
import banner2 from "/banner-2.jpeg";
import banner3 from "/banner-3.jpeg";

const Home = () => {
  const slides = [banner1, banner2, banner3];
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-5xl mx-auto">
          <div className="w-full">
            <Carousel slides={slides} />
          </div>
          <div className="w-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to TurfSpot
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              Discover and book the best turf fields in your area. Whether
              you're planning a casual game or a tournament, TurfSpot has got
              you covered.
            </p>
            <Link to="/login">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition font-semibold">
                Login
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

