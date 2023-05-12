import './App.scss';
import React from 'react';
import ControlPanel from './components/controlpanel/ControlPanel';
import NavBar from './components/navbar/NavBar';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Home from './components/home/Home';
import ErrorPage from './components/errorpage/ErrorPage';

function App() {
  return (
    <>
      {/* App Body */}
      <div className="app-body">

        <HashRouter>

          {/* Navbar always at top */}
          <NavBar />

          {/* App content, dependant on route */}
          <div className="app-content container mt-1">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/daily' element={<ControlPanel gameType="daily" />} />
              <Route path='/classic' element={<ControlPanel gameType="classic" isClassic={true} />} />
              <Route path='/custom' element={<ControlPanel gameType="custom"/>} />
              <Route path='/byo' element={<ControlPanel gameType="byo" />} />
              <Route path='/byo/:settings' element={<ControlPanel gameType="byo" />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </div>
        </HashRouter>

      </div>
    </>
  );
}

export default App;
