
import { ethers } from "ethers";

// Utilise ta phrase de récupération
const mnemonic = "screen lobster deputy stool tape viable nose finish ticket portion horse federal";

// Générer un wallet à partir de la phrase de récupération
const wallet = ethers.Wallet.fromMnemonic(mnemonic);

console.log("Private Key:", wallet.privateKey);
console.log("Address:", wallet.address);