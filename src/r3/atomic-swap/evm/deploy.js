const { BigNumber } = require("ethers");
const hre = require("hardhat");

async function main() {
    await deployTokens();
    await deployVault();
}

async function deployTokens() {

  // const tokens = [
  //     ["Gold Tethered", "GLDT"],
  //     ["Silver Tethered", "SLVT"],
  // ];

  // for(let i=0; i<tokens.length; i++) {
  //     const token = tokens[i]
  //     const TestToken = await hre.ethers.getContractFactory("TestToken");
  //     const testToken = await TestToken.deploy(token[0], token[1]);

  //     await testToken.deployed();

  //     console.log(token[0] + " (" + token[1] + ") Token deployed to:", testToken.address);

  //     const accounts = await ethers.getSigners();
  //     const owner = accounts[0];
  //     const share = (await testToken.totalSupply()).div(20);

  //     for(j=1; j<20; j++) {
  //         await testToken.transfer(accounts[j].address, share)
  //     }
  // }
}

async function deployVault() {
  // get the deployer address
  const address = await hre.ethers.getSigners();
  const deployer = address[0].address;
  console.log("Deployer address: ", deployer);
  // get balance
  const balance = await hre.ethers.provider.getBalance(deployer);
  console.log("Deployer balance: ", balance.toString());
  const SwapVault = await hre.ethers.getContractFactory("SwapVault");
  const gasPrice = await ethers.provider.getGasPrice();
  console.log("Gas price: ", gasPrice.toString());

  // estimate gas 
  const estimateGas = await SwapVault.estimateGas();
  console.log("Estimated gas: ", estimateGas.toString());

  const swapVault = await SwapVault.deploy({
    gasPrice: gasPrice,
    gasLimit: BigNumber.from("500000"),  
  });
  
  await swapVault.deployed();

  console.log("SwapVault deployed to:", swapVault.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

