// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

    const CoinFlip = await hre.ethers.getContractFactory("CoinFlip");
    const CoinFlipHack = await hre.ethers.getContractFactory("CoinFlipHack");

    const coinFlip = CoinFlip.attach('0x32D751A67920861323c865aaE1Eb1B466743C698');
    // await coinFlip.deployed();
    console.log(`CoinFlip attached to ${coinFlip.address}`);
    let consecutiveWins = await coinFlip.consecutiveWins();
    console.log(consecutiveWins);

    // const coinFlipHack = CoinFlipHack.attach('0xC468b68a328A412db432EA6843DB4b9ae625aa7d');
    // console.log(`CoinFlipHack attached to ${coinFlipHack.address}`);


    // const tx = await coinFlipHack.callFlip();
    // console.log(tx);
    // consecutiveWins = await coinFlip.consecutiveWins();
    // console.log(consecutiveWins);
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
