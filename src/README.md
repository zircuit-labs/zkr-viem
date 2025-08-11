
<h1 align="center">ZIRCUIT-VIEM<h1/>

<p align="center">
  TypeScript Interface for Ethereum & Zircuit
<p>

<p align="center">
  <a href="https://www.npmjs.com/package/viem">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/v/viem?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/v/viem?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Version">
    </picture>
  </a>
  <a href="https://app.codecov.io/gh/wevm/viem">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/codecov/c/github/wevm/viem?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/codecov/c/github/wevm/viem?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Code coverage">
    </picture>
  </a>
  <a href="https://github.com/wevm/viem/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/l/viem?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/l/viem?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="MIT License">
    </picture>
  </a>
</p>

<br>

## Features

- Abstractions over the [JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/) to make your life easier
- First-class APIs for interacting with [Smart Contracts](https://ethereum.org/en/glossary/#smart-contract)
- Language closely aligned to official [Ethereum terminology](https://ethereum.org/en/glossary/)
- Import your Browser Extension, WalletConnect or Private Key Wallet
- Browser native [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), instead of large BigNumber libraries
- Utilities for working with [ABIs](https://ethereum.org/en/glossary/#abi) (encoding/decoding/inspection)
- TypeScript ready ([infer types](https://viem.sh/docs/typescript) from ABIs and EIP-712 Typed Data)
- First-class support for [Anvil](https://book.getfoundry.sh/), [Hardhat](https://hardhat.org/) & [Ganache](https://trufflesuite.com/ganache/)
- Test suite running against [forked](https://ethereum.org/en/glossary/#fork) Ethereum network

... and a lot more.

## Overview

```ts
// 1. Import modules.
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

// 2. Set up your client with desired chain & transport.
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// 3. Consume an action!
const blockNumber = await client.getBlockNumber();
```

## Documentation

[Head to the documentation](https://viem.sh/docs/getting-started) to read and learn more about viem.

## Community

Check out the following places for more viem-related content:

- Follow [@ZircuitL2](https://x.com/ZircuitL2) on Twitter for project updates
- Join the [discussions on Discord](https://discord.gg/zircuit)

## License

[MIT](/LICENSE) License
