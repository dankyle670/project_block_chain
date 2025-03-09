// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {

    event TransferBetweenUsers(address indexed sender, address indexed recipient, uint256 amount);

    constructor(uint256 initialSupply) ERC20("MyToken", "MTK")         Ownable(msg.sender)
 {

        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }

    /**
     * @dev Fonction pour effectuer un transfert entre deux utilisateurs.
     * @param recipient L'adresse du destinataire.
     * @param amount Le montant de tokens à transférer.
     */
    function transferBetweenUsers(address recipient, uint256 amount) public returns (bool) {
        require(balanceOf(msg.sender) >= amount, "Solde insuffisant");

        _transfer(msg.sender, recipient, amount);

        emit TransferBetweenUsers(msg.sender, recipient, amount);

        return true;
    }
}
