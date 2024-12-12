import React, { useState } from 'react';
import '/src/design/MediaLibrary.css';

function MediaLibrary({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0); // Aktueller Index des gezeigten Inhalts

  const mediaItems = [
    { type: 'image', src: 'https://via.placeholder.com/600x400.png?text=Bild+1', alt: 'Bild 1' },
    { type: 'image', src: 'https://via.placeholder.com/600x400.png?text=Bild+2', alt: 'Bild 2' },
    { type: 'video', src: 'https://www.w3schools.com/html/movie.mp4', alt: 'Video 1' },
    { type: 'video', src: 'https://www.w3schools.com/html/movie.mp4', alt: 'Video 2' }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
  };

  return (
    <div className="media-library">
      <div className="media-container">
        {mediaItems[currentIndex].type === 'image' ? (
          <img src={mediaItems[currentIndex].src} alt={mediaItems[currentIndex].alt} className="media-item" />
        ) : (
          <video controls className="media-item">
            <source src={mediaItems[currentIndex].src} type="video/mp4" />
            Dein Browser unterstützt dieses Videoformat nicht.
          </video>
        )}
      </div>
      <div className="media-controls">
        <button onClick={handlePrevious} className="control-btn">←</button>
        <button onClick={handleNext} className="control-btn">→</button>
        <button onClick={onClose} className="close-btn">Schließen</button>
      </div>
    </div>
  );
}

export default MediaLibrary;
