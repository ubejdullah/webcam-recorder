import React, { useState } from 'react';
import Draggable from 'react-draggable'; // Importiere Draggable
import '/src/design/LightControl.css'; // Styles für die Steuerkomponente

const ControlComponent = ({ onBrightnessChange, onLightToggle, lightState, brightness, onDrag }) => {
  const [localBrightness, setLocalBrightness] = useState(brightness);
  const [isLightOn, setisLightOn] = useState(lightState); // Verwende 'lightState' für das Prop

  const LightOn = () => {
    // Licht ein-/ausschalten
    setisLightOn(true);
  };

  const LightOff = () => {
    // Licht ein-/ausschalten
    setisLightOn(false);
  };

  const handleBrightnessChange = (event) => {
    setLocalBrightness(event.target.value); // Helligkeit anpassen
    onBrightnessChange(event.target.value); // Übertragen des Werts an die CamVideo-Komponente
  };

  return (
    <Draggable>
      <div className="light-control-container">
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
