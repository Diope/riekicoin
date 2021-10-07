const {Block} = require('./Block')
const {Transaction} = require('./Transaction')
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 400
  }

  createGenesisBlock = () => {
    return new Block(Date.now(), "The beginning of all blocks", "0");
  }

  getLatestBlock = () => {
    return this.chain[this.chain.length - 1];
  }

  // addBlock (newBlock) {
  //   newBlock.previousHash = this.getLatestBlock().hash;
  //   newBlock.mineBlock(this.difficulty);
  //   this.chain.push(newBlock)
  // }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions)
    block.mineBlock(this.difficulty);

    console.log('Mined block hash is: ', block.hash)
    this.chain.push(block);

    this.pendingTransactions = [new Transaction(null, this.miningReward, this.miningReward)];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction)
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
riekiCoin.minePendingTransactions(new Block(Date.now(), {amount: 4399}));
console.log("Mining block 2....")
riekiCoin.minePendingTransactions(new Block(Date.now(), {amount: 1889891}));