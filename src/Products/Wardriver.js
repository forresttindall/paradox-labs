import React, { useState, useEffect } from 'react';
import { ProductHandler } from '../Products/ProductHandler.js';
import litupwardriver from '../images/wardriver.jpg';
import wardrivercase from '../images/wardrivercase.jpg';
import wardrivercode from '../images/wardrivercode.png';
// Import additional wardriver images here
// import wardriverImage2 from '../images/wardriver2.jpg';
// import wardriverImage3 from '../images/wardriver3.jpg';






function Product() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ethPrice, setEthPrice] = useState(null);
  
  const FIXED_USD_PRICE = 15;

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
    id: 'test-product',
    price: ethPrice,
    fileName: 'flipper-zero-case.zip',
    downloadUrl: './src/Products/ProductFiles/Wardriver-files.zip'
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
    litupwardriver,
    wardrivercase,
    wardrivercode,
    // wardriverImage2,
    // wardriverImage3
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="product-section">
      <div className="product-container">
        <div className="product-image-container">
          <img 
            src={images[currentImageIndex]} 
            alt="Reactive RGB Wardriver" 
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
          <h1>Reactive RGB Wardriver</h1>
          <p className="product-description">
            Digital downloads of the code and 3d print files for a reactive RGB wardriver that lights up when you collect new networks. 
            This innovative device combines WiFi scanning capabilities with dynamic RGB feedback, 
            creating an engaging and functional tool for network discovery. Perfect for security 
            researchers and network enthusiasts.
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
