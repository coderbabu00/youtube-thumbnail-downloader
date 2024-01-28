import React, { useState } from 'react';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrls, setThumbnailUrls] = useState(null);

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:5009/getThumbnail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl }),
      });

      const data = await response.json();
      setThumbnailUrls(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">YouTube Thumbnail Downloader</h1>
        <input
          type="text"
          placeholder="Enter YouTube Video URL"
          className="w-full border p-2 mb-4 rounded-md"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Download Thumbnail
        </button>
        {thumbnailUrls && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Thumbnail Previews</h2>
            <div className="flex flex-wrap gap-4">
              {Object.keys(thumbnailUrls).map((resolution) => (
                <div key={resolution} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4">
                  <h3 className="text-md font-medium mb-1">{resolution} Resolution:</h3>
                  <img
                    src={thumbnailUrls[resolution]}
                    alt={`${resolution} Thumbnail`}
                    className="w-full h-auto rounded-md shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
