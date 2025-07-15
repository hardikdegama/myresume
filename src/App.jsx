import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Welcome from './WelcomePage/WelcomePage';
import Firstpage from './Homepage/Firstpage';
import './App.css';

// This wrapper handles scroll behavior only inside the /home route
function ScrollListenerWrapper() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const rect = contactSection.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        if (location.pathname !== '/home/contact') {
          navigate('/home/contact', { replace: true });
        }
      } else {
        if (location.pathname !== '/home') {
          navigate('/home', { replace: true });
        }
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return <Firstpage />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home/*" element={<ScrollListenerWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
