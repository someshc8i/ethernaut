// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract MagicNumHack {
    constructor() public {
        assembly {
            mstore(0x00, 0x602a60805260206080f3)
            return(0x16, 0x0a)
        }
    }
}
