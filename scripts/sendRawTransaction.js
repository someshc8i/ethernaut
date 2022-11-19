// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const [owner, addr1] = await ethers.getSigners();

    let transaction = {
        to: ethers.constants.AddressZero,
        value: ethers.utils.parseEther('0.0000001'),
        gasLimit: '210000',
        maxPriorityFeePerGas: ethers.utils.parseUnits('50', 'gwei'),
        maxFeePerGas: ethers.utils.parseUnits('200', 'gwei'),
        nonce: 75,
        type: 2,
        chainId: 5
      };
    // const signedTx = await owner.signTransaction(transaction);
    const tx = await owner.sendTransaction(transaction);
    console.log(tx);
    await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
