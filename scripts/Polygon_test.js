const { Client } = require('@maticnetwork/pos-client');
const { Identity } = require('@maticnetwork/identity-contracts');
const Web3 = require('web3');
const ThreeIdResolver = require('@ceramicnetwork/3id-did-resolver').default;
const { Resolver } = require('did-resolver');

const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.matic.today'));

async function createIdentity(userAddress) {
  const polygonClient = new Client({
    network: "mumbai",
    parentProvider: web3.currentProvider
  });
  
  const identityContract = new Identity(polygonClient);
  const { txHash, identity } = await identityContract.createIdentity({ from: userAddress });
  await polygonClient.pos.exitERC20({
    ...identity,
    txHash,
  });

  return identity;
}

async function verifyIdentity(identityAddress, documentType, documentNumber) {
  const polygonClient = new Client({
    network: "mumbai",
    parentProvider: web3.currentProvider
  });
  
  const identityContract = new Identity(polygonClient);
  const result = await identityContract.verifyIdentity(identityAddress, documentType, documentNumber);

  return result;
}

async function getUserData(identityAddress) {
  const threeIdResolver = ThreeIdResolver.getResolver({
    rpcUrl: 'https://rpc-mainnet.maticvigil.com/',
  });
  const didResolver = new Resolver({
    ...ThreeIdResolver.default.getResolver(),
    ...threeIdResolver,
  });
  const userDID = `did:3:${identityAddress.toLowerCase()}`;

  const userDoc = await didResolver.resolve(userDID);
  const user = {
    address: userDoc.publicKey[2].ethereumAddress,
    name: userDoc.name,
    verified: userDoc.verificationMethod[0].proofPurpose === 'assertionMethod'
  };

  return user;
}

module.exports = {
  createIdentity,
  verifyIdentity,
  getUserData
};
