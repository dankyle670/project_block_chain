import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { LockIcon, UnlockIcon, TrendingUp } from 'lucide-react';

const Staking = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [ethBalance, setEthBalance] = useState('0');
  const [stakeAmount, setStakeAmount] = useState('0');
  const [stakingHistory, setStakingHistory] = useState([]);
  
  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      setProvider(provider);

      provider.send("eth_requestAccounts", [])
        .then(() => {
          const signer = provider.getSigner();
          setSigner(signer);
          signer.getBalance().then((balance) => {
            setEthBalance(ethers.utils.formatEther(balance));
          });
        })
        .catch((err) => {
          console.error("User denied account access", err);
        });
    } else {
      console.error("MetaMask is not installed");
    }
  }, []);

  const handleStake = async () => {
    if (!signer || !stakeAmount) {
      alert("Please enter a valid stake amount.");
      return;
    }

    const amountInWei = ethers.utils.parseEther(stakeAmount);

    // Send ETH to the staking contract or an address
    try {
      const tx = await signer.sendTransaction({
        to: "0x8Fa4e8075B225dD2D28ef689241b9EE364c727Ee", // Add your staking contract address here if needed
        value: amountInWei,
      });
      await tx.wait(); // Wait for the transaction to be mined
      alert("Staking successful!");

      // Update staking history
      const newStakingHistory = [
        ...stakingHistory,
        {
          type: "Stake",
          amount: stakeAmount,
          date: new Date().toLocaleString(),
          status: "Completed"
        }
      ];
      setStakingHistory(newStakingHistory);

      // Update ETH balance after staking
      const newBalance = await signer.getBalance();
      setEthBalance(ethers.utils.formatEther(newBalance));
    } catch (error) {
      console.error("Staking failed", error);
      alert("An error occurred while staking.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Staking</h1>

      {/* Staking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2">
            <LockIcon className="text-indigo-400" />
            <h3 className="text-lg font-medium">Total Staké</h3>
          </div>
          <p className="text-3xl font-bold mt-4">{ethBalance} ETH</p>
          <p className="text-sm text-gray-400 mt-1">≈ ${parseFloat(ethBalance) * 1500}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-green-400" />
            <h3 className="text-lg font-medium">Récompenses</h3>
          </div>
          <p className="text-3xl font-bold mt-4">25.50 ETH</p>
          <p className="text-sm text-gray-400 mt-1">≈ $76.50</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2">
            <UnlockIcon className="text-yellow-400" />
            <h3 className="text-lg font-medium">APY</h3>
          </div>
          <p className="text-3xl font-bold mt-4">12.5%</p>
          <p className="text-sm text-gray-400 mt-1">Taux annuel</p>
        </div>
      </div>

      {/* Staking Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stake Tokens */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Staker des Tokens</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Montant à staker
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                  placeholder="0.00"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-indigo-400 hover:text-indigo-300">
                  MAX
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">Balance: {ethBalance} ETH</p>
            </div>
            <button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-colors"
              onClick={handleStake}>
              Staker
            </button>
          </div>
        </div>

        {/* Unstake Tokens */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Retirer des Tokens</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Montant à retirer
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                  placeholder="0.00"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-indigo-400 hover:text-indigo-300">
                  MAX
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">Staké: 500.00 ETH</p>
            </div>
            <button className="w-full bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition-colors">
              Retirer
            </button>
          </div>
        </div>
      </div>

      {/* Staking History */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Historique de Staking</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-4">Type</th>
                <th className="pb-4">Montant</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {stakingHistory.map((history, index) => (
                <tr key={index}>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      {history.type === "Stake" ? (
                        <LockIcon size={16} className="text-green-400" />
                      ) : (
                        <UnlockIcon size={16} className="text-red-400" />
                      )}
                      <span>{history.type}</span>
                    </div>
                  </td>
                  <td className="py-4">{history.amount} ETH</td>
                  <td className="py-4 text-gray-400">{history.date}</td>
                  <td className="py-4">
                    <span className={`text-${history.status === 'Completed' ? 'green' : 'red'}-400`}>
                      {history.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Staking;
