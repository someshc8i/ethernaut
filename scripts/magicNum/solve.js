// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const INSTANCE_ADDRESS = '0xCea50811B8054144b44Bc585EA30400067a94E91';
    const [owner, addr1] = await ethers.getSigners();
    
    const MagicNum = await hre.ethers.getContractFactory("MagicNum");
    magic = MagicNum.attach(INSTANCE_ADDRESS)


    const MagicNumHack = await hre.ethers.getContractFactory("MagicNumHack");
    const magicHack = await MagicNumHack.deploy();
    await magicHack.deployed()
    

    await magic.setSolver(magicHack.address)    

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
