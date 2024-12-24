import { useState, useEffect } from 'react';

export const useEthPrice = (usdPrice) => {
  const [ethPrice, setEthPrice] = useState('0.005'); // Default fallback price

  useEffect(() => {
    const updateEthPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        const ethUsdPrice = data.ethereum.usd;
        
        const ethAmount = usdPrice / ethUsdPrice;
        setEthPrice(ethAmount.toFixed(8));
      } catch (error) {
        console.error('Error fetching ETH price:', error);
      }
    };

    updateEthPrice();
    const interval = setInterval(updateEthPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [usdPrice]);

  return ethPrice;
}; 