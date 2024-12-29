import { ethers } from 'ethers';

export const ProductHandler = {
	// Store your wallet address
	MERCHANT_WALLET: "0x19144a7A6cdBe91fB282d8b16e376E88038E4E4F",

	// Initialize connection to wallet
	async connectWallet() {
		try {
			if (!window.ethereum) {
				alert("Please install Coinbase Wallet!");
				return null;
			}

			// Check if it's Coinbase Wallet
			const isCoinbase = window.ethereum.isCoinbaseWallet;
			if (!isCoinbase) {
				alert("Please use Coinbase Wallet for transactions.");
				return null;
			}

			let provider;
			try {
				provider = new ethers.providers.Web3Provider(window.ethereum, "any");
				await provider.send("eth_requestAccounts", []);
				
				const signer = provider.getSigner();
				const network = await provider.getNetwork();

				// Switch network if needed
				if (network.chainId !== 8453) {
					try {
						await window.ethereum.request({
							method: 'wallet_switchEthereumChain',
							params: [{ chainId: '0x2105' }]
						});
					} catch (switchError) {
						if (switchError.code === 4902) {
							await window.ethereum.request({
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
					provider = new ethers.providers.Web3Provider(window.ethereum, "any");
					return provider.getSigner();
				}

				return signer;
			} catch (error) {
				console.error("Provider error:", error);
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
			console.error("Connection error:", error);
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

