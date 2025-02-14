hash = require("crypto-js/sha256");

class Block{
    constructor(timestamp, transactions, preHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.preHash = preHash;
        this.hash = this.calculateHash();

        this.nonce = 0;
    }

    // TODO: create a new constructor that create a new instance without passing timestamp

    calculateHash(){
        return hash(this.timestamp + JSON.stringify(this.transactions) + this.preHash + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce += 1;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);

    }

    hasValidTransaction(){
        for(const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
        }
        
        return true;
    }
}

module.exports = Block;