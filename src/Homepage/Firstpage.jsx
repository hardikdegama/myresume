import React from 'react';
import './Firstpagedesign.css';
import { FaGithub, FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Firstpage() {
  return (
    <>
      <div className="container" id="home">
        <div className="profile-wrapper">
          <img src="/My Profile Photo.jpeg" alt="Profile" className="profile-image" />
        </div>
        <div className="text-wrapper">
          <h1 className="fade-in">
            Hello, <br />
            <span className="name">I Am Hardik Degama</span> <br />
            <span className="role">Frontend Developer</span>
          </h1>
        </div>
      </div>

<div>

  
  <div className="about-container">
      <div className="about-text">
        <h2>About Me</h2>
        
        <p>
Hi, I'm  Hardik Degama, a frontend developer with a passion for building responsive, user-friendly, and visually appealing web applications.
<br/> I specialize in HTML, CSS, JavaScript, and React.
<br/> I've completed my Bachelor of Computer Applications (BCA) and love solving problems, learning new technologies.
           </p>   
             </div>
      <div className="about-photo">
        <img src="/About Photo.jpeg" alt="Hardik Degama" />
      </div>
    </div>
</div>


























      <div className="footer" id="contact">
        <h3 className="contact-title">Contact Me</h3>

        <div className="footer-content">
          <div className="image-section">
            <img src="/footerphoto.jpg" alt="Profile" className="footer-photo" />
          </div>

          <div className="text-section">
            <h1 className="text">Mr. Degama</h1>

            <div className="contact-links">
              <a href="https://github.com/hardikdegama" target="_blank" rel="noopener noreferrer" className="contact-item">
                <FaGithub className="icon" /> GitHub
              </a>

              <a href="https://www.instagram.com/mr._degama_0021" target="_blank" rel="noopener noreferrer" className="contact-item">
                <FaInstagram className="icon" /> Instagram
              </a>

              <div className="contact-item">
                <FaPhoneAlt className="icon" /> +91-9664953221
              </div>

              <div className="contact-item">
                <FaEnvelope className="icon" /> hardikdegama@email.com
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Firstpage;
