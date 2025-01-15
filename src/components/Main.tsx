import React, { useState, useEffect } from "react";
import profileImage1 from '../assets/images/1.png'; // Import the first image
import profileImage1 from '../assets/images/2.png'; // Import the first image
import profileImage2 from '../assets/images/new2.png'; // Import the second image
import backgroundImage from '../assets/images/background1.jpg'; // Import the background image
import '../assets/styles/Main.scss';

function Main() {
  const [currentImage, setCurrentImage] = useState(0); // State to track the current image
  const images = [profileImage1, profileImage2, profileImage3]; // Array of images

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  // Replace this URL with the actual URL of your resume
  const resumeUrl = "https://drive.google.com/drive/folders/1YyH7isIvIK0u46vVZjXw-3aPh72x9Ywj?usp=sharing";

  return (
    <div
      className="portfolio-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay for better readability */}
      <div className="overlay"></div>

      {/* Main Section */}
      <div className="main-content compact">
        <div className="text-content">
          <p className="greeting">HELLO!</p>
          <h1 className="name">
            I'm <span className="highlight">Roel Delos Reyes</span>
          </h1>
          <p className="profession">
            <span className="animated-profession">A Full Stack Developer</span>
          </p>
          <div className="action-buttons">
            <a
              href={resumeUrl} // Link to your resume
              target="_blank" // Open in a new tab
              rel="noopener noreferrer" // Security best practice
              className="btn hire-me"
            >
              Hire Me
            </a>
            <a href="#projects" className="btn my-works">
              My Projects
            </a>
          </div>
        </div>
        <div className="image-content">
          <img
            src={images[currentImage]} // Dynamically set the current image
            alt="Roel"
            className="profile-picture"
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
