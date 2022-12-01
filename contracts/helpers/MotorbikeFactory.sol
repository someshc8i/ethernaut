// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../motorbike/Motorbike.sol";
import '@openzeppelin/contracts/utils/Address.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Level is Ownable {
  function createInstance(address _player) virtual public payable returns (address);
  function validateInstance(address payable _instance, address _player) virtual public returns (bool);
}

contract MotorbikeFactory is Level {

  mapping(address => address) private engines;
  address public lastInstance;

  function createInstance(address _player) public payable override returns (address) {
    _player;

    Engine engine = new Engine();
    Motorbike motorbike = new Motorbike(address(engine));
    engines[address(motorbike)] = address(engine);

    require(
        keccak256(Address.functionCall(
            address(motorbike),
            abi.encodeWithSignature("upgrader()")
        )) == keccak256(abi.encode(address(this))), 
        "Wrong upgrader address"
    );

    require(
        keccak256(Address.functionCall(
            address(motorbike),
            abi.encodeWithSignature("horsePower()")
        )) == keccak256(abi.encode(uint256(1000))), 
        "Wrong horsePower"
    );

    lastInstance = address(motorbike);
    return address(motorbike);
  }

  function validateInstance(address payable _instance, address _player) public view override returns (bool) {
    _player;
    return Address.isContract(engines[_instance]);
  }
}