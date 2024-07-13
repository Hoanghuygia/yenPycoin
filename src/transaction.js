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
        return hash(this.fromAddress + this.toAddress + this.amount.toString());
    }

    signTransaction(signingKey){//the signing key is the key that will get from the keygenerator.js
        if(signingKey.getPublic('hex') !== this.fromAddress){//we only use wallet that we have private key, and private key relate to public key, so ...
            throw new Error("You can not sing transaction for other waller");

        }// hàm này mà dịch ra thực tế thì đơn giản là nó kiểm tra xem người ký có phải người cần ký hay không
        // sau đó thì người ký sẽ phải đọc tài liệu và phá hủy nó (hash)
        // tiếp đó thì người ký ký chữ kí
        // cuối cùng là chuyển chữ kí sang dạng có thể chuyển tiếp được
        // TODO: chút thử in cái sig ra xem nó như thế nào !!!

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid(){//this function is to confirm that the transaction is from the owner of the wallet or not
        if(this.fromAddress === null) return true;

        if(!this.signature || this.signature.length === 0){
            throw new Error("No signature provided");
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);// verify the hash signed by thís signature 
    }
}

module.exports = Transactions;