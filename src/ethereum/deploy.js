const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const courtCompiled = require("./build/Court.json");

const provider = new HDWalletProvider(
  "evil happy cost tail minimum traffic veteran usual fatal churn child adjust",
  "https://rinkeby.infura.io/v3/bc9645c89d7c408da28a4cd3b84b91c3"
);

const web3 = new Web3(provider);

let accounts;
let courtContract;

const deploy = async () => {
  accounts = await web3.eth.getAccounts();

  courtContract = await new web3.eth.Contract(
    JSON.parse(courtCompiled.interface)
  )
    .deploy({ data: courtCompiled.bytecode })
    .send({ from: accounts[0], gas: "3000000" });

  console.log(courtContract.options.address);
};
deploy();
