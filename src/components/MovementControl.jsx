import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importiere Pfeil-Icons von React Icons
import Draggable from 'react-draggable'; // Importiere Draggable
import '/src/design/MovementControl.css'; // Styles für die Steuerkomponente
import Pin from '../UI/Pin.jsx'; // Importiere den Pin aus dem Ordner ui-elements

const MovementControl = () => {
  const [isFixed, setIsFixed] = useState(true); // Zustand für Fixierung des Containers
  const [position, setPosition] = useState({ x: 1122, y: 240 }); // Position des Containers für das Draggen

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
      <div className="movement-control-container">
      <Pin onClick={toggleFixation} isFixed={isFixed} />

        {/* Drag Control Bereich */}
        <div className="drag-control">
          <label>Kamera verschieben</label>

          <div className="drag-buttons">
            <button className="drag-left">
              <FaArrowLeft size={25} />
            </button>
            <button className="drag-right">
              <FaArrowRight size={25} />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default MovementControl;
