import React from 'react';
import { Vote, Users, CheckCircle2, XCircle } from 'lucide-react';

const Governance = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gouvernance</h1>

      {/* Voting Power */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2">
            <Vote className="text-indigo-400" />
            <h3 className="text-lg font-medium">Pouvoir de Vote</h3>
          </div>
          <p className="text-3xl font-bold mt-4">500.00 MTK</p>
          <p className="text-sm text-gray-400 mt-1">Basé sur vos tokens stakés</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2">
            <Users className="text-indigo-400" />
            <h3 className="text-lg font-medium">Participation</h3>
          </div>
          <p className="text-3xl font-bold mt-4">15.5%</p>
          <p className="text-sm text-gray-400 mt-1">Du total des votes</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="text-indigo-400" />
            <h3 className="text-lg font-medium">Propositions Actives</h3>
          </div>
          <p className="text-3xl font-bold mt-4">3</p>
          <p className="text-sm text-gray-400 mt-1">En cours de vote</p>
        </div>
      </div>

      {/* Active Proposals */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Propositions Actives</h2>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors">
            Nouvelle Proposition
          </button>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="border border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium">
                    Proposition #{index + 1}: {index === 0 ? "Augmentation du taux de récompense" : index === 1 ? "Modification des paramètres de staking" : "Ajout d'un nouveau pool de liquidité"}
                  </h3>
                  <p className="text-gray-400 mt-2">
                    {index === 0 
                      ? "Augmenter le taux de récompense de staking de 10% à 12.5% pour encourager plus de participation."
                      : index === 1 
                      ? "Réduire la période minimale de staking de 7 jours à 3 jours."
                      : "Ajouter un nouveau pool de liquidité MTK/USDC avec des récompenses bonus."}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  index === 0 ? 'bg-green-500/20 text-green-500' : 
                  index === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {index === 0 ? 'Actif' : index === 1 ? 'En cours' : 'Terminé'}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Participation: {65 - index * 15}%</span>
                  <span>{1000 - index * 200} votes</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${65 - index * 15}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <CheckCircle2 size={18} />
                  <span>Pour</span>
                </button>
                <button className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <XCircle size={18} />
                  <span>Contre</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Governance;