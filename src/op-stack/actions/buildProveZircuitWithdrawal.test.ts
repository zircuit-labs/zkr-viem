import { expect, test } from 'vitest'
import { anvilSepolia, anvilZircuitSepolia } from '../../../test/src/anvil.js'
import { accounts } from '../../../test/src/constants.js'
import { getTransactionReceipt, reset } from '../../actions/index.js'

import type { Address } from 'abitype'
import { getL2Output, getWithdrawals, proveWithdrawal } from '../index.js'
import { buildProveZircuitWithdrawal } from './buildProveZircuitWithdrawal.js'

const client = anvilSepolia.getClient()

const zircuitClient = anvilZircuitSepolia.getClient()

test('default', async () => {
  await reset(zircuitClient, {
    blockNumber: 7376359n,
    jsonRpcUrl: anvilZircuitSepolia.forkUrl,
  })
  await reset(client, {
    blockNumber: 8975211n,
    jsonRpcUrl: anvilSepolia.forkUrl,
  })

  // https://explorer.garfield-testnet.zircuit.com/tx/0xa905862eea1a9dcf3161a005f33686fd5e702f9ef98793e814fca619060c90d7
  const receipt = await getTransactionReceipt(zircuitClient, {
    hash: '0xa905862eea1a9dcf3161a005f33686fd5e702f9ef98793e814fca619060c90d7',
  })

  // const [withdrawal] = getWithdrawals(receipt)

  const output = await getL2Output(client, {
    l2BlockNumber: receipt.blockNumber,
    l2OutputOracleAddress: '0xd69D3AC5CA686cCF94b258291772bc520FEAf211',
    portalAddress: '0x4E21A71Ac3F7607Da5c06153A17B1DD20E702c21',
  })

  const request = await buildProveZircuitWithdrawal(zircuitClient, {
    account: accounts[0].address,
    receipt,
    output,
  })
  const { targetChain: _, ...rest } = request

  expect(rest).toMatchInlineSnapshot(`
    {
      "account": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
      "l2OutputIndex": 1421n,
      "outputRootProof": {
        "latestBlockhash": "0x42d5f144e1a347e6bff603b4d0654eaf6132e491b9e8d91c520dc53e944dca69",
        "messagePasserStorageRoot": "0x15726dd81934bb7fb3a49362a99a27b1d3d99b580f7f14e0c70e27e58513f7a6",
        "stateRoot": "0xb680f75655d5ce4ddd32ce8cf0c5e643a81fd749fc6c027637bbeb3067abbfec",
        "version": "0x0000000000000000000000000000000000000000000000000000000000000000",
      },
      "withdrawal": {
        "data": "0x",
        "gasLimit": 100000n,
        "nonce": 3533694129556768659166595001485837031654967793751237916243212402585239568n,
        "sender": "0x13aa3dfF556D04F4c4530b6F05E88b9a900145C4",
        "target": "0x13aa3dfF556D04F4c4530b6F05E88b9a900145C4",
        "value": 1n,
        "withdrawalHash": "0x18d3cb7fb4d482c1ca98657c90977ef74e3eea8b9e68b1457bbd2812e6d423f3",
      },
      "withdrawalProof": [
        "0x0000000000000000000000000000000000000000000000000000000000000000ad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5b4c11951957c6f8f642c4af61cd6b24640fec6dc7fc607ee8206a99e92410d3021ddb9a356815c3fac1026b6dec5df3124afbadb485c9ba5a3e3398a04b7ba85fbf19b979addd374d437010ff0efe613a40193638f43d45522fe54b7ccbb59eb",
      ],
    }
  `)

  const hash = await proveWithdrawal(client, {
    ...request,
    portalAddress: '0x4E21A71Ac3F7607Da5c06153A17B1DD20E702c21',
  })
  expect(hash).toBeDefined()
}, 20_000)

