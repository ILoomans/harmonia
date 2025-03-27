require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-foundry");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.28",
  optimizer: {enabled: true},
  networks: {
    hardhat: {
      // mining: {
      //   mempool: {
      //     order: "fifo",
      //   },
      //   auto: false,
      //   interval: 1000,
      // },
      chainId: 1337,
    },
    monad: {
      solidity: "0.8.28",
          url: "https://testnet-rpc.monad.xyz",
          accounts: ['0x49a2d7fb326a0a00d37f18cfaa41167578aabda9178b774d4601e8d70be9ae3a'],
          chainId: 10143
    }
  },
  paths: {
    sources: "./src",
    tests: "./test",
    cache: "./build/cache",
    artifacts: "./build/out"
  },
  foundry: {
    remappings: "./remappings.txt",
  },
};
