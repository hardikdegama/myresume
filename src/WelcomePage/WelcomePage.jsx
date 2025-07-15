import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePagedesign.css'


function Welcome() {
  

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

 
  return (
    <>
      <div className="welcome-container">
      <h1 className="neon-text">Welcome My Portfolio </h1>
    </div>
    </>
  )
}

export default Welcome;



