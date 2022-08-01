const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const path = require("path");
const fs = require("fs-extra");
const courtCompiled = require("./build/Court.json");

const buildPath = path.resolve(__dirname, "build", "contractAddress.json");

const provider = new HDWalletProvider(
  "evil happy cost tail minimum traffic veteran usual fatal churn child adjust",
  "https://rinkeby.infura.io/v3/bc9645c89d7c408da28a4cd3b84b91c3"
);

const web3 = new Web3(provider);

let accounts;

const deploy = async () => {
  accounts = await web3.eth.getAccounts();
  let transactionHashFile;
  fs.removeSync(buildPath);
  fs.ensureFileSync(buildPath);
  new web3.eth.Contract(courtCompiled.abi)
    .deploy({ data: "0x" + courtCompiled.evm.bytecode.object })
    .send(
      {
        from: accounts[0],
        gas: web3.utils.toHex(8000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei("30", "gwei")),
      },
      (err, transactionHash) => {
        transactionHashFile = transactionHash;
      }
    )
    .then((newContractInstance) => {
      console.log(
        "Deployed Contract Address : ",
        newContractInstance.options.address
      );
      fs.outputJSONSync(buildPath, {
        transactionHash: transactionHashFile,
        deployedHash: newContractInstance.options.address,
      });
    });
};
deploy();
