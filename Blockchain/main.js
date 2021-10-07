const SHA384 = require('crypto-js/sha384');
const { builtinModules } = require('module');

class Block{
  #timestamp = new Date()
  #data;
  #previousHash;
  constructor() {
    this.#timestamp;
    this.#data;
    this.#previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash = () => {
    return SHA384(this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
  }

}

const banna = new Block(undefined, {name: "Bill", money: "35000"}, "0")

console.log(banna.calculateHash())