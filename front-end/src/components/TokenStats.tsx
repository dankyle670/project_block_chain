import React from 'react';
import { LineChart, BarChart2, PieChart, TrendingUp } from 'lucide-react';

const TokenStats = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Statistiques du Token</h1>

      {/* Token Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2">
            <LineChart className="text-indigo-400" />
            <h3 className="text-lg font-medium">Prix</h3>
          </div>
          <p className="text-3xl font-bold mt-4">$3.50</p>
          <div className="flex items-center mt-2 text-green-400">
            <TrendingUp size={16} />
            <span className="text-sm">+5.2% (24h)</span>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2">
            <BarChart2 className="text-indigo-400" />
            <h3 className="text-lg font-medium">Volume 24h</h3>
          </div>
          <p className="text-3xl font-bold mt-4">$250K</p>
          <div className="flex items-center mt-2 text-red-400">
            <TrendingUp size={16} className="rotate-180" />
            <span className="text-sm">-2.1% (24h)</span>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2">
            <PieChart className="text-indigo-400" />
            <h3 className="text-lg font-medium">Market Cap</h3>
          </div>
          <p className="text-3xl font-bold mt-4">$35M</p>
          <div className="flex items-center mt-2 text-green-400">
            <TrendingUp size={16} />
            <span className="text-sm">+1.8% (24h)</span>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2">
            <LineChart className="text-indigo-400" />
            <h3 className="text-lg font-medium">Holders</h3>
          </div>
          <p className="text-3xl font-bold mt-4">1,234</p>
          <div className="flex items-center mt-2 text-green-400">
            <TrendingUp size={16} />
            <span className="text-sm">+12 (24h)</span>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Évolution du Prix</h2>
          <div className="flex space-x-2">
            {['24H', '7D', '1M', '3M', '1Y', 'ALL'].map((period) => (
              <button
                key={period}
                className={`px-3 py-1 rounded-lg text-sm ${
                  period === '7D'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64 flex items-center justify-center text-gray-400">
          [Graphique d'évolution du prix]
        </div>
      </div>

      {/* Token Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-6">Distribution des Tokens</h2>
          <div className="space-y-4">
            {[
              { label: 'Circulation', value: '60%', color: 'bg-indigo-400' },
              { label: 'Staking', value: '25%', color: 'bg-green-400' },
              { label: 'Trésorerie', value: '10%', color: 'bg-yellow-400' },
              { label: 'Team', value: '5%', color: 'bg-red-400' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: item.value }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-6">Top Holders</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenStats;