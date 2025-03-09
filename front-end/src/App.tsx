import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Wallet, Coins, Vote, LineChart, UserCircle, Send } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Staking from './components/Staking';
import Governance from './components/Governance';
import Profile from './components/Profile';
import TokenStats from './components/TokenStats';
import MyTokenApp from './components/MyTokenApp';  // Import de la nouvelle page

const tokenAddress = 'ADRESSE_DU_CONTRAT_ERC20_ICI'; // Remplace par l'adresse réelle

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null); 

  // Fonction pour connecter le wallet MetaMask et récupérer l'adresse + solde
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        setWalletAddress(address);

        const balanceWei = await provider.getBalance(address);
        const balanceEth = ethers.formatEther(balanceWei);
        setBalance(parseFloat(balanceEth).toFixed(4)); 
      } catch (error) {
        console.error("Erreur lors de la connexion au wallet :", error);
      }
    } else {
      alert("MetaMask n'est pas installé. Veuillez l'installer pour continuer.");
    }
  };

  // Affichage du contenu selon l'onglet actif
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'staking':
        return <Staking />;
      case 'governance':
        return <Governance />;
      case 'stats':
        return <TokenStats />;
      case 'profile':
        return <Profile />;
      case 'transactions':
        return <MyTokenApp walletAddress={walletAddress} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">MyToken DApp</span>
            </div>
            <div className="flex items-center space-x-4">
              {walletAddress && balance && (
                <span className="text-sm text-gray-300">
                  Solde : {balance} ETH
                </span>
              )}
              <button
                onClick={connectWallet}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {walletAddress
                  ? `Connecté : ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                  : 'Connecter Wallet'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <div className="w-64 bg-gray-800 h-[calc(100vh-4rem)] p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'dashboard' ? 'bg-indigo-600' : 'hover:bg-gray-700'
              }`}
            >
              <Wallet size={20} />
              <span>Tableau de bord</span>
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'transactions' ? 'bg-indigo-600' : 'hover:bg-gray-700'
              }`}
            >
              <Send size={20} />
              <span>Transactions</span>
            </button>
            <button
              onClick={() => setActiveTab('staking')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'staking' ? 'bg-indigo-600' : 'hover:bg-gray-700'
              }`}
            >
              <Coins size={20} />
              <span>Staking</span>
            </button>
            <button
              onClick={() => setActiveTab('governance')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'governance' ? 'bg-indigo-600' : 'hover:bg-gray-700'
              }`}
            >
              <Vote size={20} />
              <span>Gouvernance</span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'stats' ? 'bg-indigo-600' : 'hover:bg-gray-700'
              }`}
            >
              <LineChart size={20} />
              <span>Statistiques</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                activeTab === 'profile' ? 'bg-indigo-600' : 'hover:bg-gray-700'
              }`}
            >
              <UserCircle size={20} />
              <span>Profil</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App
