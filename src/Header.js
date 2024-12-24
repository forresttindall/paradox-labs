import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import paradoxLogo from './images/paradox-logo.png';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
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
            <Link to="/HowItWorks" aria-label="Learn how it works">
              <i className="fas fa-code-branch" /> How It Works
            </Link>
          </li>
          <li>
            <Link to="/about" aria-label="Learn more about us">
              <i className="fas fa-user-secret" /> About
            </Link>
          </li>
          <li>
            <Link to="/contact" aria-label="Contact us">
              <i className="fas fa-envelope" /> Contact
            </Link>
          </li>
        </ul>
        <div>
          <a 
            href="https://www.instagram.com/paradox_labs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon" 
            aria-label="Instagram - Paradox Labs's Instagram profile"
          >
            <i className="fab fa-instagram social-icon" />
          </a>
          <a 
            href="https://www.threads.net/@paradox_labs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon" 
            aria-label="Threads - Paradox Labs's Threads profile"
          >
            <i className="fab fa-threads social-icon" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
