import { ethers } from 'ethers';

export const ProductHandler = {
    // Store your wallet address
    MERCHANT_WALLET: "0x19144a7A6cdBe91fB282d8b16e376E88038E4E4F",

    // Initialize connection to MetaMask
    async connectWallet() {
        try {
            console.log("Checking for ethereum provider...");
            console.log("window.ethereum:", window.ethereum);
            console.log("Available wallets:", {
                isCoinbaseWallet: window.ethereum?.isCoinbaseWallet,
                isMetaMask: window.ethereum?.isMetaMask
            });

            if (!window.ethereum) {
                alert("Please install MetaMask or Coinbase Wallet!");
                return null;
            }

            // Force disconnect any existing connections
            try {
                // First, try to disconnect any existing connections
                await window.ethereum.request({
                    method: "eth_accounts"
                }).then(async (accounts) => {
                    if (accounts.length > 0) {
                        await window.ethereum.request({
                            method: "wallet_requestPermissions",
                            params: [{
                                eth_accounts: {}
                            }]
                        });
                    }
                });
            } catch (err) {
                console.log("Permission request failed, trying direct connection");
            }

            // Request fresh account access
            await window.ethereum.request({ 
                method: 'eth_requestAccounts'
            });

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            
            // Update network check for Base
            const network = await provider.getNetwork();
            if (network.chainId !== 8453) {  // Remove the 'n' suffix
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x2105' }]  // Hex value for 8453
                    });
                } catch (switchError) {
                    // Handle the case where the Base network needs to be added
                    if (switchError.code === 4902) {
                        try {
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
                        } catch (addError) {
                            console.error('Failed to add Base network:', addError);
                            alert('Please add Base network to your wallet manually');
                            return null;
                        }
                    } else {
                        console.error('Failed to switch to Base network:', switchError);
                        alert('Please switch to Base network in your wallet');
                        return null;
                    }
                }
            }

            const address = await signer.getAddress();
            console.log(`Connected with ${window.ethereum.isCoinbaseWallet ? 'Coinbase Wallet' : 'MetaMask'} at address ${address}`);
            return signer;

        } catch (error) {
            console.error("Error connecting wallet:", error);
            if (error.code === 4001) {
                alert("Connection rejected. Please approve the connection in your wallet.");
            } else {
                alert("Error connecting to wallet. Please try again.");
            }
            return null;
        }
    },

    // Handle product purchase
    async handlePurchase(productPrice, productId) {
        try {
            console.log("Starting purchase process...", { productPrice, productId });
            
            const signer = await this.connectWallet();
            if (!signer) {
                console.log("Failed to get signer - wallet connection failed");
                return false;
            }
            console.log("Wallet connected successfully");

            // Convert product price to Wei (assuming price is in ETH)
            const priceInWei = ethers.utils.parseEther(productPrice.toString());
            console.log("Price in Wei:", priceInWei.toString());

            // Create transaction
            console.log("Initiating transaction...");
            const tx = await signer.sendTransaction({
                to: this.MERCHANT_WALLET,
                value: priceInWei,
                gasLimit: 21000  // Base uses similar gas limits to Ethereum
            });

            console.log("Transaction sent:", tx.hash);

            // Wait for transaction to be mined
            const receipt = await tx.wait();
            console.log("Transaction receipt:", receipt);

            if (receipt.status === 1) {
                console.log("Transaction successful!");
                return true;
            } else {
                console.error("Transaction failed");
                return false;
            }

        } catch (error) {
            console.error("Purchase error:", error);
            if (error.code === 4001) {
                console.log("User rejected the transaction");
            }
            return false;
        }
    }
};
