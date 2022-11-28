require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const { GOERLI_RPC_PROVIDER, GOERLI_PRIVATE_KEY } = process.env

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17"
      },
      {
        version: "0.5.0",
        settings: {},
      },
    ]
  },
  networks: {
    goerli: {
      url: GOERLI_RPC_PROVIDER,
      accounts: [GOERLI_PRIVATE_KEY],
      // gas: 2100000,
      // gasPrice: 200000000000,   
    }
  }
};
