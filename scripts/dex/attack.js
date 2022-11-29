// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function print_balances(player, token1, token2, dex, num) {

    console.log(`.........swap-${num}.............`)
    console.log('1-P', await token1.balanceOf(player.address))
    console.log('2-P', await token2.balanceOf(player.address))
    console.log('1-D', await token1.balanceOf(dex.address))
    console.log('2-D', await token2.balanceOf(dex.address))


}

async function main() {
    const [owner, player] = await ethers.getSigners();


    const Dex = await hre.ethers.getContractFactory("Dex");
    let dex = await Dex.deploy();
    await dex.deployed();

    

    const SwappableToken = await hre.ethers.getContractFactory("SwappableToken");
    let token1 = await SwappableToken.deploy(dex.address, "TST1", "TST1", 110);
    await token1.deployed();

    let token2 = await SwappableToken.deploy(dex.address, "TST2", "TST2", 110);
    await token2.deployed();

    await (await dex.setTokens(token1.address, token2.address)).wait();

    
    await token1.transfer(dex.address, 100)
    await token1.transfer(player.address, 10)
    await token2.transfer(dex.address, 100)
    await token2.transfer(player.address, 10)

    dex = dex.connect(player)
    token1 = token1.connect(player)
    token2 = token2.connect(player)

    await token1.approve(dex.address, 10)
    await token2.approve(dex.address, 10)
    await print_balances(player, token1, token2, dex, 0);
    tx = await dex.swap(token1.address, token2.address, 10);
    tx.wait()

    await print_balances(player, token1, token2, dex, 1);
    await token2.approve(dex.address, 20)
    tx = await dex.swap(token2.address, token1.address, 20);
    tx.wait()

    await print_balances(player, token1, token2, dex, 2);
    await token1.approve(dex.address, 24)
    tx = await dex.swap(token1.address, token2.address, 24);
    tx.wait()

    await print_balances(player, token1, token2, dex, 3);
    await token2.approve(dex.address, 30)
    tx = await dex.swap(token2.address, token1.address, 30);
    tx.wait()

    await print_balances(player, token1, token2, dex, 4);
    await token1.approve(dex.address, 41)
    tx = await dex.swap(token1.address, token2.address, 41);
    tx.wait()

    await print_balances(player, token1, token2, dex, 5);

    console.log(await dex.getSwapPrice(token2.address, token1.address, 45))
    await token2.approve(dex.address, 45)
    tx = await dex.swap(token2.address, token1.address, 45);
    tx.wait()

    await print_balances(player, token1, token2, dex, 'last');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
