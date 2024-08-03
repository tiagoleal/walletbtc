const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir rede
const network = bitcoin.networks.testnet

//derivação de carteiras HD
const path = `m/49'/1'/0'/0`;

//conjunto de palavras aleatório para criar a seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path);
let node = account.derive(0).derive(0);


let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("::Generated wallet::");
console.log("Address:", btcAddress);
console.log("Private key:", node.toWIF());
console.log("Seed:", mnemonic);