test('args: withdrawal', async () => {
  await reset(zircuitClient, {
    blockNumber: 7377803n,
    jsonRpcUrl: anvilZircuitSepolia.forkUrl,
  })
  await reset(client, {
    blockNumber: 8975598n,
    jsonRpcUrl: anvilSepolia.forkUrl,
  })

  // https://explorer.garfield-testnet.zircuit.com/tx/0xac3c70f4bafbed0e072124b7574c8ab50b245be7556595637d6a378e1842dae3
  const receipt = await getTransactionReceipt(zircuitClient, {
    hash: '0xac3c70f4bafbed0e072124b7574c8ab50b245be7556595637d6a378e1842dae3',
  })

  const withdrawal = getWithdrawals(receipt)[3]

  const output = await getL2Output(client, {
    l2BlockNumber: receipt.blockNumber,
    withdrawal,
    l2OutputOracleAddress: '0xd69D3AC5CA686cCF94b258291772bc520FEAf211',
    portalAddress: '0x4E21A71Ac3F7607Da5c06153A17B1DD20E702c21',
  })

  const request = await buildProveZircuitWithdrawal(zircuitClient, {
    account: accounts[0].address,
    withdrawal,
    receipt,
    output,
  })
  const { targetChain: _, ...rest } = request

  expect(rest).toMatchInlineSnapshot(`
    {
      "account": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
      "l2OutputIndex": 1429n,
      "outputRootProof": {
        "latestBlockhash": "0xfb8bae0b846f68949b5835c41c8306b27d373bc4d83f6a6ee3ec0ea8c2b77e1f",
        "messagePasserStorageRoot": "0xd171c5720cacc6abcfc9aea9d4799156498f9ed88f8864a68c76f02e1092550f",
        "stateRoot": "0xa13fab1813e56a6e1b1fe93373d99649dd4f8547fae186ff09743c56a0c13c71",
        "version": "0x0000000000000000000000000000000000000000000000000000000000000000",
      },
      "withdrawal": {
        "data": "0x",
        "gasLimit": 100000n,
        "nonce": 3533694129556768659166595001485837031654967793751237916243212402585239583n,
        "sender": "0x20d30f88654dd2d9dEb93049dddc1D07743Dd87B",
        "target": "0x20d30f88654dd2d9dEb93049dddc1D07743Dd87B",
        "value": 1n,
        "withdrawalHash": "0x1cb74bd30ac2c990ba362a28504a56a175dfc66cd1a2e70319a6100200004959",
      },
      "withdrawalProof": [
        "0x5646d32bf5aab847e9537ffe671765a926f4f98297f0ea0937c8ab17839b0b12d6dcdf878354b569f1aa210275bcbf163e098b6c41c485122b906a433865c66b5db872a089d5eaef4b11e02ebb5877b40cc7de0649f6792e5e8fcc40580531db97e59a9c16b03f1b663b2c7352fd09fe626f2f3d40afcec8833ff386604f986efbf19b979addd374d437010ff0efe613a40193638f43d45522fe54b7ccbb59ebd29d4694932fa8d2ce21c6e9de878035000f8d19cdfb1ed0a736e4477eb7f146",
      ],
    }
  `)

  const hash = await proveWithdrawal(client, {
    ...request,
    portalAddress: '0x4E21A71Ac3F7607Da5c06153A17B1DD20E702c21',
  })
  expect(hash).toBeDefined()
}, 20_000)

test('args: l1client and l2OutputOracleAddress', async () => {
  await reset(zircuitClient, {
    blockNumber: 7377803n,
    jsonRpcUrl: anvilZircuitSepolia.forkUrl,
  })
  await reset(client, {
    blockNumber: 8975598n,
    jsonRpcUrl: anvilSepolia.forkUrl,
  })

  // https://explorer.garfield-testnet.zircuit.com/tx/0xac3c70f4bafbed0e072124b7574c8ab50b245be7556595637d6a378e1842dae3
  const receipt = await getTransactionReceipt(zircuitClient, {
    hash: '0xac3c70f4bafbed0e072124b7574c8ab50b245be7556595637d6a378e1842dae3',
  })

  const withdrawal = getWithdrawals(receipt)[1]

  const request = await buildProveZircuitWithdrawal(zircuitClient, {
    account: accounts[0].address,
    receipt,
    withdrawal,
    l1Client: client,
    l2OutputOracleAddress: '0xd69D3AC5CA686cCF94b258291772bc520FEAf211',
  })
  const { targetChain: _, ...rest } = request

  expect(rest).toMatchInlineSnapshot(`
    {
      "account": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
      "l2OutputIndex": 1429n,
      "outputRootProof": {
        "latestBlockhash": "0xfb8bae0b846f68949b5835c41c8306b27d373bc4d83f6a6ee3ec0ea8c2b77e1f",
        "messagePasserStorageRoot": "0xd171c5720cacc6abcfc9aea9d4799156498f9ed88f8864a68c76f02e1092550f",
        "stateRoot": "0xa13fab1813e56a6e1b1fe93373d99649dd4f8547fae186ff09743c56a0c13c71",
        "version": "0x0000000000000000000000000000000000000000000000000000000000000000",
      },
      "withdrawal": {
        "data": "0x",
        "gasLimit": 100000n,
        "nonce": 3533694129556768659166595001485837031654967793751237916243212402585239581n,
        "sender": "0x20d30f88654dd2d9dEb93049dddc1D07743Dd87B",
        "target": "0x20d30f88654dd2d9dEb93049dddc1D07743Dd87B",
        "value": 1n,
        "withdrawalHash": "0xb84ab83c0ce8ff5a621d9d5365a95d0fde3e07e4727f477fbcb4b418bc105e3c",
      },
      "withdrawalProof": [
        "0x3ac80c0cd58dd50675b3895d368dbec805d6726cc1d4a9585ac7523be4efae1889e5183ec9accab8ac65bc9fdde7a2b1c2ee335940fb4089690eb3c4f9239ccc5db872a089d5eaef4b11e02ebb5877b40cc7de0649f6792e5e8fcc40580531db97e59a9c16b03f1b663b2c7352fd09fe626f2f3d40afcec8833ff386604f986efbf19b979addd374d437010ff0efe613a40193638f43d45522fe54b7ccbb59ebd29d4694932fa8d2ce21c6e9de878035000f8d19cdfb1ed0a736e4477eb7f146",
      ],
    }
  `)

  const hash = await proveWithdrawal(client, {
    ...request,
    portalAddress: '0x4E21A71Ac3F7607Da5c06153A17B1DD20E702c21',
  })
  expect(hash).toBeDefined()
}, 20_000)
