const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);
console.log("Build folder deleted.");

const contractPath = path.resolve(__dirname, "contracts", "Court.sol");
const contractContent = fs.readFileSync(contractPath, "utf-8");

var input = {
  language: "Solidity",
  sources: {
    Court: {
      content: contractContent,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

fs.ensureDirSync(buildPath);
console.log("Build folder created.");

for (let contract in output["Court"]) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract + ".json"),
    output["Court"][contract]
  );
  console.log(`${contract}.json created in builds folder.`);
}
