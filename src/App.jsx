import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './WelcomePage/WelcomePage';
import Firstpage from './Homepage/Firstpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/home" element={<Firstpage />} />
      </Routes>
    </Router>
  );
}

export default App;
