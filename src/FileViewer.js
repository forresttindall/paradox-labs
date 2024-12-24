import React, { useEffect, useState } from "react";
import { getGateway } from './config/gateways';

const FileViewer = ({ ipfsHash }) => {
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const gateway = getGateway();
        const url = `${gateway.IPFS}${ipfsHash}`;
        
        // Handle both Web2 and Web3 fetching
        if (url.startsWith('ipfs://')) {
          // Use native IPFS if available
          if (window.ipfs) {
            const data = await window.ipfs.cat(ipfsHash);
            setFileContent(new TextDecoder().decode(data));
          } else {
            // Fallback to web3.storage gateway
            const fallbackUrl = `https://w3s.link/ipfs/${ipfsHash}`;
            const response = await fetch(fallbackUrl);
            const data = await response.text();
            setFileContent(data);
          }
        } else {
          // Standard Web2 fetch
          const response = await fetch(url);
          const data = await response.text();
          setFileContent(data);
        }
      } catch (error) {
        console.error("Error fetching IPFS content:", error);
      }
    };

    if (ipfsHash) fetchContent();
  }, [ipfsHash]);

  return <pre>{fileContent || "Loading..."}</pre>;
};

const checkNetwork = async (provider) => {
  try {
    const network = await provider.getNetwork();
    
    // Check if connected to Base (chainId: 8453)
    if (network.chainId.toString() !== '8453') {
      // If not on Base, prompt user to switch networks
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2105' }], // 8453 in hexadecimal
        });
      } catch (switchError) {
        // If Base network is not added to MetaMask, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x2105',
              chainName: 'Base',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['https://mainnet.base.org'],
              blockExplorerUrls: ['https://basescan.org']
            }]
          });
        }
        throw switchError;
      }
    }
    return true;
  } catch (error) {
    console.error('Error checking/switching network:', error);
    return false;
  }
};

export default FileViewer;
