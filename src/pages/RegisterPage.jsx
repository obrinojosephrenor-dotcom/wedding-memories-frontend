import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/register",
        formData
      );

      alert(
        `Registration Successful!\n\nAccess Code: ${response.data.accessCode}`
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eceee3]">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Register Guest
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-xl mb-4"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            className="w-full p-3 border rounded-xl mb-4"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}