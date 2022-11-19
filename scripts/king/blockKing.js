// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const INSTANCE_ADDRESS = '0xA81235d3B34BE9fF5641a76810846d082b1F4EDC';
    const [owner, addr1] = await ethers.getSigners();

    const King = await hre.ethers.getContractFactory("King");
    const king = King.attach(INSTANCE_ADDRESS);

    console.log(await king.prize());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
