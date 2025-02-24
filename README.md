# Paradox Labs: Web3 Digital Marketplace


A blockchain-powered marketplace for DIY hacker projects, 3D print files, software downloads, and more, built on Base L2 with Coinbase Wallet integration.

[Paradox Labs Marketplace](https://paradoxlabs.tech)

## Overview

Paradox Labs is a future-ready digital marketplace that leverages blockchain technology to create a decentralized platform for selling and distributing digital goods. The platform specializes in DIY hacker projects, 3D print files, and software downloads, all secured and distributed through blockchain technology.

## Features

- **Web3 Authentication**: Connect securely using Ethereum-based wallets
- **Base L2 Integration**: Built on Coinbase's Base Layer 2 solution for fast, low-cost transactions
- **Smart Contract Security**: Atomic purchases with instant delivery triggers
- **Decentralized Storage**: Files distributed via IPFS for high availability
- **Zero-Knowledge Architecture**: No personal data collected or stored
- **Cross-Platform Support**: Desktop support via Coinbase Wallet extension with mobile deep linking

## Tech Stack

- **Frontend**: React.js
- **Blockchain**: Base L2 (Ethereum Layer 2)
- **Authentication**: Web3 wallet connection (EIP-1193 compliant)
- **Payment Processing**: Native ETH transactions
- **Smart Contracts**: EVM-compatible contracts for secure transactions Web3.js & Ethers.js


## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/forresttindall/paradox-labs.git
   cd paradox-labs
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm start
   ```

## Usage

### For Buyers

1. Navigate to the product you want to purchase
2. Click "Buy Now"
3. Connect your Coinbase Wallet when prompted
4. Confirm the transaction in your wallet
5. The file will automatically download upon successful transaction

### For Developers

To add a new product:

1. Create a new product component in `src/Products/`
2. Add the product's digital assets to `public/ProductFiles/`
3. Update the Shop component to include the new product
4. Ensure proper pricing configuration in the product component

## Smart Contract Integration

The marketplace uses direct wallet-to-wallet transactions secured by the Base L2 blockchain:

```javascript
const tx = await signer.sendTransaction({
    to: this.MERCHANT_WALLET,
    value: priceInWei,
    gasLimit: 21000
});
```

## Mobile Support

The platform includes specialized mobile detection and deep linking:

```javascript
if (isMobile && !window.ethereum) {
    const paymentUrl = `https://go.cb-w.com/pay?address=${this.MERCHANT_WALLET}&amount=${productPrice}&asset=ETH`;
    window.location.href = paymentUrl;
    return false;
}
```

## Future Roadmap

- [ ] Add support for additional wallets (MetaMask, WalletConnect)
- [ ] Implement ERC-721 receipts as proof of purchase
- [ ] Create subscription-based product offerings
- [ ] Expand to additional L2 networks (Arbitrum, Optimism)
- [ ] Add multi-currency support (USDC, DAI)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Forrest Tindall - [forrest.tindall@gmail.com](mailto:forrest.tindall@gmail.com)

Project Link: [https://github.com/forresttindall/paradox-labs](paradox-labs](https://github.com/forresttindall/paradox-labs-web3-marketplace))
