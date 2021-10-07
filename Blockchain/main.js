class Block{
  constructor(timestamp= new Date(), data={}, previousHash='') {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = '';
  }
}