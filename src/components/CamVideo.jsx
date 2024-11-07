import React, { useRef, useEffect, useState } from 'react';
import { SlUser } from 'react-icons/sl';  // Importiere das SlUser Icon
import Draggable from 'react-draggable';  // Importiere die Draggable-Komponente
import { CiMapPin } from 'react-icons/ci'; // Pin-Icon aus react-icons
import '/src/design/CamVideo.css'; // Deine CSS-Styles für die CamVideo-Komponente

const CamVideo = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [brightness, setBrightness] = useState(100);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(1);  // Statisch auf 1 gesetzt
  const [isFixed, setIsFixed] = useState(true); // Zustand für Fixierung des Containers
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Position des Containers für das Draggen

  useEffect(() => {
    const getVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: 'video/webm; codecs=vp8, opus',
          });

          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              setRecordedChunks((prev) => prev.concat(event.data));
            }
          };
        }
      } catch (error) {
        console.error('Error accessing webcam: ', error);
      }
    };

    getVideoStream();
  }, []);

  const handleBrightnessChange = (event) => {
    setBrightness(event.target.value);
    if (videoRef.current) {
      videoRef.current.style.filter = `brightness(${event.target.value}%)`;
    }
  };

  const startRecording = () => {
    setRecordedChunks([]); // Vorherige Aufnahmen löschen
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
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
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
      <div className={`container ${recording ? 'recording' : ''}`}>
        {/* Pin über dem Container */}
        <div className="pin-container" onClick={toggleFixation}>
          <CiMapPin
            className={`pin ${isFixed ? 'fixed' : ''}`}
            size={30} // Pin bleibt klein
          />
        </div>

        {/* Anzeige für Online-Nutzer */}
        <div className="online-users-container">
          <SlUser className="icon" size={24} />
          <span className="online-users-count">Online: {onlineUsers} Nutzer</span>
        </div>

        <video
          ref={videoRef}
          autoPlay
          className="video"
          style={{
            filter: `brightness(${brightness}%)`,
          }}
        ></video>

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
