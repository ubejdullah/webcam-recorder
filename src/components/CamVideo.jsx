import React, { useRef, useEffect, useState } from 'react';
import { SlUser } from 'react-icons/sl';  // Importiere das SlUser Icon
import Draggable from 'react-draggable';  // Importiere die Draggable-Komponente
import Pin from '../UI/Pin.jsx'; // Importiere den Pin aus dem Ordner ui-elements
import '/src/design/CamVideo.css'; // Deine CSS-Styles für die CamVideo-Komponente

const CamVideo = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [brightness, setBrightness] = useState(100);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(1);  // Statisch auf 1 gesetzt
  const [isFixed, setIsFixed] = useState(true); // Zustand für Fixierung des Containers
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Position des Containers für das Draggen

  useEffect(() => {
    // Lade den Stream von der URL
    const videoElement = videoRef.current;
    videoElement.src = "http://10.50.25.246:7123//stream.mjpg";
    videoElement.play();

    // Video auf das Canvas zeichnen
    videoElement.onloadeddata = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const drawVideoToCanvas = () => {
        if (videoElement && canvas) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.filter = `brightness(${brightness}%)`;
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        }
        requestAnimationFrame(drawVideoToCanvas);
      };

      drawVideoToCanvas();
    };

    videoElement.onended = () => {
      videoElement.play();
    };

    return () => {
      videoElement.pause();
    };
  }, [brightness]);

  const handleBrightnessChange = (event) => {
    setBrightness(event.target.value);
  };

  const startRecording = () => {
    const stream = videoRef.current.captureStream();
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: 'video/webm; codecs=vp8, opus',
    });

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(event.data));
      }
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
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
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.filter = `brightness(${brightness}%)`;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
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

        {/* Canvas und verstecktes Video */}
        <canvas ref={canvasRef} className="video"></canvas>
        <video ref={videoRef} style={{ display: 'none' }}></video>

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
