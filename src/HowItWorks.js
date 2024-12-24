import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
  return (
    <section className="howitworks-section" id="howitworks">
      <div className="howitworks-container">
        <h2 className="section-title">How It Works</h2>
        
        <div className="technical-section">
          
          
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-wallet"></i>
              </div>
              <h3>Web3 Authentication</h3>
              <p>
                Connect securely using Ethereum-based wallets through the Web3 protocol. 
                Your wallet serves as both your authentication and payment method, eliminating 
                the need for traditional usernames and passwords.
              </p>
              <div className="tech-details-list">
                <span>• EIP-1193 compliant connection</span>
                <span>• Supports EVM-compatible wallets</span>
                <span>• Sign-in with Ethereum (SIWE) ready</span>
              </div>
            </div>

            <div className="step">
              <div className="step-icon">
                <i className="fas fa-cubes"></i>
              </div>
              <h3>Base L2 Infrastructure</h3>
              <p>
                Built on Base, Coinbase's secure Layer 2 scaling solution for Ethereum. 
                Benefit from high-speed transactions and minimal gas fees while maintaining 
                Ethereum's security guarantees.
              </p>
              <div className="tech-details-list">
                <span>• Optimistic rollup technology</span>
                <span>• 10-100x lower fees than Ethereum L1</span>
                <span>• ~3 second transaction finality</span>
              </div>
            </div>

            <div className="step">
              <div className="step-icon">
                <i className="fas fa-file-contract"></i>
              </div>
              <h3>Smart Contract Security</h3>
              <p>
                Our smart contracts implement atomic purchases with instant delivery triggers. 
                Each transaction is verified and secured by the blockchain, ensuring 
                trustless and automated execution.
              </p>
              <div className="tech-details-list">
                <span>• Audited contract architecture</span>
                <span>• Automated escrow mechanism</span>
                <span>• Immutable transaction records</span>
              </div>
            </div>

            <div className="step">
              <div className="step-icon">
                <i className="fas fa-network-wired"></i>
              </div>
              <h3>Decentralized Storage</h3>
              <p>
                Files are distributed across IPFS (InterPlanetary File System), ensuring 
                high availability and censorship resistance. Content addressing guarantees 
                file integrity and prevents tampering.
              </p>
              <div className="tech-details-list">
                <span>• Content-addressed storage (CID)</span>
                <span>• Distributed hash table (DHT)</span>
                <span>• Multi-node redundancy</span>
              </div>
            </div>
          </div>

          <div className="tech-details">
            <div className="detail-box">
              <h4>Zero-Knowledge Architecture</h4>
              <p>
                Our system operates on zero-knowledge principles. Your wallet address is the only 
                identifier needed, with no personal data ever collected or stored. Transactions 
                are pseudonymous on the blockchain, protecting your privacy while maintaining 
                verifiable proof of purchase.
              </p>
            </div>

            <div className="detail-box">
              <h4>Cryptographic Verification</h4>
              <p>
                Every file is hashed using SHA-256 and stored on-chain, creating an immutable 
                record of the content you're purchasing. Smart contracts verify the hash matches 
                before triggering delivery, ensuring you receive exactly what was advertised.
              </p>
            </div>

            <div className="detail-box">
              <h4>Decentralized Delivery</h4>
              <p>
                Downloads are served through a distributed network of IPFS nodes, eliminating 
                single points of failure. Content is cached globally for fast retrieval, while 
                maintaining end-to-end encryption for sensitive files.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
