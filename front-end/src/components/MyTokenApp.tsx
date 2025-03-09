import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { abi } from '../../contrats/contrat'; // Vérifie bien le chemin de ton ABI

// Adresse du contrat ERC-20 déployé
const tokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'; // Remplace par ton adresse

function MyTokenApp() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [ethAmount, setEthAmount] = useState<string>('');

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask non trouvé. Veuillez l'installer.");
        return;
      }

      const provider = new Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      updateBalances(provider, address);
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert("Erreur de connexion à MetaMask.");
    }
  };

  const updateBalances = async (provider: Web3Provider, address: string) => {
    try {
      // Récupération du solde en ETH
      const ethBal = await provider.getBalance(address);
      setEthBalance(ethers.utils.formatEther(ethBal));

      // Récupération du solde en tokens
      const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
      const decimals = await tokenContract.decimals();
      const balance = await tokenContract.balanceOf(address);
      setTokenBalance(ethers.utils.formatUnits(balance, decimals));
    } catch (error) {
      console.error("Erreur lors de la récupération des soldes:", error);
    }
  };

  const sendTokens = async () => {
    if (!recipient || !amount) {
      alert("Veuillez entrer un destinataire et un montant.");
      return;
    }

    try {
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, abi, signer);

      const decimals = await tokenContract.decimals();
      const amountInWei = ethers.utils.parseUnits(amount, decimals);

      const tx = await tokenContract.transferBetweenUsers(recipient, amountInWei);
      await tx.wait();

      alert(`Transaction réussie : ${tx.hash}`);
      updateBalances(provider, walletAddress!);
    } catch (error) {
      console.error("Erreur d'envoi des tokens:", error);
      alert("Erreur lors de l'envoi des tokens.");
    }
  };

  const sendEth = async () => {
    if (!recipient || !ethAmount) {
      alert("Veuillez entrer un destinataire et un montant.");
      return;
    }

    try {
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(ethAmount),
      });

      await tx.wait();

      alert(`Transaction réussie : ${tx.hash}`);
      updateBalances(provider, walletAddress!);
    } catch (error) {
      console.error("Erreur d'envoi des ETH:", error);
      alert("Erreur lors de l'envoi des ETH.");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold">MyToken DApp</span>
            <div className="flex items-center space-x-4">
              {walletAddress && (
                <span className="text-sm text-gray-300">
                  Balance: {tokenBalance} MTK | {ethBalance} ETH
                </span>
              )}
              <button
                onClick={connectWallet}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {walletAddress
                  ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                  : 'Connect Wallet'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-8">
        {walletAddress && (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Send Tokens</h2>
              <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="mb-2 p-2 rounded-lg bg-gray-700 text-white w-full"
              />
              <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mb-2 p-2 rounded-lg bg-gray-700 text-white w-full"
              />
              <button
                onClick={sendTokens}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium"
              >
                Send Tokens
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Send ETH</h2>
              <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="mb-2 p-2 rounded-lg bg-gray-700 text-white w-full"
              />
              <input
                type="text"
                placeholder="Amount (ETH)"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                className="mb-2 p-2 rounded-lg bg-gray-700 text-white w-full"
              />
              <button
                onClick={sendEth}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
              >
                Send ETH
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyTokenApp;
