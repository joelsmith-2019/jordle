import './App.scss';
import React from 'react';
import ControlPanel from './components/controlpanel/ControlPanel';
import NavBar from './components/navbar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import ErrorPage from './components/errorpage/ErrorPage';

function App() {
  return (
    <>
      {/* App Body */}
      <div className="app-body">

        <BrowserRouter>
          
          {/* Navbar always at top */}
          <NavBar />

          {/* App content, dependant on route */}
          <div className="app-content container mt-1">
            <Routes>
              <Route path='' element={<Home />} />
              <Route path='/classic' element={<ControlPanel isClassic={true} />} />
              <Route path='/custom' element={<ControlPanel />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </div>

        </BrowserRouter>

      </div>
    </>
  );
}

export default App;
