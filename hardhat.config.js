require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const { GOERLI_RPC_PROVIDER, GOERLI_PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: GOERLI_RPC_PROVIDER,
      accounts: [GOERLI_PRIVATE_KEY],
      // gas: 2100000,
      // gasPrice: 200000000000,   
    }
  }
};
