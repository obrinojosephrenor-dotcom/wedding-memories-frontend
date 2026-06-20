import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  getAdminToken,
  removeAdminToken,
} from "../services/adminAuth";

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] =
    useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response =
       await api.get(
        "/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${getAdminToken()}`,
            },
          }
        );

      setDashboard(response.data);
    } catch (error) {
      console.error(error);

      navigate("/admin/login");
    }
  };

  const handleLogout = () => {
    removeAdminToken();

    navigate("/admin/login");
  };

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eceee3] p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-[#445c3f]">
          Wedding Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="btn-danger"
        >
          Logout
        </button>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="section-card">

          <h2 className="text-lg font-semibold text-gray-600">
            Total Guests
          </h2>

          <p className="text-5xl font-bold text-[#445c3f]">
            {
              dashboard.stats
                .totalGuests
            }
          </p>

        </div>

        <div className="section-card">

          <h2 className="text-lg font-semibold text-gray-600">
            Total Photos
          </h2>

          <p className="text-5xl font-bold text-[#445c3f]">
            {
              dashboard.stats
                .totalPhotos
            }
          </p>

        </div>

      </div>

      {/* Guest Table */}

      <div className="section-card mb-8">

        <h2 className="text-2xl font-bold mb-4 text-[#445c3f]">
          Registered Guests
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Name
                </th>

                <th className="text-left p-3">
                  Mobile
                </th>

                <th className="text-left p-3">
                  Uploads
                </th>

              </tr>

            </thead>

            <tbody>

              {dashboard.guests.map(
                (guest) => (
                  <tr
                    key={guest.id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {guest.name}
                    </td>

                    <td className="p-3">
                      {guest.mobile}
                    </td>

                    <td className="p-3">
                      {
                        guest.upload_count
                      }
                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Recent Uploads */}

      <div className="section-card">

        <h2 className="text-2xl font-bold mb-4 text-[#445c3f]">
          Recent Uploads
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {dashboard.photos.map(
            (photo) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-xl shadow"
              >
                <img
                  src={
                    photo.image_url
                  }
                  alt="Wedding"
                  className="w-full h-48 object-cover"
                />
              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}