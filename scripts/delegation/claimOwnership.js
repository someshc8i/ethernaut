// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    // https://goerli.etherscan.io/tx/0x469f17d0f57f75cbbee96c96227cb5dc750f0d8d458329d70337316dd42163a5

    // https://goerli.etherscan.io/tx/0x7d29fb425536c3e863416f504be2f85b34331a4234ad17ffce7ef8aa3696696a
    const INSTANCE_ADDRESS = '0x2Bcf7dA80625c8fC535Dee4F538a30aeF511A43f';
    const [owner] = await ethers.getSigners();

    const Delegation = await hre.ethers.getContractFactory("Delegation");
    const Delegate = await hre.ethers.getContractFactory("Delegate");

    // const delegate = await Delegate.deploy(prevOwner.address);
    const delegation = Delegation.attach(INSTANCE_ADDRESS);

    console.log(await delegation.owner());

    // let delegateOnDelegation = await Delegate.attach(INSTANCE_ADDRESS);
    // const tx = await delegateOnDelegation.pwn();
    // console.log(tx);
    // await tx.wait();

    // console.log(await delegation.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
