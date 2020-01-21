import Crypto from 'crypto-js'

class Block {
    constructor ({ index, previousHash, data, timestamp = Date.now(), nonce }) {
        this.index = index
        this.previousHash = previousHash
        this.data = data
        this.nonce = nonce
        this.timestamp = timestamp
        this.hash = Block.makeHash(index, previousHash, data, timestamp, nonce)
    }

    static makeHash (index, previousHash, data, timestamp, nonce){
        return Crypto.SHA256(index + previousHash + data + timestamp + nonce).toString();
    }
}

export default Block
