import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importiere Pfeil-Icons von React Icons
import Draggable from 'react-draggable'; // Importiere Draggable
import '/src/design/MovementControl.css'; // Styles für die Steuerkomponente

const MovementControl = () => {

    return(
        <Draggable>
            <div className='movement-control-container'>
                <div className="drag-control">
                    <label>Kamera verschieben</label>

                    <div className="drag-buttons">
                        <button className="drag-left"><FaArrowLeft size={25} /></button>
                        <button className="drag-right"><FaArrowRight size={25} /></button>
                    </div>
                </div>
            </div>

        </Draggable>
    )
};

export default MovementControl;