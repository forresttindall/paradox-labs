import { useState, useEffect } from 'react';

export function useEthPrice(usdPrice) {
  const [ethPrice, setEthPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const updateEthPrice = async () => {
      try {
        // Use CryptoCompare API which has better CORS support
        const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const ethUsdPrice = data.USD;
        
        if (ethUsdPrice && isMounted) {
          const ethAmount = usdPrice / ethUsdPrice;
          setEthPrice(ethAmount.toFixed(8));
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching ETH price:', error);
        if (isMounted) {
          setEthPrice(null);
          setIsLoading(false);
        }
      }
    };

    updateEthPrice();
    const interval = setInterval(updateEthPrice, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [usdPrice]);

  return { 
    ethPrice, 
    isLoading: isLoading || !ethPrice 
  };
} 