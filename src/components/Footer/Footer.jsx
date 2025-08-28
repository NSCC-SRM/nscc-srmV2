import React from "react";
import "./Footer.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
      <footer className="footer-root">
        <div className="footer-grid">
          {/* Branding and tagline */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-highlight">NSCC</span> SRMIST
            </div>
            <div className="footer-tagline">
              Newton School Coding Club
            </div>
          </div>
          {/* Useful Links */}
          <div className="footer-links">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about-us">About Us</a></li>
              <li><a href="#domains">Domains</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#sponsors">Sponsors</a></li>
              <li><a href="#our-team-section">Our Team</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact-us">Contact</a></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className="footer-card fade-in">
            <h4>Contact Us</h4>
            <p>+91 6230931075</p>
            <p>+91 8789019185</p>
            <p>info@nsccsrm.in</p>
          </div>
          {/* Location Info */}
          <div className="footer-card fade-in">
            <h4>Location</h4>
            <p>Newton School Coding Club SRMIST</p>
            <p>Dept. of Networking & Communications,<br /> School of Computing</p>
            <p>SRM Institute of Science and Technology,</p>
            <p>Kattankulathur, Chennai, 603203</p>
            <p className="footer-timing">10am—6pm</p>
          </div>
          {/* Social Media */}
          <div className="footer-socials fade-in">
            <a
                href="https://www.instagram.com/nscc_srm/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social instagram"
            >
              <FaInstagram />
            </a>
            <a
                href="https://www.linkedin.com/company/newton-school-coding-club-srmist/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="footer-social linkedin"
            >
              <FaLinkedin />
            </a>
            <a
                href="https://x.com/nsccsrm?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="footer-social twitter"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </div>
        </div>
        <div className="footer-bottom-bar">
          © {new Date().getFullYear()} NSCC SRMIST. All rights reserved.
        </div>
      </footer>
  );
};

export default Footer;
