import React, { useState, useEffect } from "react";
import axios from "axios";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(photos);
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        setPhotos(response.data.slice(0, 20));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch photos");
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Loading state
  if (loading) {
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  }

  // Error state
  if (error) {
    return <p className="text-center text-lg text-red-600">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Photo Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-auto rounded-md mb-4"
            />
            <p className="text-sm text-gray-700 truncate">{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
