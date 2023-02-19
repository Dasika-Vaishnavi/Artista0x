const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = '';
const infuraProjectId = '';

module.exports = {
  networks: {
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      gasPrice: 10000000000,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: '0.8.0',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
