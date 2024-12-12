import React, { useState } from "react";
import "/src/design/InfoOverlay.css";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";

// Bilder importieren
import image1 from "/src/video/image1.png";
import image2 from "/src/video/image2.jpg";
import image3 from "/src/video/image3.jpg";
import video from "/src/video/video.mp4"

function InfoOverlay() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const media = [
    { type: "image", src: image1 },
    { type: "image", src: image2 },
    { type: "image", src: image3 },
    { type: "video", src: video },
  ];

  const handleNext = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const handlePrev = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setIsOverlayOpen(false);
  };

  return (
    <>
      {isOverlayOpen && (
        <div className="info-overlay">
          <div className="info-text">
            <h1>Projekt während der Praktikumswoche bei PSI</h1>
            <p>
            Dieses Projekt wurde während meiner Praktikumswoche bei PSI entwickelt. Ursprünglich wurde eine Raspberry Pi Kamera und ein Server verwendet, um den Live-Stream von der Pi Kamera über den Raspberry Pi Server zum Frontend zu senden. Dieser Live-Stream konnte in Echtzeit angezeigt werden. Da der Raspberry Pi Server jedoch nur temporär zur Verfügung stand und nicht dauerhaft betrieben werden kann, ist der Live-Stream momentan offline. Stattdessen wird nun das Bild von der Gerätkamera genutzt, jedoch funktionieren viele Funktionen nicht mehr, da die ursprüngliche Verknüpfung mit dem Raspberry Pi nicht mehr besteht.

Für die Entwicklung des Projekts kamen verschiedene Technologien zum Einsatz, darunter ReactJS, Vite, Flask, Git, CMD und andere.

Abschließend möchte ich mich herzlich beim PSI Informatik-Team bedanken, das mir dieses Projekt ermöglicht hat.
            </p>
            <button
              className="open-button"
              onClick={() => setIsGalleryOpen(true)}
            >
              Mediathek öffnen
            </button>
          </div>
        </div>
      )}

      {isGalleryOpen && (
        <div className="media-overlay">
          <div className="media-container">
            {media[currentMediaIndex].type === "image" ? (
              <img
                src={media[currentMediaIndex].src}
                alt={`Media ${currentMediaIndex + 1}`}
                className="media-item"
              />
            ) : (
              <video
                src={media[currentMediaIndex].src}
                controls
                className="media-item"
              />
            )}
            <div className="media-controls">
              <button onClick={handlePrev}> <GoArrowLeft /> </button>
              <button onClick={handleNext}> <GoArrowRight /> </button>
            </div>
          </div>
          <button className="close-button" onClick={closeGallery}>
            Schließen
          </button>
        </div>
      )}
    </>
  );
}

export default InfoOverlay;
