import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

export default function GalleryPage() {
  const [photos, setPhotos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const response =
        await api.get(
          "/upload/my-photos"
        );

      setPhotos(
        response.data.photos
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Gallery...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eceee3] p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        My Wedding Gallery
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >

            <img
              src={
                photo.image_url
              }
              alt="Wedding"
              className="w-full"
            />

            <div className="p-3">

              <a
                href={
                  photo.image_url
                }
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                View Full Image
              </a>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}