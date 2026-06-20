import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { saveToken } from "../services/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [mobile, setMobile] =
    useState("");

  const [accessCode, setAccessCode] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        {
          mobile,
          accessCode,
        }
      );

      saveToken(response.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eceee3]">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Guest Login
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full p-3 border rounded-xl mb-4"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Access Code"
            className="w-full p-3 border rounded-xl mb-4"
            value={accessCode}
            onChange={(e) =>
              setAccessCode(e.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}