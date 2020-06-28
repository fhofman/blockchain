import Blockchain from './src/blockchain/blockchain';

const blockchain = new Blockchain();

for (let i = 1; i < 10; i += 1) {
  const block = blockchain.addBlock(`block ${i + 1}`);
  console.log(block.toString());
}
