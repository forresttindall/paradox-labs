import React from 'react';
import './PoweredBy.css';

function PoweredBy() {
  return (
    <div className="tech-stack">
      <h2>Built For You</h2>
      <div className="tech-items">
        <span>
          <a href="https://ethereum.org/learn" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-ethereum"></i>
            <div className="tech-text">
              <div className="tech-name">Secure Encryption</div>
              <div className="tech-type">Protected by Blockchain</div>
            </div>
          </a>
        </span>
        <span>
          <a href="https://docs.ipfs.tech/concepts/what-is-ipfs/" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-database"></i>
            <div className="tech-text">
              <div className="tech-name">Always Available</div>
              <div className="tech-type">Decentralized Storage</div>
            </div>
          </a>
        </span>
        <span>
          <a href="https://web3js.readthedocs.io/" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-wallet"></i>
            <div className="tech-text">
              <div className="tech-name">True Ownership</div>
              <div className="tech-type">Direct Wallet Access</div>
            </div>
          </a>
        </span>
        <span>
          <a href="https://docs.ethers.org/v6/" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-bolt"></i>
            <div className="tech-text">
              <div className="tech-name">Lightning Fast</div>
              <div className="tech-type">Optimized Performance</div>
            </div>
          </a>
        </span>
      </div>
    </div>
  );
}

export default PoweredBy;
