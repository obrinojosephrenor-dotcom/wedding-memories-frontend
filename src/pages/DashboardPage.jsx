import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { logout } from "../services/auth";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response =
        await api.get("/auth/me");

      setGuest(response.data.guest);
    } catch (error) {
      console.error(error);

      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Dashboard...
      </div>
    );
  }

  const percentage =
    (guest.upload_count / 25) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-blue-100 p-6">

      <div className="max-w-2xl mx-auto">

        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-center mb-2">
            Our Wedding Memories
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Thank you for celebrating with us 💕
          </p>

          <div className="bg-[#eceee3] rounded-2xl p-6 mb-6">

            <h2 className="text-2xl font-semibold">
              Welcome,
            </h2>

            <h3 className="text-3xl font-bold text-pink-600">
              {guest.name}
            </h3>

            <p className="mt-2 text-gray-600">
              Mobile:
              {" "}
              {guest.mobile}
            </p>

          </div>

          <div className="bg-white border rounded-2xl p-6 mb-6">

            <div className="flex justify-between mb-2">

              <span className="font-medium">
                Photos Uploaded
              </span>

              <span>
                {guest.upload_count} / 25
              </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">

              <div
                className="bg-[#7d936c]h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>

            <p className="mt-3 text-sm text-gray-500">
              Remaining uploads:
              {" "}
              {25 - guest.upload_count}
            </p>

          </div>

          <div className="grid gap-4">

            <button
            onClick={() =>
              navigate("/upload")
            }
            className="btn-primary w-full"
          >
             Upload Photos
            </button>

            <button
            onClick={() =>
              navigate("/gallery")
            }
            className="btn-secondary w-full"
          >
              View My Gallery
            </button>

            <button
            onClick={handleLogout}
            className="btn-danger w-full"
          >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}