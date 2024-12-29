import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import paradoxLogo from './images/paradox-logo.png';
import { FaXTwitter, FaThreads, FaInstagram } from "react-icons/fa6";
import { MdGroup } from "react-icons/md";
import { SiFarcaster } from "react-icons/si";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    setIsSocialOpen(false);
  };

  const toggleSocial = () => {
    setIsSocialOpen(!isSocialOpen);
    setIsNavOpen(false);
  };

  return (
    <header>
      <nav className={`nav ${isNavOpen ? 'openNav' : ''}`}>
        <i 
          className="uil uil-bars navOpenBtn" 
          style={{ height: '35px' }}
          onClick={toggleNav}
        />
        <div className="logocontainer">
          <Link to="/" className="logo" aria-label="Go to Paradox Labs homepage">
            <img 
              src={paradoxLogo}
              height="35px" 
              alt="Paradox Labs logo" 
              aria-label="Paradox Labs logo" 
            />
          </Link>
        </div>
        <ul className="nav-links">
          <i 
            className="uil uil-times navCloseBtn" 
            style={{ height: '35px' }}
            onClick={toggleNav}
          />
          <li>
            <Link to="/Shop" aria-label="Shop">
              <i className="fas fa-shopping-cart" /> Shop
            </Link>
          </li>
          <li>
            <Link to="/NewProject" aria-label="Add A Project">
              <i className="fas fa-plus-circle" /> Add A Project
            </Link>
          </li>
          <li>
            <Link to="/HowItWorks" aria-label="View technical specifications">
              <i className="fas fa-code-branch" /> Tech Specs
            </Link>
          </li>
          <li>
            <Link to="/About" aria-label="Learn more about us">
              <i className="fas fa-user-secret" /> About
            </Link>
          </li>
          <li>
            <Link to="/Contact" aria-label="Contact us">
              <i className="fas fa-envelope" /> Contact
            </Link>
          </li>
        </ul>

        {/* Social menu button */}
        <button 
          id="social-menu-icon"
          className="social-menu-btn"
          onClick={toggleSocial}
          aria-label="Toggle social media menu"
        >
          <MdGroup />
        </button>

        {/* Social slide-out menu */}
        <div className={`social-slide-menu ${isSocialOpen ? 'open' : ''}`}>
          <button 
            className="social-close-btn"
            onClick={toggleSocial}
            aria-label="Close social media menu"
          >
            ×
          </button>
          <h3>Follow Us</h3>
          <div className="mobile-social-icons">
            <a 
              href="https://www.instagram.com/paradox_labs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mobile-social-icon" 
            >
              <FaInstagram />
              <span>Instagram</span>
            </a>
            <a 
              href="https://x.com/paradoxlabseth" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mobile-social-icon" 
            >
              <FaXTwitter />
              <span>X (Twitter)</span>
            </a>
            <a 
              href="https://www.threads.net/@paradox_labs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mobile-social-icon" 
            >
              <FaThreads />
              <span>Threads</span>
            </a>
            <a 
              href="https://warpcast.com/paradoxlabs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mobile-social-icon" 
            >
              <SiFarcaster />
              <span>Warpcast</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
