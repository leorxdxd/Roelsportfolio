import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Footer.scss';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="social-links">
        <a
          href="https://github.com/leorxdxd"
          target="_blank"
          rel="noreferrer"
          className="social-link"
        >
          <GitHubIcon className="social-icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/roel-de-los-reyes-7a76412b6/"
          target="_blank"
          rel="noreferrer"
          className="social-link"
        >
          <LinkedInIcon className="social-icon" />
        </a>
      </div>
      <p className="footer-text">
        A portfolio designed & built by{" "}
        <a
          href="https://github.com/leorxdxd/Roel-Portfolio"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          Roel Delos Reyes
        </a>{" "}
        with 💜
      </p>
      <p className="footer-credit">
        Photos from{" "}
        <a
          href="https://pngtree.com"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          pngtree.com
        </a>
      </p>
    </footer>
  );
}

export default Footer;
