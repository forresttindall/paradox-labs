import { ethers } from 'ethers';

export const ProductHandler = {
	// Store your wallet address
	MERCHANT_WALLET: "0x19144a7A6cdBe91fB282d8b16e376E88038E4E4F",

	// Initialize connection to wallet
	async connectWallet() {
		try {
			const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
			console.log('Debug - Device type:', isMobile ? 'Mobile' : 'Desktop');
			console.log('Debug - window.ethereum:', window.ethereum);
			console.log('Debug - window.coinbaseWalletExtension:', window.coinbaseWalletExtension);
			console.log('Debug - Available providers:', window.ethereum?.providers);

			// Mobile handling
			if (isMobile) {
				if (!window.ethereum) {
					console.log('Debug - Mobile: No ethereum provider, redirecting to Coinbase');
					window.location.href = `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(window.location.href)}`;
					return null;
				}
				console.log('Debug - Mobile: Found ethereum provider, proceeding');
				const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
				await provider.send("eth_requestAccounts", []);
				return provider.getSigner();
			}

			// Desktop handling
			if (!window.ethereum) {
				console.log('Debug - Desktop: No ethereum provider found');
				alert("Please install Coinbase Wallet!");
				return null;
			}

			// Try to find Coinbase Wallet provider
			let provider;
			if (window.ethereum.providers?.length) {
				console.log('Debug - Desktop: Multiple providers found');
				const coinbaseProvider = window.ethereum.providers.find(p => p.isCoinbaseWallet);
				if (coinbaseProvider) {
					console.log('Debug - Desktop: Found Coinbase provider in list');
					provider = coinbaseProvider;
				}
			} else if (window.coinbaseWalletExtension) {
				console.log('Debug - Desktop: Found Coinbase extension directly');
				provider = window.coinbaseWalletExtension;
			} else if (window.ethereum.isCoinbaseWallet) {
				console.log('Debug - Desktop: Found Coinbase in window.ethereum');
				provider = window.ethereum;
			}

			if (!provider) {
				console.log('Debug - Desktop: No Coinbase provider found');
				alert("Please use Coinbase Wallet for transactions.");
				return null;
			}

			try {
				console.log('Debug - Desktop: Initializing Web3Provider');
				const web3Provider = new ethers.providers.Web3Provider(provider, "any");
				await web3Provider.send("eth_requestAccounts", []);
				
				const signer = web3Provider.getSigner();
				const network = await web3Provider.getNetwork();
				console.log('Debug - Network:', network);

				// Switch network if needed
				if (network.chainId !== 8453) {
					console.log('Debug - Wrong network, attempting to switch');
					try {
						await provider.request({
							method: 'wallet_switchEthereumChain',
							params: [{ chainId: '0x2105' }]
						});
					} catch (switchError) {
						console.log('Debug - Network switch error:', switchError);
						if (switchError.code === 4902) {
							await provider.request({
								method: 'wallet_addEthereumChain',
								params: [{
									chainId: '0x2105',
									chainName: 'Base Mainnet',
									nativeCurrency: {
										name: 'Ethereum',
										symbol: 'ETH',
										decimals: 18
									},
									rpcUrls: ['https://mainnet.base.org'],
									blockExplorerUrls: ['https://basescan.org']
								}]
							});
						} else {
							throw switchError;
						}
					}
					return new ethers.providers.Web3Provider(provider, "any").getSigner();
				}

				return signer;
			} catch (error) {
				console.error("Debug - Provider error:", error);
				if (error.code === -32002) {
					alert("Please open your Coinbase Wallet and approve the connection request.");
				} else if (error.code === 4001) {
					alert("Please approve the connection request in Coinbase Wallet.");
				} else {
					alert("Failed to connect wallet. Please try again.");
				}
				return null;
			}

		} catch (error) {
			console.error("Debug - Connection error:", error);
			return null;
		}
	},

	// Handle product purchase
	async handlePurchase(productPrice, productId) {
		try {
			const signer = await this.connectWallet();
			if (!signer) {
				return false;
			}

			const priceInWei = ethers.utils.parseEther(productPrice.toString());
			
			// For mobile deep linking
			const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
			if (isMobile && !window.ethereum) {
				const paymentUrl = `https://go.cb-w.com/pay?address=${this.MERCHANT_WALLET}&amount=${productPrice}&asset=ETH`;
				window.location.href = paymentUrl;
				return false;
			}

			const tx = await signer.sendTransaction({
				to: this.MERCHANT_WALLET,
				value: priceInWei,
				gasLimit: 21000
			});

			const receipt = await tx.wait();
			return receipt.status === 1;
		} catch (error) {
			console.error("Purchase error:", error);
			if (error.code === 'INSUFFICIENT_FUNDS') {
				alert("Insufficient funds to complete the transaction.");
			} else if (error.code === 'ACTION_REJECTED') {
				alert("Transaction was rejected. Please try again.");
			} else {
				alert("An error occurred during the purchase. Please try again.");
			}
			return false;
		}
	}
};

export default ProductHandler;
