import React, { useState, useEffect } from 'react';

function HeroSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Content = () => (
    <div className="painpoints-content">
      <p className="overline">ON-CHAIN INNOVATION</p>
      <img 
        className="paddingb-20" 
        src={require("./images/paradox-logo.png")} 
        alt="Paradox Labs logo" 
        width="60" 
      />
      <h2 className="headline">Future-Ready Digital Products</h2>
      <p className="subheadline">Shop for verified DIY hacker projects, 3D printing files, software downloads, Web3 applications and more, we're your gateway to next-generation technology.</p>
    </div>
  );

  const FloatingCards = () => (
    <div className="painpoints-visual">
      <div className="floating-card card-1">
        <div className="card-content">
          <div className="status-indicator"></div>
          <span>DIY Projects</span>
        </div>
      </div>
      <div className="floating-card card-2">
        <div className="card-content">
          <div className="status-indicator blue"></div>
          <span>3D Printing Files</span>
        </div>
      </div>
      <div className="floating-card card-3">
        <div className="card-content">
          <div className="status-indicator purple"></div>
          <span>Software Downloads</span>
        </div>
      </div>
    </div>
  );

  const CTAButton = () => (
    <div className="cta-group">
      <a href="/shop" rel="noopener noreferrer">
        <button className="primarybutton">Explore Products</button>
      </a>
    </div>
  );

  return (
    <section className="airlinksection" id="technologies" aria-labelledby="airlinksection-title">
      <div className="painpoints-container">
        {isMobile ? (
          <>
            <Content />
            <FloatingCards />
            <CTAButton />
          </>
        ) : (
          <>
            <div className="painpoints-content">
              <Content />
              <CTAButton />
            </div>
            <FloatingCards />
          </>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
