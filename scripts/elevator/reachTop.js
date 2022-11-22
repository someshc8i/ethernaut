// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const INSTANCE_ADDRESS = '0x56803bCfa6A1A49478Ae3B2C57be7EfBA8dA46e7';
    const [owner, addr1] = await ethers.getSigners();
    
    const Elevator = await hre.ethers.getContractFactory("Elevator");
    const elevator = Elevator.attach(INSTANCE_ADDRESS);

    console.log(await elevator.top());


    const BuildingContract = await hre.ethers.getContractFactory("BuildingContract");
    const building = await BuildingContract.deploy();
    await building.deployed()

    console.log(`building deployed on ${building.address}`);

    const tx = await building.goTo(INSTANCE_ADDRESS);
    console.log(tx)
    await tx.wait()

    console.log(await elevator.top());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
