const SHA384 = require('crypto-js/sha384');

class Block{
  constructor(timestamp = Date.now(), data, previousHash='') {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash = () => {
    return SHA384(this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: ", this.hash);
  }
}
// const block = new Block(Date.now(), "0x38903fd342543", "0")

// console.log({block})

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock = () => {
    return new Block(Date.now(), "The beginning of all blocks", "0");
  }

  getLatestBlock = () => {
    return this.chain[this.chain.length - 1];
  }

  addBlock (newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock)
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      // Start at 1 as that'll set the previous block as the genesis block
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      // Bc the data in the block shouldn't change, the hash should stay the same no matter how many times you rehash.
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true;
  }
}

let riekiCoin = new Blockchain();
console.log("Mining block 1....")
riekiCoin.addBlock(new Block(Date.now(), {amount: 4399}));
console.log("Mining block 2....")
riekiCoin.addBlock(new Block(Date.now(), {amount: 1889891}));
