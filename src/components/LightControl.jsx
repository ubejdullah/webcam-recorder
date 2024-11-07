import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable'; // Importiere Draggable
import Pin from '../UI/Pin.jsx'; // Importiere den Pin aus dem Ordner ui-elements
import '/src/design/LightControl.css'; // Styles für die Steuerkomponente

const ControlComponent = ({ onBrightnessChange, onLightToggle, lightState, brightness, onDrag }) => {
  const [localBrightness, setLocalBrightness] = useState(brightness);
  const [isLightOn, setIsLightOn] = useState(lightState);
  const [position, setPosition] = useState({ x: -19, y: 26 }); // Position des Containers für das Draggen
  const [isFixed, setIsFixed] = useState(true); // Zustand für Fixierung des Containers

  const LightOn = () => {
    setIsLightOn(true);
    onLightToggle(true); // Übergebe die Änderung des Lichtstatus an den Parent
  };

  const LightOff = () => {
    setIsLightOn(false);
    onLightToggle(false); // Übergebe die Änderung des Lichtstatus an den Parent
  };

  const handleBrightnessChange = (event) => {
    setLocalBrightness(event.target.value);
    onBrightnessChange(event.target.value); // Übertragen des Werts an den Parent
  };

  const handleDrag = (e, data) => {
    if (!isFixed) {
      setPosition({ x: data.x, y: data.y });
      if (onDrag) {
        onDrag(data.x, data.y); // Falls eine onDrag Funktion übergeben wurde
      }
    }
  };

  const toggleFixation = () => {
    setIsFixed(!isFixed); // Toggle zwischen fixiert und nicht fixiert
  };

  return (
    <Draggable
      position={position}
      onDrag={handleDrag}
      disabled={isFixed} // Wenn fixiert, dann kann nicht mehr gezogen werden
    >
      <div className="light-control-container">
        {/* Pin-Komponente über dem Container positioniert */}
        <Pin onClick={toggleFixation} isFixed={isFixed} />

        <div className="light-toggle">
          <button
            onClick={isLightOn ? LightOff : LightOn}
            className={`light-toggle-button ${isLightOn ? 'on' : 'off'}`}
          >
            {isLightOn ? 'Licht ausschalten' : 'Licht einschalten'}
          </button>
        </div>

        <div className="brightness-control">
          <label htmlFor="brightness">Lichtstärke: {localBrightness}%</label>
          <input
            type="range"
            id="brightness"
            min="0"
            max="200"
            value={localBrightness}
            onChange={handleBrightnessChange}
            className="brightness-slider"
          />
        </div>
      </div>
    </Draggable>
  );
};

export default ControlComponent;
