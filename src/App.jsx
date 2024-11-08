import React, { useState } from 'react';
import CamVideo from './components/CamVideo.jsx';
import LightControl from './components/LightControl.jsx';
import MovementControl from './components/MovementControl.jsx';
import Settings from './components/Settings'; // Importiere die Settings-Komponente

const App = () => {
  const [visibleComponents, setVisibleComponents] = useState({
    Kamera: true, // Standardmäßig aktiviert
    Bewegung: true, // Standardmäßig aktiviert
    Licht: true, // Standardmäßig aktiviert
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
      {visibleComponents.Kamera && <CamVideo />}
      {visibleComponents.Bewegung && <MovementControl />}
      {visibleComponents.Licht && <LightControl />}
    </div>
  );
};

export default App;
