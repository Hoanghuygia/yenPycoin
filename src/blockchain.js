const Transactions = require("./transaction");
const Block = require("./block");

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block(Date.now(), "Genesis Block", "0000");
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.preHash = this.getLastBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    minePendingTransactions(miningRewardAddress){
        //this method is to when miner call it would send the rewards to this address
    //     let block = new Block(Date.now(), this.pendingTransactions);

    //     block.mineBlock(this.difficulty);
    //     this.chain.push(block);
    //     console.log("Mined successfully");

    //     this.pendingTransactions = [new Transactions(null, miningRewardAddress, this.miningReward)]

        const rewardTx = new Transactions(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLastBlock().hash);
        block.mineBlock(this.difficulty);

        console.log("Mined successfully");

        this.chain.push(block);

        this.pendingTransactions = [];
    }

    addTransaction(transaction){

        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error("Transaction mush include from and to addresses");
        }

        if(!transaction.isValid){
            throw new Error("Transaction is not valid");
        }

        this.pendingTransactions.push(transaction);  
    }

    getBalanceOfAddress(address){//when we make a transaction, in reality, we add a block of information to the chain, not change the existing data
        let balance = 0;//so to get the balance, we need to loop through the blockchain and calculate the balance from each transaction

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(!currentBlock.hasValidTransaction()){
                return false;
            }

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(previousBlock.hash !== currentBlock.preHash){
                return false;
            }
        }
        return true;
    }
}

module.exports= Blockchain;
