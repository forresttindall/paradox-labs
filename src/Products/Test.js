import React, { useState, useEffect } from 'react';
import ProductHandler from './ProductHandler';
import { useEthPrice } from '../hooks/useEthPrice';
import litupwardriver from '../images/wardriver.jpg';
import wardrivercase from '../images/wardrivercase.jpg';
import wardrivercode from '../images/wardrivercode.png';

function Product() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const FIXED_USD_PRICE = 0.001;
  const { ethPrice, isLoading } = useEthPrice(FIXED_USD_PRICE);

  const productDetails = {
    id: 'test-product',
    price: ethPrice,
    fileName: 'flipper-zero-case.zip',
    downloadUrl: './src/Products/ProductFiles/flipper-zero-case.zip'
  };

  const handleSuccessfulPurchase = async () => {
    try {
      // Log the attempt
      console.log('Debug - Starting download process');
      
      // Use the correct path relative to your public directory
      const response = await fetch('/ProductFiles/flipper-zero-case.zip');
      
      // Log the response
      console.log('Debug - Download response:', response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'flipper-zero-case.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('Debug - Download completed successfully');
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed: ' + error.message);
    }
  };

  const handleBuyClick = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
        const success = await ProductHandler.handlePurchase(productDetails.price, productDetails.id);
        
        if (success) {
            try {
                await handleSuccessfulPurchase();
                console.log('Download initiated successfully');
            } catch (downloadError) {
                console.error('Download failed:', downloadError);
                alert('Purchase successful but download failed. Please contact support.');
            }
        }
    } catch (error) {
        console.error("Purchase error:", error);
        if (error.code === 'INSUFFICIENT_FUNDS') {
            alert("Insufficient funds to complete the transaction (including gas fees).");
        } else if (error.code === 'USER_REJECTED') {
            alert("Transaction was rejected by user.");
        } else {
            alert(`An error occurred during purchase: ${error.message}`);
        }
    } finally {
        setIsProcessing(false);
    }
  };

  const images = [litupwardriver, wardrivercase, wardrivercode];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const transactionComplete = urlParams.get('transaction');
    const shouldDownload = urlParams.get('download');
    
    if (transactionComplete === 'complete' && shouldDownload === 'true') {
        // Add a small delay to ensure the browser is ready to handle the download
        setTimeout(() => {
            handleSuccessfulPurchase();
            // Clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 1000);
    }
  }, []);

  return (
    <section className="product-section">
      <div className="product-container">
        <div className="product-image-container">
          <img 
            src={images[currentImageIndex]} 
            alt="Test Product" 
            onClick={nextImage}
            className="product-image"
          />
          <div className="image-dots">
            {images.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="product-info">
          <h1>Test Product</h1>
          <p className="product-description">
            This is a test product for verifying the payment system. 
            Price is set to approximately 1 cent in ETH for testing purposes.
          </p>
          <div className="price-container">
            {isLoading ? (
              <span className="price">Loading price...</span>
            ) : ethPrice ? (
              <span className="price">Ξ {ethPrice}</span>
            ) : (
              <span className="price">Price unavailable</span>
            )}
            <button 
              className="primarybutton buy-button"
              onClick={handleBuyClick}
              disabled={isProcessing || isLoading || !ethPrice}
            >
              {isProcessing ? 'Processing...' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
