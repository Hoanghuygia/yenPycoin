const Blockchain = require('./blockchain');
const Transactions = require('./transaction');

let yenPyCoin = new Blockchain();

yenPyCoin.createTransaction(new Transactions("Phune", "Huy", 100));
yenPyCoin.createTransaction(new Transactions("Phune", "Huy", 100));
yenPyCoin.createTransaction(new Transactions("Huy", "Phune", 50));

console.log("\n Starting the miner...");

yenPyCoin.minePendingTransactions("xaviers-address");//only the next block was mined then the rewards sents

console.log("\nBalance of Phune: ", yenPyCoin.getBalanceOfAddress("Phune"));
console.log("\nBalance of Xavier: ", yenPyCoin.getBalanceOfAddress("xaviers-address"));
console.log("\nBalance of Huy: ", yenPyCoin.getBalanceOfAddress("Huy"));
// console.log("\nBalance of xaviers-address: ", yenPyCoin.getBalanceOfAddress("xaviers-address"));   

console.log(JSON.stringify(yenPyCoin, null, 4));

// console.log(JSON.stringify(yenPyCoin, null, 4));
