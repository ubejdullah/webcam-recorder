import React, { useRef, useEffect, useState } from 'react';
import { SlUser } from 'react-icons/sl';  // Importiere das SlUser Icon
import Draggable from 'react-draggable';  // Importiere die Draggable-Komponente
import Pin from '../UI/Pin.jsx'; // Importiere den Pin aus dem Ordner ui-elements
import '/src/design/CamVideo.css'; // Deine CSS-Styles für die CamVideo-Komponente

const CamVideo = () => {
  const canvasRef = useRef(null);  // Referenz für das Canvas
  const videoRef = useRef(null);   // Referenz für das externe Video
  const [brightness, setBrightness] = useState(100);
  const [onlineUsers, setOnlineUsers] = useState(1);  // Statisch auf 1 gesetzt
  const [isFixed, setIsFixed] = useState(true); // Zustand für Fixierung des Containers
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Position des Containers für das Draggen

  useEffect(() => {
    // Lade das externe Video in das Video-Element
    const videoElement = videoRef.current;
    videoElement.src = "https://fuzzy-space-halibut-5gqp94r657wqc4p4w-5000.app.github.dev/video_feed";
    videoElement.play();

    // Stelle sicher, dass das Video erst geladen wird
    videoElement.onloadeddata = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const drawVideoToCanvas = () => {
        if (videoElement && canvas) {
          // Leere das Canvas
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.filter = `brightness(${brightness}%)`;  // Filter anwenden
          // Zeichne das Video auf das Canvas
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        }
        requestAnimationFrame(drawVideoToCanvas);  // Nächster Frame
      };

      drawVideoToCanvas(); // Starte das Zeichnen des Videos
    };

    // Wenn das Video zu Ende ist, starten wir es wieder
    videoElement.onended = () => {
      videoElement.play();  // Starte das Video wieder, wenn es zu Ende ist
    };

    return () => {
      // Wenn das Component unmontiert wird, stoppen wir das Video
      videoElement.pause();
    };
  }, [brightness]);

  const handleBrightnessChange = (event) => {
    setBrightness(event.target.value);  // Helligkeit ändern
  };

  const toggleFixation = () => {
    setIsFixed(!isFixed); // Toggle zwischen fixiert und nicht fixiert
  };

  const handleDrag = (e, data) => {
    if (!isFixed) {
      setPosition({ x: data.x, y: data.y }); // Nur verschieben, wenn der Pin nicht fixiert ist
    }
  };

  return (
    <Draggable
      position={position}
      onDrag={handleDrag}
      disabled={isFixed} // Wenn fixiert, dann kann nicht mehr gezogen werden
    >
      <div className={`container ${brightness === 100 ? '' : 'recording'}`}>
        <Pin onClick={toggleFixation} isFixed={isFixed} />
        
        {/* Anzeige für Online-Nutzer */}
        <div className="online-users-container">
          <SlUser className="icon" size={24} />
          <span className="online-users-count">Online: {onlineUsers} Nutzer</span>
        </div>

        {/* Canvas, auf dem der externe Video-Feed gezeichnet wird */}
        <canvas
          ref={canvasRef}
          id="canvas"
          className="video"
          style={{
            filter: `brightness(${brightness}%)`,  // Helligkeitseinstellung anwenden
          }}
        ></canvas>

        <video
          ref={videoRef}
          style={{ display: 'none' }}  // Video ist unsichtbar, da wir es nur als Quelle für das Canvas verwenden
        />

        <div className="controls">
          <label htmlFor="brightness" className="brightness-label">
            Helligkeit: {brightness}%
          </label>
          <input
            type="range"
            id="brightness"
            min="0"
            max="200"
            value={brightness}
            onChange={handleBrightnessChange}
            className="brightness-slider"
          />
        </div>
      </div>
    </Draggable>
  );
};

export default CamVideo;
