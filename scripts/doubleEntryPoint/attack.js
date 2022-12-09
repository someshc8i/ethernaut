// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

    const [owner, player] = await ethers.getSigners();
    INSTANCE_ADDRESS = '0x33BE1e7f70132ACAE67Dc18151F2c64e977a90C1';

    const DoubleEntryPoint = await hre.ethers.getContractFactory("DoubleEntryPoint");
    const LegacyToken = await hre.ethers.getContractFactory("LegacyToken");
    const CryptoVault = await hre.ethers.getContractFactory("CryptoVault");
    const Forta = await hre.ethers.getContractFactory("Forta");
    const Bot = await hre.ethers.getContractFactory("Bot");
    bot = await Bot.deploy()
    await bot.deployed;
    console.log(bot.address);

    dep = DoubleEntryPoint.attach(INSTANCE_ADDRESS);
    forta = Forta.attach(await dep.forta());

    tx = await forta.setDetectionBot(bot.address); 
    console.log(tx)
    await tx.wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
