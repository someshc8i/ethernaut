// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../puzzleWallet/PuzzleWallet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Level is Ownable {
    function createInstance(address _player)
        public
        payable
        virtual
        returns (address);

    function validateInstance(address payable _instance, address _player)
        public
        virtual
        returns (bool);
}

contract PuzzleWalletFactory is Level {
    address public lastInstance;

    function createInstance(
        address /*_player*/
    ) public payable override returns (address) {
        require(
            msg.value == 0.001 ether,
            "Must send 0.001 ETH to create instance"
        );

        // deploy the PuzzleWallet logic
        PuzzleWallet walletLogic = new PuzzleWallet();

        // deploy proxy and initialize implementation contract
        bytes memory data = abi.encodeWithSelector(
            PuzzleWallet.init.selector,
            100 ether
        );
        PuzzleProxy proxy = new PuzzleProxy(
            address(this),
            address(walletLogic),
            data
        );
        PuzzleWallet instance = PuzzleWallet(address(proxy));

        // whitelist this contract to allow it to deposit ETH
        instance.addToWhitelist(address(this));
        instance.deposit{value: msg.value}();
        lastInstance = address(instance);
        return address(proxy);
    }

    function validateInstance(address payable _instance, address _player)
        public
        view
        override
        returns (bool)
    {
        PuzzleProxy proxy = PuzzleProxy(_instance);

        return proxy.admin() == _player;
    }
}
