import axios from "axios";

const api = axios.create({
  baseURL:
    "https://wedding-memories-backend.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    // Only add guest token if
    // Authorization header does not already exist
    if (
      token &&
      !config.headers.Authorization
    ) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export default api;