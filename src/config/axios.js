import axios from "axios";
import credentials from "../middleware/credentials";
const baseURL = "https://api.moinet.io/moibit/v1";

const API = axios.create({
  baseURL,
  headers: {
    nonce: credentials.nonce,
    signature: credentials.signature,
    developerKey: credentials.developerKey,
    networkID: credentials.networkId,
    "Content-Type": "application/json",
  },
});

export default API;
