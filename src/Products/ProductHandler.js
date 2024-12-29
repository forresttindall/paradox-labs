import { ethers } from "ethers";

export const ProductHandler = {
    MERCHANT_WALLET: "0x19144a7A6cdBe91fB282d8b16e376E88038E4E4F",

    async connectWallet() {
        try {
            if (!window.ethereum || !window.ethereum.isMetaMask) {
                alert("Please use a wallet extension like Coinbase Wallet or MetaMask.");
                return null;
            }

            if (!window.ethereum.isCoinbaseWallet) {
                console.warn(
                    "It seems you're using a wallet other than Coinbase Wallet. Proceeding may result in unexpected behavior."
                );
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            return signer;
        } catch (error) {
            console.error("Connection error:", error);
            alert("Failed to connect wallet. Please try again.");
            return null;
        }
    },

    formatUrl(path, params = null) {
        const baseUrl = window.location.origin; // e.g., https://paradoxlabs.tech
        const routeUrl = `${baseUrl}${path}`; // For browser routing (no hash routing)

        if (params) {
            return `${routeUrl}?${params}`;
        }
        return routeUrl;
    },

    openCoinbaseWalletTransaction(currentPath, productPrice, productId) {
        const basePath = currentPath.split("?")[0];
        const successParams = new URLSearchParams({
            transaction: "complete",
            download: "true",
            productId: productId,
        }).toString();

        const baseUrl = this.formatUrl(basePath);
        const successUrl = this.formatUrl(basePath, successParams);
        const cancelUrl = baseUrl;

        const dappParams = new URLSearchParams({
            url: encodeURIComponent(baseUrl),
            action: "send",
            address: this.MERCHANT_WALLET,
            amount: productPrice,
            asset: "ETH",
            success_url: encodeURIComponent(successUrl),
            cancel_url: encodeURIComponent(cancelUrl),
        });

        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            // Mobile (iOS/Android)
            const walletUrl = `https://go.cb-w.com/pay?${dappParams.toString()}`;
            console.log("Mobile Wallet URL:", walletUrl);
            window.location.replace(walletUrl); // Ensures smooth transition to wallet
        } else {
            // Desktop (Coinbase Wallet Extension)
            this.connectWallet()
                .then(async (signer) => {
                    if (!signer) return;

                    const priceInWei = ethers.utils.parseEther(productPrice.toString());
                    await signer.sendTransaction({
                        to: this.MERCHANT_WALLET,
                        value: priceInWei,
                        gasLimit: 21000,
                    });

                    window.location.href = successUrl; // Redirect to success URL
                })
                .catch(console.error);
        }
    },

    async handlePurchase(productPrice, productId) {
        try {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isMobile && !window.ethereum) {
                // Mobile flow
                const currentPath = window.location.pathname;
                this.openCoinbaseWalletTransaction(currentPath, productPrice, productId);
                return false;
            }

            // Desktop flow
            const signer = await this.connectWallet();
            if (!signer) return false;

            const priceInWei = ethers.utils.parseEther(productPrice.toString());
            const tx = await signer.sendTransaction({
                to: this.MERCHANT_WALLET,
                value: priceInWei,
                gasLimit: 21000,
            });

            const receipt = await tx.wait();
            if (receipt.status === 1) {
                const successUrl = this.formatUrl(
                    window.location.pathname,
                    `transaction=complete&download=true&productId=${productId}`
                );
                window.location.href = successUrl;
            }
            return receipt.status === 1;
        } catch (error) {
            console.error("Purchase error:", error);
            alert("An error occurred during the purchase. Please try again.");
            return false;
        }
    },
};

export default ProductHandler;



