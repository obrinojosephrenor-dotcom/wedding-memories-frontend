import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">

      <div className="wedding-card max-w-2xl w-full p-10 text-center">

        <p className="text-gray-500 uppercase tracking-[0.3em] mb-4">
          Our Wedding Memories
        </p>

        <h1 className="text-5xl font-bold text-[#445c3f] mb-4">
          Nikki
        </h1>

        <p className="text-3xl text-gray-500 mb-4">
          &
        </p>

        <h1 className="text-5xl font-bold text-[#445c3f] mb-8">
          Michael
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for celebrating our
          special day with us.
          Share your photos and help us
          preserve every beautiful memory.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">

          <Link
            to="/register"
            className="btn-primary"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="btn-secondary"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}