import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importiere Pfeil-Icons von React Icons
import Draggable from 'react-draggable'; // Importiere Draggable
import '/src/design/MovementControl.css'; // Styles für die Steuerkomponente
import { CiMapPin } from 'react-icons/ci'; // Pin-Icon aus react-icons

const MovementControl = () => {
  const [isFixed, setIsFixed] = useState(false); // Zustand für Fixierung des Containers
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Position des Containers für das Draggen

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
        {/* Pin über dem Container */}
        <div className="pin-container" onClick={toggleFixation}>
          <CiMapPin
            className={`pin ${isFixed ? 'fixed' : ''}`}
            size={30} // Pin bleibt klein
          />
        </div>

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
