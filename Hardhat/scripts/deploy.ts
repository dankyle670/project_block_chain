import { ethers } from "hardhat";

async function main() {
  // Deploying contract ERC-20 token
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(1000000); // 1 million tokens

  console.log("Token contract deployed to:", token.address);

  // Attendre que la transaction de déploiement soit confirmée
  await token.deployTransaction.wait();

  console.log("Contract deployed successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
