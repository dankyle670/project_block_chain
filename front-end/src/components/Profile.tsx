import React from 'react';
import { Settings, Bell, Shield, Key } from 'lucide-react';

const Profile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profil</h1>

      {/* Profile Overview */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
            MT
          </div>
          <div>
            <h2 className="text-xl font-bold">0x1234...5678</h2>
            <p className="text-gray-400">Membre depuis mars 2024</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="text-indigo-400" />
            <h2 className="text-xl font-bold">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            {[
              'Transactions',
              'Staking',
              'Gouvernance',
              'Nouvelles fonctionnalités',
            ].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <span>{item}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="text-indigo-400" />
            <h2 className="text-xl font-bold">Sécurité</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Authentification 2FA</h3>
                <p className="text-sm text-gray-400">Sécurisez votre compte avec 2FA</p>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors">
                Activer
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Appareils Connectés</h3>
                <p className="text-sm text-gray-400">Gérez vos sessions actives</p>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                Voir
              </button>
            </div>
          </div>
        </div>

        {/* Connected Wallets */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center space-x-2 mb-6">
            <Key className="text-indigo-400" />
            <h2 className="text-xl font-bold">Wallets Connectés</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-600/20 rounded-full p-2">
                  <img
                    src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg"
                    alt="MetaMask"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h3 className="font-medium">MetaMask</h3>
                  <p className="text-sm text-gray-400">0x1234...5678</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                Connecté
              </span>
            </div>

            <button className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <Key size={18} />
              <span>Connecter un autre wallet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
