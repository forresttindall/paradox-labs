import React from 'react';
import './StartHere.css';

function StartHere() {
  return (
    <section className="starthere-section" id="starthere">
      <div className="starthere-container">
        <h2 className="section-title">New to Web3? Start Here</h2>
        
        <div className="beginner-guide">
          <div className="simple-steps">
            <div className="simple-step">
              <span className="step-number">1</span>
              <div className="step-content">
                <h4>Get Your Digital Wallet</h4>
                <div className="wallet-options">
                  <div className="wallet-option">
                    <a href="https://www.coinbase.com/wallet/downloads" target="_blank" rel="noopener noreferrer">
                      <img 
                        src="/images/coinbase-wallet-logo.svg" 
                        alt="Coinbase Wallet"
                        className="wallet-logo"
                      />
                      <span>Coinbase Wallet</span>
                      <small>Easiest for beginners</small>
                    </a>
                  </div>
                  <div className="wallet-option">
                    <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
                      <img 
                        src="/images/metamask-fox.svg" 
                        alt="MetaMask"
                        className="wallet-logo"
                      />
                      <span>MetaMask</span>
                      <small>Most popular choice</small>
                    </a>
                  </div>
                </div>
                <div className="quick-setup">
                  <p>Quick Setup:</p>
                  <ol>
                    <li>Install wallet (choose your preferred platform)</li>
                    <li>Create new wallet - <span className="important-note">Save your recovery phrase securely!</span></li>
                    <li>Add funds using credit card or bank transfer</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="simple-step">
              <span className="step-number">2</span>
              <div className="step-content">
                <h4>Select & Purchase</h4>
                <div className="purchase-steps">
                  <ol>
                    <li>Browse and select your desired product</li>
                    <li>Click "Buy Now" on the product page</li>
                    <li>Click "Connect Wallet" when prompted</li>
                    <li>Confirm the purchase in your wallet</li>
                  </ol>
                  <p className="privacy-note">No registration or personal info needed!</p>
                </div>
              </div>
            </div>

            <div className="simple-step">
              <span className="step-number">3</span>
              <div className="step-content">
                <h4>Download Automatically</h4>
                <p>Your file will start downloading as soon as the purchase confirms (usually under 1 minute)</p>
                <div className="download-note">
                  <p><i className="fas fa-info-circle"></i> Using mobile? Your download will start automatically in your default browser</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartHere;
