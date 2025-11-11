import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Upslash() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch photos from Unsplash API
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.unsplash.com/users/bfurkan/photos', {
          headers: {
            Authorization: `Client-ID qccnojQknHvh8uti0Xx_p8aWEYdIoSA5PrazapoIf84`, // Replace with your Unsplash Access Key
          },
          params: {
            query: 'nature', // Change this query to pull specific types of photos
            per_page: 12,    // Number of photos to fetch per request
            page: page,      // Page number for pagination
          },
        });

        // Filter out duplicates before updating the state
        setPhotos((prevPhotos) => {
          const newPhotos = response.data.filter(
            (newPhoto) => !prevPhotos.some((prevPhoto) => prevPhoto.id === newPhoto.id)
          );
          return [...prevPhotos, ...newPhotos];
        });
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
      setLoading(false);
    };

    fetchPhotos();
  }, [page]);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Unsplash Images Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white p-4 shadow-md rounded-lg">
            {/* Link the image to the photo's Unsplash page */}
            <a href={photo.links.html} target="_blank" rel="noopener noreferrer">
              <img src={photo.urls.small} alt={photo.description || 'Unsplash Image'} className="w-full h-auto rounded" />
            </a>
            <p className="mt-2 text-sm text-gray-700">{photo.description || ''}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
          >
            Load More Photos
          </button>
        )}
      </div>
    </div>
  );
}

export default Upslash;
