import { ethers } from 'ethers';

export const ProductHandler = {
	// Store your wallet address
	MERCHANT_WALLET: "0x19144a7A6cdBe91fB282d8b16e376E88038E4E4F",

	// Initialize connection to MetaMask
	async connectMetaMask() {
		try {
			// MetaMask's recommended way to request accounts
			const accounts = await window.ethereum.request({
				method: 'wallet_requestPermissions',
				params: [{ eth_accounts: {} }]
			}).then(() => window.ethereum.request({
				method: 'eth_requestAccounts'
			}));

			if (!accounts || accounts.length === 0) {
				throw new Error('No accounts found');
			}

			return accounts[0];
		} catch (error) {
			console.error('MetaMask connection error:', error);
			throw error;
		}
	},

	// Initialize connection to Coinbase
	async connectCoinbase() {
		try {
			await window.ethereum.request({
				method: "wallet_requestPermissions",
				params: [{
					eth_accounts: {}
				}]
			});
			const accounts = await window.ethereum.request({ 
				method: 'eth_requestAccounts' 
			});

			if (!accounts || accounts.length === 0) {
				throw new Error('No accounts found');
			}

			return accounts[0];
		} catch (error) {
			console.error('Coinbase connection error:', error);
			throw error;
		}
	},

	// Initialize connection to wallet
	async connectWallet() {
		try {
			if (!window.ethereum) {
				alert("Please install MetaMask or Coinbase Wallet!");
				return null;
			}

			let accounts;
			try {
				accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				});

				if (!accounts || accounts.length === 0) {
					throw new Error('No accounts found');
				}

				console.log("Connected accounts:", accounts);
			} catch (connectionError) {
				if (connectionError.code === -32002) {
					alert("A wallet connection is already pending. Please open your wallet and approve the connection.");
					throw connectionError;
				}
				console.error('Connection error:', connectionError);
				throw connectionError;
			}

			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			
			// Switch to Base network
			const network = await provider.getNetwork();
			if (network.chainId !== 8453) {
				try {
					await window.ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{ chainId: '0x2105' }]
					});
				} catch (switchError) {
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

			// Verify connection
			const address = await signer.getAddress();
			console.log("Connected address:", address);
			return signer;

		} catch (error) {
			console.error("Detailed connection error:", {
				message: error.message,
				code: error.code,
				stack: error.stack
			});
			
			// Handle specific MetaMask errors
			if (error.code === -32002) {
				alert("MetaMask is locked. Please open MetaMask, unlock your wallet, then try again.");
			} else if (error.code === 4001) {
				alert("Connection rejected. Please try again and approve the connection in your wallet.");
			} else {
				alert("Error connecting to wallet. Please try again.");
			}
			return null;
		}
	},

	// Handle product purchase
	async handlePurchase(productPrice, productId) {
		try {
			const signer = await this.connectWallet();
			if (!signer) return false;

			const priceInWei = ethers.utils.parseEther(productPrice.toString());
			const tx = await signer.sendTransaction({
				to: this.MERCHANT_WALLET,
				value: priceInWei,
				gasLimit: 21000
			});

			const receipt = await tx.wait();
			return receipt.status === 1;

		} catch (error) {
			console.error("Purchase error:", error);
			return false;
		}
	}
};

export default ProductHandler;
