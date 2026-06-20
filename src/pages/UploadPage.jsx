import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

export default function UploadPage() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage(
        "Please select a photo first."
      );
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "image",
        selectedFile
      );

      const response =
        await api.post(
          "/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setMessage(
        response.data.message
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data
          ?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eceee3] p-6">

      <div className="max-w-xl mx-auto wedding-card p-8">

        <h1 className="text-4xl font-bold text-center text-[#445c3f] mb-2">
          Upload Wedding Photo
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Share your beautiful memories with us.
        </p>

        {/* Upload Button */}

        <label
          htmlFor="imageUpload"
          className="btn-primary w-full flex justify-center items-center py-4 cursor-pointer mb-6"
        >
          Take a Photo
        </label>

        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* File Name */}

        {selectedFile && (
          <div className="text-center mb-4 text-[#445c3f] font-medium">
            {selectedFile.name}
          </div>
        )}

        {/* Preview */}

        {selectedFile && (
          <div className="mb-6">

            <img
              src={URL.createObjectURL(
                selectedFile
              )}
              alt="Preview"
              className="rounded-2xl shadow-lg max-h-96 mx-auto"
            />

          </div>
        )}

        {/* Upload Button */}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading
            ? "Uploading..."
            : "Upload Photo"}
        </button>

        {/* Message */}

        {message && (
          <div className="mt-4 text-center text-[#445c3f] font-medium">
            {message}
          </div>
        )}

        {/* Navigation */}

        <div className="grid grid-cols-2 gap-4 mt-8">

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="btn-secondary"
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/gallery")
            }
            className="btn-secondary"
          >
            Gallery
          </button>

        </div>

      </div>

    </div>
  );
}