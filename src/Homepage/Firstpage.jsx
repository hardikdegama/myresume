//import React from 'react';
import './Firstpagedesign.css'

function Firstpage() {
  return (
    <>
  <div className="container">
    <div className="profile-wrapper">
      <img src="/public/My Profile Photo.jpeg" alt="Profile" className="profile-image" />
    </div>
    <div className="text-wrapper">
  <h1 className="fade-in">
    Hello, <br />
    <span className="name"> I Am Hardik Degama</span> <br />
    <span className="role">Frontend Developer</span>
  </h1>
</div>

  </div>
</>

 );
}

export default Firstpage;
