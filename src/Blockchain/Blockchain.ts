const {Block} = require('./Block')
const {Transaction} = require('./Transaction')

class Blockchain {
  difficulty: number;
  chain: any[];
  pendingTransactions: {fromAddress: string, toAddress: string, amount: number}[];
  miningReward: number;
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 30
  }

  
  createGenesisBlock () {
    return new Block(Date.now(), [], "0");
  }

  getLatestBlock (): any[] {
    return this.chain[this.chain.length - 1];
  }

  // addBlock (newBlock) {
  //   newBlock.previousHash = this.getLatestBlock().hash;
  //   newBlock.mineBlock(this.difficulty);
  //   this.chain.push(newBlock)
  // }

  minePendingTransactions(miningRewardAddress: string): void  {
    
    const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);
    
    console.log('Mined block successfully')
    this.chain.push(block);

    this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
  }

  createTransaction(transaction: any ): void {
    this.pendingTransactions.push(transaction)
  }

  // As you don't actually have a balance in the tradition sense, you have to get all the transctions on the blockchain that are from your address.

  // O(n^2) I wonder if this can this be done faster
  getBalance(address: string): number {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount
        }
      }
    }
    return balance;
  }

  isChainValid(): boolean {
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



let riekiCoin: Blockchain = new Blockchain();

riekiCoin.createTransaction(new Transaction('firstAdd', 'secondAdd', 12100));
riekiCoin.createTransaction(new Transaction('secondAdd', 'firstAdd', 325));

console.log('Mining commencing')
riekiCoin.minePendingTransactions('yungAdd')

console.log('Balance is', riekiCoin.getBalance('yungAdd'))

console.log('Mining commencing')
riekiCoin.minePendingTransactions('yungAdd')

console.log('Balance is', riekiCoin.getBalance('yungAdd'))

