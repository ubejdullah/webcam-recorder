import React, { useState } from 'react';
import { IoMdSettings } from 'react-icons/io'; // Importiere das Settings-Icon
import '/src/design/Settings.css'; // Styles für die Steuerkomponente


const Settings = ({ onToggleComponent }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Zustand für die einzelnen Komponenten
  const [componentStates, setComponentStates] = useState({
    Video: true, // Standardmäßig aktiviert
    KameraBewegung: true, // Standardmäßig aktiviert
    LichtKontrolle: true, // Standardmäßig aktiviert
  });

  // Handle für das Umschalten des jeweiligen Components
  const handleToggle = (component) => {
    setComponentStates((prevState) => {
      const newState = { ...prevState, [component]: !prevState[component] };
      onToggleComponent(component, newState[component]); // Callback, um die Änderung nach außen zu kommunizieren
      return newState;
    });
  };

  return (
    <div className="settings-container">
      {/* Button für das Öffnen des Dropdown-Menüs */}
      <button onClick={() => setIsOpen(!isOpen)} className="settings-button">
        <IoMdSettings size={40} />
      </button>

      {/* Dropdown-Menü */}
      {isOpen && (
        <div className="settings-dropdown">
          <ul>
            {Object.keys(componentStates).map((component) => (
              <li key={component}>
                <span>{component}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={componentStates[component]}
                    onChange={() => handleToggle(component)} // Umschalten der Sichtbarkeit
                  />
                  <span className="slider round"></span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Settings;
