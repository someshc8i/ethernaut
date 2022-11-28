// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const INSTANCE_ADDRESS = '0x5c5C7f396626d4028A4d708E6ab33f1a7a44C633';
    const [owner] = await ethers.getSigners();
    // console.log(owner.address)

    const AlienCodex = await hre.ethers.getContractFactory("AlienCodex");
    const alienCodex = await AlienCodex.attach(INSTANCE_ADDRESS)
    console.log(await alienCodex.owner())

    const AlienCodexHack = await hre.ethers.getContractFactory("AlienCodexHack");
    const alienCodexHack = await AlienCodexHack.deploy(alienCodex.address)
    await alienCodexHack.deployed()
    console.log('hack address', alienCodexHack.address);

    console.log(await alienCodex.owner())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
