// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

    const signers = await ethers.getSigners();
    const owner = signers[0];
    const tokenAddress = '0x8D35e89F3a0f87daF561ADd4CC621238fB009E37';

    const Token = await hre.ethers.getContractFactory("Token");

    // const token = await Token.deploy(20);
    // await token.deployed();
    // console.log(`token deployed at ${token.address}`);

    const token = Token.attach(tokenAddress);
    console.log(await token.balanceOf(owner.address));
    
    // console.log(await token.balanceOf("0xd2e5e0102e55a5234379dd796b8c641cd5996efd"));
    // console.log(await token.totalSupply());

    // const tx = await token.transfer(ethers.constants.AddressZero, ethers.utils.parseEther("21"));
    // await tx.wait()
    // console.log(await token.balanceOf(owner.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
