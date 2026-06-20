import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import {
  saveAdminToken,
} from "../services/adminAuth";

export default function AdminLoginPage() {
  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await api.post(
            "/admin/login",
            {
              username,
              password,
            }
          );

        saveAdminToken(
          response.data.token
        );

        navigate(
          "/admin/dashboard"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Login failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">

      <div className="wedding-card max-w-md w-full p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Admin Login
        </h1>

        <form
          onSubmit={handleLogin}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full p-3 border rounded-xl mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full p-3 border rounded-xl mb-4"
          />

          <button
            type="submit"
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