# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```


Plan pour avancer rapidement :
Configuration de Hardhat (si ce n’est pas encore fait)

Vérifier que Hardhat est bien installé.
S’assurer que le projet est bien initialisé (npx hardhat).
Installer les dépendances nécessaires (ethers, dotenv, hardhat-waffle si besoin).
Création du smart contract ERC-20 (si tu crées un token)

Définir un token basique avec OpenZeppelin (@openzeppelin/contracts).
Implémenter les fonctions de base (mint, transfer, balanceOf).
Déploiement du smart contract sur un réseau de test

Configurer un réseau de test comme Sepolia ou Goerli dans hardhat.config.ts.
Utiliser un compte avec des ETH de test (via un faucet).
Écrire un script de déploiement.
Interaction avec le contrat

Ajouter des fonctions pour envoyer et recevoir des tokens.
Sécuriser les transactions.
Tester avec Hardhat et ethers.js.
Tests unitaires

Vérifier que les transactions et les accès aux données fonctionnent.
On peut avancer step by step. Où en es-tu dans la config de Hardhat ?



secret key:screen lobster deputy stool tape viable nose finish ticket portion horse federal