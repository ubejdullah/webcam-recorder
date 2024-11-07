import React, { useState } from 'react';
import { CiMapPin } from 'react-icons/ci'; // Importiere das Pin-Icon
import './Pin.css'; // Importiere die CSS-Datei für das Pin-Design

const Pin = ({ onClick }) => {
  const [isFixed, setIsFixed] = useState(false);

  const handleClick = () => {
    setIsFixed(!isFixed);
    if (onClick) {
      onClick(!isFixed); // Optional: Callback an die Elternkomponente, um den Zustand zu übergeben
    }
  };

  return (
    <div className="pin-container" onClick={handleClick}>
      <CiMapPin className={`pin ${isFixed ? 'fixed' : ''}`} size={30} />
    </div>
  );
};

export default Pin;
