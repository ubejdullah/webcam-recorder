import React, { useState } from 'react';
import CamVideo from './components/CamVideo.jsx';
import LightControl from './components/LightControl.jsx';
import MovementControl from './components/MovementControl.jsx';
import Settings from './components/Settings'; // Importiere die Settings-Komponente

const App = () => {
  const [visibleComponents, setVisibleComponents] = useState({
    Video: true, // Standardmäßig aktiviert
    KameraBewegung: true, // Standardmäßig aktiviert
    LichtKontrolle: true, // Standardmäßig aktiviert
  });

  // Handle für das Umschalten der Sichtbarkeit
  const handleToggleComponent = (component, isVisible) => {
    setVisibleComponents((prevState) => ({
      ...prevState,
      [component]: isVisible, // Setze die Sichtbarkeit basierend auf dem Schalter
    }));
  };

  return (
    <div className="app-container">
      <Settings onToggleComponent={handleToggleComponent} />

      {/* Komponente wird nur gerendert, wenn der Zustand `true` ist */}
      {visibleComponents.Video && <CamVideo />}
      {visibleComponents.KameraBewegung && <MovementControl />}
      {visibleComponents.LichtKontrolle && <LightControl />}
    </div>
  );
};

export default App;
