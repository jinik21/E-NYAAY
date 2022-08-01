import web3 from "./web3";
import factoryCompiled from "./build/Court.json";
// import { deployedHash } from "./build/contractAddress.json";

const contract = new web3.eth.Contract(
  factoryCompiled.abi,
  "0x86077F0198dd273d0C27E0fAb5F831A314ecfcd9"
);

export default contract;
