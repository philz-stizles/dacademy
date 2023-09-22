# DAcademy (Web3)

## Table of Contents

[(1.) Introduction](#introduction)
[(2.) Technologies](#introduction)
[(7.) Block Chain Development Environment using Truffle](#introduction)
[(3.) Ethereum Networks](#introduction)
[(8.) Block Chain Private Ethereum Networks using Ganache](#introduction)
[(8.) Block Chain Testnet Ethereum Networks using Infura](#introduction)
[(9.) Defining Contracts using Solidity](#introduction)

### Introduction

### Technologies

solidity extension
tailwind CSS

### Ethereum Networks

    Private
    Testnet
    Mainnet  

### Truffle [Read Documentation](https://trufflesuite.com/docs/truffle/)

A world class development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM), aiming to make life as a developer easier.
Install [Truffle](https://trufflesuite.com/docs/truffle/how-to/install/)

    npm install -g truffle

    truffle version

Initialize Truffle

    truffle init

    OR

    truffle unbox metacoin

    truffle unbox truffle-next

truffle migrate

truffle console

truffle migrate --reset

truffle test

### Ganache [Read Docs](https://trufflesuite.com/docs/ganache/)

https://trufflesuite.com/ganache/
Ganache is a personal blockchain for rapid Ethereum and Filecoin distributed application development. You can use Ganache across the entire development cycle; enabling you to develop, deploy, and test your dApps in a safe and deterministic environment.

### React Toastify [Read Docs](https://www.npmjs.com/package/react-toastify)

    npm i react-toastify


Ganache - TRUFFLE SUITE

Quickly fire up a personal Ethereum blockchain which you can use to run tests, execute commands, and inspect state while controlling how the chain operates.

swr


solidity 

// int id // int comprises both positive(+) and negative(-)

uint id; // 32 // uint comprises positive(+) values only  
    uint price; // 32

    truffle uses mocha and chai internally

Smart Contract Deployment to TestNet - Sepolia

Get Sepolia Ethers => https://sepoliafaucet.com/

Truffle Sepolia Config

    npm i dotenv @truffle/hdwallet-provider 

    require('dotenv').config();

    const HDWalletProvider = require('@truffle/hdwallet-provider');

    const mnemonic = process.env['MNEMONIC'];
    const infuraProjectId = process.env['INFURA_API_KEY'];


Setting up Infura

    Sign up : https://app.infura.io/register

truffle migrate --network sepolia