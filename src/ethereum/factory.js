import web3 from "./web3";
import factoryCompiled from "./build/Court.json";
import { deployedHash } from "./build/contractAddress.json";

const contract = new web3.eth.Contract(
  JSON.parse(factoryCompiled.interface),
  deployedHash
);

export default contract;
