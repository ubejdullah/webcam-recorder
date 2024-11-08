import React, { useRef, useEffect, useState } from 'react';
import { SlUser } from 'react-icons/sl';  // Importiere das SlUser Icon
import Draggable from 'react-draggable';  // Importiere die Draggable-Komponente
import Pin from '../UI/Pin.jsx'; // Importiere den Pin aus dem Ordner ui-elements
import '/src/design/CamVideo.css'; // Deine CSS-Styles für die CamVideo-Komponente

const CamVideo = () => {
  const [brightness, setBrightness] = useState(100);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(1);  // Statisch auf 1 gesetzt
  const [isFixed, setIsFixed] = useState(true); // Zustand für Fixierung des Containers
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Position des Containers für das Draggen

  const [imageSrc, setImageSrc] = useState(null);  // Zum Speichern der MJPEG-Stream-Bilder

  useEffect(() => {
    const image = new Image();
    image.src = "http://10.50.25.246:7123/stream.mjpg";  // Stream-URL

    image.onload = () => {
      setImageSrc(image.src);  // Wenn das Bild geladen wurde, setzen wir es als Quelle
    };

    // Wiederhole das Laden des nächsten Frames (MJPEG Stream)
    const intervalId = setInterval(() => {
      image.src = "http://10.50.25.246:7123/stream.mjpg?" + new Date().getTime(); // Verhindert Caching
    }, 100); // Intervall für das Abrufen neuer Bilder (typisch für MJPEG)

    return () => {
      clearInterval(intervalId);  // Stoppe das Intervall bei der Entladung des Komponents
    };
  }, []);

  const handleBrightnessChange = (event) => {
    setBrightness(event.target.value);
  };

  const startRecording = () => {
    const stream = document.querySelector("img").captureStream();
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm; codecs=vp8, opus',
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(event.data));
      }
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  const downloadRecording = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recording.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const takePhoto = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const imgElement = document.createElement("img");
    imgElement.src = imageSrc;
    imgElement.onload = () => {
      context.drawImage(imgElement, 0, 0);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'photo.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 'image/png');
    };
  };

  const toggleFixation = () => {
    setIsFixed(!isFixed);
  };

  const handleDrag = (e, data) => {
    if (!isFixed) {
      setPosition({ x: data.x, y: data.y });
    }
  };

  return (
    <Draggable
      position={position}
      onDrag={handleDrag}
      disabled={isFixed}
    >
      <div className={`container ${recording ? 'recording' : ''}`}>
        <Pin onClick={toggleFixation} isFixed={isFixed} />

        {/* Anzeige für Online-Nutzer */}
        <div className="online-users-container">
          <SlUser className="icon" size={24} />
          <span className="online-users-count">Online: {onlineUsers} Nutzer</span>
        </div>

        {/* Anzeige des MJPEG-Streams als Bild */}
        {imageSrc && (
          <img src={imageSrc} alt="MJPEG Stream" className="video" />
        )}

        {/* Steuerungselemente */}
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
          <div className="mode-buttons">
            <button onClick={recording ? stopRecording : startRecording} className="record-button">
              {recording ? 'Video beenden' : 'Video aufnehmen'}
            </button>
            <button onClick={takePhoto} className="photo-button">
              Foto aufnehmen
            </button>
          </div>
          {recordedChunks.length > 0 && !recording && (
            <button onClick={downloadRecording} className="download-button">
              Video herunterladen
            </button>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default CamVideo;
