// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DoubleEntryPoint.sol";

contract Bot is IDetectionBot {
    function handleTransaction(address user, bytes calldata msgData) external {
        Forta forta = Forta(msg.sender);
        forta.raiseAlert(user);
    }
}