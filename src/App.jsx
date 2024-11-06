import React from 'react';
import CamVideo from './components/CamVideo.jsx';
import LightControl from './components/LightControl.jsx';
import MovementControl from './components/MovementControl.jsx'

function App() {
  return (
    <div className="App">
      <CamVideo />
      <LightControl />
      <MovementControl />
    </div>
  );
}

export default App;
