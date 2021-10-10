const SHA384 = require('crypto-js/sha384');

class Block {
  timestamp: string
  transactions: {fromAddress?: string, toAddress?: string, amount?: number}
  previousHash: string
  hash: string
  nonce: number

  constructor(timestamp: string, transactions: {}, previousHash='') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash (): string {
    return SHA384(this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty: number): void {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("BLOCK MINED:", this.hash);
  }
}


export {Block}
