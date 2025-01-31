import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faJava, faPython } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

// Import the background image
import backgroundImage from '../assets/images/012.jpg'; // Update the path to your image

const labelsFirst = [
  "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "SCSS", "Flask", 
  "Python", "SQL", "PostgreSQL"
];

const labelsSecond = [
  "Java", "OOP", "Design Patterns", "Spring Boot", "Hibernate", 
  "REST APIs", "Microservices", "MySQL", "XAMPP", "WAMPP"
];

const labelsThird = [
  "OpenAI", "LangChain", "Hugging Face", 
  "LlamaIndex" 
];

function Expertise() {
  return (
    <div 
      className="expertise-container" 
      id="expertise"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Add background image
    >
      <div className="overlay"></div> {/* Add an overlay for better readability */}
      <h1 className="section-title">Expertise</h1>
      <div className="cards-grid">
        {/* Full Stack Web Development */}
        <div className="card">
          <FontAwesomeIcon icon={faReact} size="3x" className="icon" />
          <h3>Full Stack Web Development</h3>
          <p>
            Building diverse web applications using modern technologies like React and Flask. 
            Proficient in SDLC processes, frontend, and backend development.
          </p>
          <div className="chips">
            <span className="chip-title">Tech stack:</span>
            {labelsFirst.map((label, index) => (
              <Chip key={index} className="chip" label={label} />
            ))}
          </div>
        </div>

        {/* OOP & Java (Creating Systems like Banking Systems) */}
        <div className="card">
          <FontAwesomeIcon icon={faJava} size="3x" className="icon" />
          <h3>OOP & Java</h3>
          <p>
            Designing and developing robust, scalable systems using Java and Object-Oriented Programming (OOP) principles. 
            Experience in building banking systems, REST APIs, and microservices.
          </p>
          <div className="chips">
            <span className="chip-title">Tech stack:</span>
            {labelsSecond.map((label, index) => (
              <Chip key={index} className="chip" label={label} />
            ))}
          </div>
        </div>

        {/* GenAI & LLM */}
        <div className="card">
          <FontAwesomeIcon icon={faPython} size="3x" className="icon" />
          <h3>GenAI & LLM</h3>
          <p>
            Leveraging the latest AI models to create enterprise-grade, GenAI-enabled solutions 
            for intelligent decision-making.
          </p>
          <div className="chips">
            <span className="chip-title">Tech stack:</span>
            {labelsThird.map((label, index) => (
              <Chip key={index} className="chip" label={label} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expertise;
