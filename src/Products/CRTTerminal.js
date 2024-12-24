import React, { useState, useEffect } from 'react';
import { ProductHandler } from '../Products/ProductHandler.js';
import crtterminal from '../images/crtterminal.png';
import crtvideo from '../images/CRTVideo.mov';
// Import additional CRT terminal images here
// import crtImage2 from '../images/crt2.jpg';
// import crtImage3 from '../images/crt3.jpg';

function Product() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ethPrice, setEthPrice] = useState(null);
  
  const FIXED_USD_PRICE = 10; // Changed to $10 to match Shop.js pricing

  useEffect(() => {
    const updateEthPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        const ethUsdPrice = data.ethereum.usd;
        
        const ethAmount = FIXED_USD_PRICE / ethUsdPrice;
        setEthPrice(ethAmount.toFixed(8));
      } catch (error) {
        console.error('Error fetching ETH price:', error);
      }
    };

    updateEthPrice();

    const interval = setInterval(updateEthPrice, 60000);

    return () => clearInterval(interval);
  }, []);

  const productDetails = {
    id: 'crt-terminal',
    price: ethPrice,
    fileName: 'CRTTerminal-file.zip',
    downloadUrl: './src/Products/ProductFiles/CRTTerminal-file.zip'
  };

  const initiateDownload = (url, filename) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob();
        })
        .then(blob => {
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
          resolve();
        })
        .catch(error => {
          console.error('Download error:', error);
          reject(error);
        });
    });
  };

  const handleBuyClick = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
        const success = await ProductHandler.handlePurchase(productDetails.price, productDetails.id);
        
        if (success) {
            try {
                await initiateDownload(productDetails.downloadUrl, productDetails.fileName);
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

  const images = [
    crtvideo,
    crtterminal,
    
    // crtImage2,
    // crtImage3
  ];

  const isVideo = (src) => src.endsWith('.mov') || src.endsWith('.mp4');

  const renderMedia = (src) => {
    if (isVideo(src)) {
      return (
        <video 
          src={src}
          alt="CRT Terminal Animation"
          className="product-image"
          controls
          autoPlay
          loop
          muted
        />
      );
    }
    return (
      <img 
        src={src}
        alt="CRT Terminal Animation"
        onClick={nextImage}
        className="product-image"
      />
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="product-section">
      <div className="product-container">
        <div className="product-image-container">
          {renderMedia(images[currentImageIndex])}
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
          <h1>CRT Terminal Decryption Animation</h1>
          <p className="product-description">
            Digital downloads of a retro-styled CRT terminal decryption animation for your website. 
            This eye-catching animation simulates a vintage computer terminal with dynamic text 
            decryption effects, perfect for adding a cyberpunk aesthetic to your web projects. 
            Easy to implement and customize for your needs.
          </p>
          <div className="price-container">
            <span className="price">
              {ethPrice ? `Ξ ${ethPrice}` : 'Loading price...'}
            </span>
            <button 
              className="primarybutton buy-button"
              onClick={handleBuyClick}
              disabled={isProcessing || !ethPrice}
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
