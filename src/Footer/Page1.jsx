//import React from 'react';
//import './Page1Design.css';
//import { FaGithub, FaInstagram, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <div className="text-box">
        <h1 className="text">Mr. Degama</h1>

        <h3 className="contact-title">Contact Me</h3>
        <div className="contact-links">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="contact-item">
            <FaGithub className="icon" /> GitHub
          </a>

          <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="contact-item">
            <FaInstagram className="icon" /> Instagram
          </a>

          <div className="contact-item">
            <FaPhoneAlt className="icon" /> +91-1234567890
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
