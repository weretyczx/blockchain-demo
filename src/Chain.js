// const Block = require('./Block.js')
import Block from './Block.js'

class Chain {
    constructor () {
        this.setDifficulty(2)
        this.blocks = []
        this.add(this.mining('genesis !'))
    }

    setDifficulty(difficulty){
        this.difficulty = difficulty
    }

    passDifficulty(hash) {
        for (var i = 0, b = hash.length; i < b; i ++) {
            if (hash[i] !== '0') {
                break;
            }
        }
        return i >= this.difficulty;
    }

    mining(data){
        const previousBlock = this.latest()

        let nextBlock, params = {
            data,
            nonce: 0
        }

        params = previousBlock ? {
            ...params,
            index: previousBlock.index + 1,
            previousHash: previousBlock.hash,
        } : {
            ...params,
            index: 0,
            previousHash: ''
        }

        while(! this.passDifficulty((nextBlock = new Block(params)).hash)){
            params.nonce++
        }

        return nextBlock
    }

    _isValid(block){
        const previousBlock = this.latest()

        if(! previousBlock){
            return true
        }

        const reHash = Block.makeHash(
            block.index,
            block.previousHash,
            block.data,
            block.timestamp,
            block.nonce
        )

        return previousBlock.index + 1 === block.index &&
               previousBlock.hash === block.previousHash &&
               reHash === block.hash &&
               this.passDifficulty(block.hash)
    }


    add(block){
        if(! this._isValid(block)){
            throw "Error: Invalid block"
        }
        this.blocks.push(block)
    }

    latest(){
        return this.blocks.length ?
               this.blocks[this.blocks.length - 1] : null
    }
    show(){
        console.log(this.blocks)
    }
}

export default new Chain