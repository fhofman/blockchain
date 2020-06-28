import { Transaction, blockchainWallet } from '../wallet';
import { MESSAGE } from '../service/p2p';

class Miner {
  constructor(blockchain, p2pService, wallet) {
    this.blockchain = blockchain;
    this.p2pService = p2pService;
    this.wallet = wallet;
  }

  mine() {
    const {
      blockchain: { memoryPool },
    } = this;

    if (memoryPool.transactions.length === 0) throw Error('Threre are not unconfirmed transaction');


    /*
    1. Include reward to miner in trasaction
    2. Crear un bloque con todas las transacciones validas que estan en memory pool
    3. Sincronizar la blockchain con el nuevo bloque creado (sync new blockchain with the network)
    4. Borrar todas las transacciones del memoryPool
    5. Transmitir o broadcast del nuevo bloque  (broadcast wipe message to every node)
     */
    // 1
    memoryPool.transactions.push(Transaction.reward(this.wallet, blockchainWallet));
    // 2
    const block = this.blockchain.addBlock(memoryPool.transactions);
    // 3
    this.p2pService.sync();
    // 4
    memoryPool.wipe();
    // 5
    this.p2pService.broadcast(MESSAGE.WIPE);
    return block;
  }
}

export default Miner;
