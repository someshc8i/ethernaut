// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const INSTANCE_ADDRESS = '0xA3D68F0c447bd63Fe55d0b495c051c7671aaE992';
    const [owner] = await ethers.getSigners();

    const Denial = await hre.ethers.getContractFactory("Denial");
    // const denial = await Denial.deploy();
    // await denial.deployed();
    // await owner.sendTransaction({
    //     to: denial.address,
    //     value: ethers.utils.parseEther("0.5"), 
    //   });
    const denial = Denial.attach(INSTANCE_ADDRESS);


    const DenialHack = await hre.ethers.getContractFactory("DenialHack");
    const denialHack = await DenialHack.deploy(denial.address);
    await denialHack.deployed();

    console.log(`denial hack deployed on ${denialHack.address}`);

    console.log(await ethers.provider.getBalance(denial.address));

    // try {
    //     const tx = await denialHack.withdraw()
    //     console.log(tx)
    // }
    // catch (err) {
    //     console.log(err)
    // }

    // console.log(await ethers.provider.getBalance(denial.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
