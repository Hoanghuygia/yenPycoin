const Blockchain = require('./blockchain');
const Transactions = require('./transaction');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//Private key: c267cd3086883a6f65364d9d8963e9026f0aa32667dda0284ce31618b2662e83
const myKey = ec.keyFromPrivate("c267cd3086883a6f65364d9d8963e9026f0aa32667dda0284ce31618b2662e83");
const myWalletAddress = myKey.getPublic('hex');
console.log(myWalletAddress);

let yenPyCoin = new Blockchain();

const tx1 = new Transactions(myWalletAddress, "the person who received the coin", 10);
tx1.signTransaction(myKey);
yenPyCoin.addTransaction(tx1);

console.log("\n Starting the miner...");

yenPyCoin.minePendingTransactions(myWalletAddress);//only the next block was mined then the rewards sents

console.log("\nBalance of Xavier: ", yenPyCoin.getBalanceOfAddress(myWalletAddress));


// console.log(JSON.stringify(yenPyCoin, null, 4));
