const SHA384 = require('crypto-js/sha384');

class Block{
  constructor(timestamp = Date.now(), data, previousHash='') {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash = () => {
    return SHA384(this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
  }
}

const block = new Block(Date.now(), "0x38903fd342543", "0")

console.log(block[this.data], block)

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock = () => {
    return new Block(Date.now(), "The beginning of all blocks", "0");
  }

  getLatestBlock = () => {
    return this.chain[this.chain.length - 1];
  }

  addBlock (newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock)
  }
}

let riekiCoin = new Blockchain();

riekiCoin.addBlock(new Block(Date.now(), {amount: 4399}));
riekiCoin.addBlock(new Block(Date.now(), {amount: 1889891}));
console.log(JSON.stringify(riekiCoin, null, 4));
// riekiCoin.addBlock(new Block(new Date(), {amount: 3}));
// riekiCoin.addBlock(new Block(new Date(), {amount: 2343}));

// console.log(JSON.stringify(riekiCoin, null, 4));