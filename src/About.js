import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <section className="about-section">
        <h1>Building the Future of Digital Distribution</h1>
        
        <div className="about-content">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              Creating a decentralized marketplace for verified projects, 
              hardware designs, and software solutions. Empowering creators and makers 
              through secure blockchain distribution.
            </p>
          </div>

          <div className="values">
            <h2>Core Principles</h2>
            <div className="values-grid">
              <div className="value-item">
                <i className="fa fa-shield"></i>
                <h3>Secure</h3>
                <p>Every project is cryptographically signed and verified on-chain.</p>
              </div>

              <div className="value-item">
                <i className="fa fa-code"></i>
                <h3>Open Source</h3>
                <p>Empowering innovation through transparent, community-driven development.</p>
              </div>

              <div className="value-item">
                <i className="fa fa-lock"></i>
                <h3>Privacy First</h3>
                <p>No accounts needed - connect your wallet and start building.</p>
              </div>

              <div className="value-item">
                <i className="fa fa-cube"></i>
                <h3>Web3 Native</h3>
                <p>Built on decentralized infrastructure for true ownership.</p>
              </div>
            </div>
          </div>

          <div className="tech-stack">
            <h2>Powered By</h2>
            <div className="tech-items">
              <span>
                <a href="https://ethereum.org/learn" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-ethereum"></i>
                  <div className="tech-text">
                    <div className="tech-name">Base L2</div>
                    <div className="tech-type">Blockchain</div>
                  </div>
                </a>
              </span>
              <span>
                <a href="https://docs.ipfs.tech/concepts/what-is-ipfs/" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-network-wired"></i>
                  <div className="tech-text">
                    <div className="tech-name">IPFS</div>
                    <div className="tech-type">Decentralized Storage</div>
                  </div>
                </a>
              </span>
              <span>
                <a href="https://web3js.readthedocs.io/" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-cube"></i>
                  <div className="tech-text">
                    <div className="tech-name">Web3</div>
                    <div className="tech-type">Protocol</div>
                  </div>
                </a>
              </span>
              <span>
                <a href="https://docs.ethers.org/v6/" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-code"></i>
                  <div className="tech-text">
                    <div className="tech-name">Ethers.js</div>
                    <div className="tech-type">Library</div>
                  </div>
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
