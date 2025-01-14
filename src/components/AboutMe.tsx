import React from "react";
import "../assets/styles/AboutMe.scss";

const AboutMe = () => {
  return (
    <section className="about-me-container" id="about">
      <div className="about-me-content">
        {/* Image Section */}
        <div className="about-me-image">
          <img
            src={require("../assets/images/1.jpg")} // Adjust path if necessary
            alt="Your Portrait"
            className="profile-picture"
          />
        </div>

        {/* Text Section */}
        <div className="about-me-text">
          <h1>About Me</h1>
          <p className="pronunciation">/roh-EL DEH-los REH-yes/</p>
          <p>
            Hello World! I'm Roel Delos Reyes, a <strong>Front-End Web Developer</strong> based
            out of Metro Manila. I love combining the worlds of logic and
            creative design to make eye-catching, accessible, and user-friendly
            websites and applications.
          </p>
          <p>
            With a passion for technology and innovation, I specialize in
            building responsive and dynamic web applications using modern tools
            like <strong>React</strong>, <strong>TypeScript</strong>, and <strong>SCSS</strong>.
            I’m also experienced in integrating APIs, optimizing performance, and
            ensuring cross-browser compatibility.
          </p>
          <p>
            Beyond coding, I’m an advocate for inclusivity and diversity in tech.
            I believe that technology should be accessible to everyone, and I strive
            to create solutions that reflect this belief.
          </p>
          <p>
            When I’m not coding, you can find me exploring new technologies,
            contributing to open-source projects, or enjoying a good cup of coffee.
          </p>

          {/* Skills Section */}
          <div className="skills-section">
            <h3>Skills & Expertise</h3>
            <ul>
              <li>Front-End Development (React, TypeScript, JavaScript)</li>
              <li>UI/UX Design (Figma, Adobe XD)</li>
              <li>Responsive Web Design</li>
              <li>API Integration & RESTful Services</li>
              <li>Version Control (Git, GitHub)</li>
              <li>Agile & Scrum Methodologies</li>
            </ul>
          </div>

          {/* Call-to-Action Section */}
          <div className="cta-section">
            <p>
              Interested in collaborating or have a project in mind? Let’s connect!
            </p>
            <a href="#contact" className="cta-button">
              Get in Touch
            </a>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://medium.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-medium"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;