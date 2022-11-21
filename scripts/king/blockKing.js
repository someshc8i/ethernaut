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
    const KING_HACK_ADDRESS = '0x8fea05CC036f45b0A855646248D32644ceED3338';
    const [owner, addr1] = await ethers.getSigners();

    const King = await hre.ethers.getContractFactory("King");
    const KingHack = await hre.ethers.getContractFactory("KingHack");
    const king = King.attach(INSTANCE_ADDRESS);
    const kingHack = KingHack.attach(KING_HACK_ADDRESS);
    // const kingHack = await KingHack.deploy();
    // await kingHack.deployed();
    // console.log(kingHack.address);

    console.log(owner.address);
    console.log(await king.prize());

    // const tx = await kingHack.sendPayment(king.address, {value: hre.ethers.utils.parseEther("0.002")});
    // console.log(tx);
    // await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
