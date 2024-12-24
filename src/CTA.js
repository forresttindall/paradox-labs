import React from 'react';
import { Link } from 'react-router-dom';
import './CTA.css';

function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2>Ready to Start Building?</h2>
        <p>
          Get instant access to verified open-source projects.<br></br>
          Connect your wallet and start building.
        </p>
        <Link to="/shop" className="primarybutton">
          Browse Projects <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
}

export default CTA;
