import React, { useState } from 'react';
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
      <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30px"
        height="30px"
      >
        <path
          className={`pin ${isFixed ? 'fixed' : ''}`} // Hier wird die Klasse 'fixed' dynamisch hinzugefügt
          d="M16.729 4.271a1 1 0 0 0-1.414-.004a1.004 1.004 0 0 0-.225.355c-.832 1.736-1.748 2.715-2.904 3.293C10.889 8.555 9.4 9 7 9a1.006 1.006 0 0 0-.923.617a1.001 1.001 0 0 0 .217 1.09l3.243 3.243L5 20l6.05-4.537l3.242 3.242a.975.975 0 0 0 .326.217c.122.051.252.078.382.078s.26-.027.382-.078A.996.996 0 0 0 16 18c0-2.4.444-3.889 1.083-5.166c.577-1.156 1.556-2.072 3.293-2.904a.983.983 0 0 0 .354-.225a1 1 0 0 0-.004-1.414z"
        />
      </svg>
    </div>
  );
};

export default Pin;
