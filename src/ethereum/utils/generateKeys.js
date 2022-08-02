const EthCrypto = require("eth-crypto");

const user = EthCrypto.createIdentity();
console.log(user);

// {
//     privateKey: '0x8b3cfe427461256c53fa8d12b5fe71de36864d1c1b8f8834d565d5a1a079a948',
//     publicKey: '68b29ea4ef0d39bc5e02d3c685846154ba768b195eb67a8ec15773a9190b4248435c3f2c4ecde74be4f5d82548a3f738074dc3d09537240485430e47d04f2585',
//     address: '0xA6Ce7211947016b912de0eEF2Da11a6B781F927C'
// }
