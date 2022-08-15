import Web3 from "web3";
import MetaMaskOnboarding from "@metamask/onboarding";

let web3;
const forwarderOrigin = "http://localhost:3000";

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  const res = window.confirm("Please install metamask to continue!");
  if (res) {
    const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
    onboarding.startOnboarding();
  }
}

export default web3;
