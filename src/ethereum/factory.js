import web3 from "./web3";
import factoryCompiled from "./build/Court.json";
import hash from "./build/contractAddress.json";

const contract = new web3.eth.Contract(factoryCompiled.abi, hash.deployedHash);

export default contract;
