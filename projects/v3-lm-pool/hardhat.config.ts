import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@typechain/hardhat'
import 'dotenv/config'
import { NetworkUserConfig } from 'hardhat/types'
import 'solidity-docgen';
require('dotenv').config({ path: require('find-config')('.env') })

const bscTestnet: NetworkUserConfig = {
  url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  chainId: 97,
  accounts: [process.env.KEY_TESTNET!],
}

const bscMainnet: NetworkUserConfig = {
  url: 'https://bsc-dataseed.binance.org/',
  chainId: 56,
  accounts: [process.env.KEY_MAINNET!],
}

const goerli: NetworkUserConfig = {
  url: 'https://rpc.ankr.com/eth_goerli',
  chainId: 5,
  accounts: [process.env.KEY_GOERLI!],
}

const eth: NetworkUserConfig = {
  url: 'https://eth.llamarpc.com',
  chainId: 1,
  accounts: [process.env.KEY_ETH!],
}

const somniaTestnet: NetworkUserConfig = {
  url: 'https://dream-rpc.somnia.network',
  chainId: 50312,
  accounts: [process.env.KEY_TESTNET!],
}

const config: HardhatUserConfig = {
  solidity: {
    version: '0.7.6',
  },
  networks: {
    hardhat: {},
    ...(process.env.KEY_TESTNET && { bscTestnet }),
    ...(process.env.KEY_MAINNET && { bscMainnet }),
    ...(process.env.KEY_GOERLI && { goerli }),
    ...(process.env.KEY_ETH && { eth }),
    ...(process.env.KEY_TESTNET && { somniaTestnet }),
  },
  etherscan: {
    apiKey: 'empty',
    customChains: [
      {
        network: "somniaTestnet",
        chainId: 50312,
        urls: {
          apiURL: "https://somnia-poc.w3us.site/api",
          browserURL: "https://somnia-poc.w3us.site"
        }
      }
    ]
  },
  paths: {
    sources: './contracts/',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config
