import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { Wallet, RefreshCw } from 'lucide-react';

const MTK_CONTRACT_ADDRESS = "YOUR_MTK_CONTRACT_ADDRESS"; // Replace with actual address
const MTK_ABI = [
  "function balanceOf(address owner) view returns (uint256)"
]; // Replace with actual ABI

interface DashboardProps {
  userAddress: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userAddress }) => {
  const [ethBalance, setEthBalance] = useState<string>('0.00');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [totalValue, setTotalValue] = useState<string>('0.00');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Veuillez installer MetaMask !");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      console.log("Adresse connectée :", address);
    } catch (error) {
      console.error("Erreur lors de la connexion au wallet :", error);
    }
  };

  const fetchEthBalance = async () => {
    if (!walletAddress) return;
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(walletAddress);
      setEthBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error('Error fetching ETH balance:', err);
      setError('Failed to fetch ETH balance.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTokenPrices = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      const ethPrice = response.data.ethereum.usd;
      setTotalValue(
        (parseFloat(ethBalance) * ethPrice).toFixed(2)
      );
    } catch (error) {
      console.error('Error fetching token prices:', error);
      setError('Failed to fetch token prices.');
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchEthBalance();
      fetchTokenPrices();
    }
  }, [walletAddress, ethBalance]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <button onClick={connectWallet} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        {walletAddress ? "Wallet Connecté" : "Connecter le Wallet"}
      </button>
      {walletAddress && <p className="text-sm text-gray-400">Adresse : {walletAddress}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <Wallet className="text-indigo-400" size={24} />
            <RefreshCw size={20} className="text-gray-400 hover:text-white cursor-pointer" onClick={fetchEthBalance} />
          </div>
          <p className="text-3xl font-bold mt-4">{loading ? 'Loading...' : `${ethBalance} ETH`}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <Wallet className="text-indigo-400" size={24} />
            <RefreshCw size={20} className="text-gray-400 hover:text-white cursor-pointer" onClick={fetchTokenPrices} />
          </div>
          <p className="text-3xl font-bold mt-4">${totalValue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
