import web3 from "./web3";
import compiledContract from "./build/Court.json";

const contract = new web3.eth.Contract(
  JSON.parse(compiledContract.interface),
  "0x6aD954C564fb8fA86485724BacB0A7C58e9B3Ec9"
);

export default contract;
