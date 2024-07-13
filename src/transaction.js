hash = require("crypto-js/sha256");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transactions{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash(){
        return hash(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey){
        console.log("Signing ...");
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error("You can not sing transaction for other waller");

        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid(){//this function is to confirm that the transaction is from the owner of the wallet or not
        if(this.fromAddress === null) return true;

        if(!this.signature || this.signature.length === 0){
            throw new Error("No signature provided");
        }
        console.log("isValid method");
        
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        console.log(publicKey);
        console.log("isValid method");
        return publicKey.verify(this.calculateHash(), this.signature);// verify the hash signed by thís signature 
        //bởi vì để tính signature, mình cần hash của transaction, nên cơ bản là mình cung cấp lại hash để nó xác định xem signature đó có đúng không
    }
}

module.exports = Transactions;