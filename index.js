import BlockChain from './src/Chain.js'

BlockChain.setDifficulty(3)

for (var i =0; i < 20; i++) {
    BlockChain.add(
        BlockChain.mining({ seq: i + 1 })
    )
}

BlockChain.show()

