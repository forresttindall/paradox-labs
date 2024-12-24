export const GATEWAYS = {
  WEB2: {
    PRIMARY: 'https://paradoxlabs.tech',
    IPFS: 'https://ipfs.fleek.co/ipfs/', // Updated to Fleek's gateway
    ENS: 'https://eth.limo'
  },
  WEB3: {
    PRIMARY: 'paradoxlabs.eth',
    IPFS: 'ipfs://', 
    ENS: 'ens://'
  }
};

// Detect if user is accessing via Web3-enabled browser
export const isWeb3Browser = () => {
  return window.ethereum !== undefined || 
         window.location.protocol === 'ipfs:' || 
         window.location.hostname.endsWith('.eth');
};

// Get appropriate gateway based on access method
export const getGateway = () => {
  return isWeb3Browser() ? GATEWAYS.WEB3 : GATEWAYS.WEB2;
}; 