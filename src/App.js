import './App.scss';
import React from 'react';
import ControlPanel from './components/controlpanel/ControlPanel';

function App() {
  return (
    <div className="app-body">

      <div className="text-center my-3">
        <h1>Welcome to Jordle!</h1>
      </div>

      <ControlPanel />
    </div>
  );
}

export default App;
