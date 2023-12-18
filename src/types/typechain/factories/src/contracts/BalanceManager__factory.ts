/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from 'ethers';
import type { Signer, ContractDeployTransaction, ContractRunner } from 'ethers';
import type { NonPayableOverrides } from '../../../common';
import type {
  BalanceManager,
  BalanceManagerInterface,
} from '../../../src/contracts/BalanceManager';

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'by',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'oldMaintainer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newMaintainer',
        type: 'address',
      },
    ],
    name: 'MaintainerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'by',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'NFTLDeposited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'by',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'NFTLWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'by',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'NFTLWithdrawnByDAO',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftl',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_maintainer',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maintainer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nftl',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'nonce',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'signatures',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_maintainer',
        type: 'address',
      },
    ],
    name: 'updateMaintainer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_expireAt',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'withdrawByDAO',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

const _bytecode =
  '0x608060405234801561001057600080fd5b50611182806100206000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063b6b55f2511610071578063b6b55f2514610158578063c6e628e31461016b578063d31e22de1461017e578063e50973fd146101bc578063f2fde38b146101cf578063fe55892d146101e257600080fd5b8063485cc955146100b95780634e81da0a146100ce57806370ae92d2146100fe578063715018a61461012c5780638da5cb5b146101345780639850d32b14610145575b600080fd5b6100cc6100c7366004610e5e565b6101f5565b005b6065546100e1906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61011e61010c366004610e91565b60686020526000908152604090205481565b6040519081526020016100f5565b6100cc61033d565b6033546001600160a01b03166100e1565b606a546100e1906001600160a01b031681565b6100cc610166366004610eb3565b610351565b6100cc610179366004610e91565b6103c5565b6101ac61018c366004610f6f565b805160208183018101805160698252928201919093012091525460ff1681565b60405190151581526020016100f5565b6100cc6101ca366004610fa4565b61042b565b6100cc6101dd366004610e91565b61048e565b6100cc6101f0366004610fce565b610507565b600054610100900460ff16158080156102155750600054600160ff909116105b8061022f5750303b15801561022f575060005460ff166001145b6102975760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff1916600117905580156102ba576000805461ff0019166101001790555b6102c26107b8565b606580546001600160a01b038086166001600160a01b031992831617909255606a8054928516929091169190911790558015610338576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050565b6103456107e7565b61034f6000610841565b565b606554610369906001600160a01b0316333084610893565b3360009081526066602052604081208054839290610388908490611028565b909155505060405181815233907f1d5ea51c0633cbd3daea1bb1554365134ec201e88b9f2cc812320bc8073085839060200160405180910390a250565b6103cd6107e7565b606a546040516001600160a01b0380841692169033907f83a400e9e74352cc8b22e130d79f34e3aa90d5e07e725d765d6d3fcacce9dbd390600090a4606a80546001600160a01b0319166001600160a01b0392909216919091179055565b6104336107e7565b60655461044a906001600160a01b03168383610904565b6040518181526001600160a01b0383169033907f335b96ddaf32a33a86754d8da90cfc0eed18da4494fba80eb66b3befd0e85f0f9060200160405180910390a35050565b6104966107e7565b6001600160a01b0381166104fb5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161028e565b61050481610841565b50565b3360009081526068602052604090205483146105585760405162461bcd60e51b815260206004820152601060248201526f6d69736d617463686564206e6f6e636560801b604482015260640161028e565b336000908152606860205260408120805460019290610578908490611028565b9091555050428210156105cd5760405162461bcd60e51b815260206004820152601a60248201527f65787069726564207769746864726177616c2072657175657374000000000000604482015260640161028e565b6069816040516105dd919061107a565b9081526040519081900360200190205460ff161561062e5760405162461bcd60e51b815260206004820152600e60248201526d75736564207369676e617475726560901b604482015260640161028e565b6001606982604051610640919061107a565b90815260405160209181900382018120805460ff1916931515939093179092556bffffffffffffffffffffffff193360601b169082015260348101859052605481018490526074810183905260009060940160408051601f198184030181529190528051602090910120606a549091506001600160a01b03166106fa836106f4847f19457468657265756d205369676e6564204d6573736167653a0a3332000000006000908152601c91909152603c902090565b90610934565b6001600160a01b03161461073f5760405162461bcd60e51b815260206004820152600c60248201526b3bb937b7339039b4b3b732b960a11b604482015260640161028e565b336000908152606760205260408120805487929061075e908490611028565b909155505060655461077a906001600160a01b03163387610904565b604051858152339081907fd35a2ba61457d684dbc6d761a6f17e58d8c10e22a9380ec70f576f51c3e6daca9060200160405180910390a35050505050565b600054610100900460ff166107df5760405162461bcd60e51b815260040161028e90611096565b61034f610958565b6033546001600160a01b0316331461034f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161028e565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6040516001600160a01b03808516602483015283166044820152606481018290526108fe9085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152610988565b50505050565b6040516001600160a01b03831660248201526044810182905261033890849063a9059cbb60e01b906064016108c7565b60008060006109438585610a5d565b9150915061095081610aa3565b509392505050565b600054610100900460ff1661097f5760405162461bcd60e51b815260040161028e90611096565b61034f33610841565b60006109dd826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316610bf19092919063ffffffff16565b90508051600014806109fe5750808060200190518101906109fe91906110e1565b6103385760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161028e565b600080825160411415610a945760208301516040840151606085015160001a610a8887828585610c08565b94509450505050610a9c565b506000905060025b9250929050565b6000816004811115610ab757610ab7611103565b1415610ac05750565b6001816004811115610ad457610ad4611103565b1415610b225760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015260640161028e565b6002816004811115610b3657610b36611103565b1415610b845760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161028e565b6003816004811115610b9857610b98611103565b14156105045760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b606482015260840161028e565b6060610c008484600085610ccc565b949350505050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115610c3f5750600090506003610cc3565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015610c93573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610cbc57600060019250925050610cc3565b9150600090505b94509492505050565b606082471015610d2d5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161028e565b600080866001600160a01b03168587604051610d49919061107a565b60006040518083038185875af1925050503d8060008114610d86576040519150601f19603f3d011682016040523d82523d6000602084013e610d8b565b606091505b5091509150610d9c87838387610da7565b979650505050505050565b60608315610e13578251610e0c576001600160a01b0385163b610e0c5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161028e565b5081610c00565b610c008383815115610e285781518083602001fd5b8060405162461bcd60e51b815260040161028e9190611119565b80356001600160a01b0381168114610e5957600080fd5b919050565b60008060408385031215610e7157600080fd5b610e7a83610e42565b9150610e8860208401610e42565b90509250929050565b600060208284031215610ea357600080fd5b610eac82610e42565b9392505050565b600060208284031215610ec557600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112610ef357600080fd5b813567ffffffffffffffff80821115610f0e57610f0e610ecc565b604051601f8301601f19908116603f01168101908282118183101715610f3657610f36610ecc565b81604052838152866020858801011115610f4f57600080fd5b836020870160208301376000602085830101528094505050505092915050565b600060208284031215610f8157600080fd5b813567ffffffffffffffff811115610f9857600080fd5b610c0084828501610ee2565b60008060408385031215610fb757600080fd5b610fc083610e42565b946020939093013593505050565b60008060008060808587031215610fe457600080fd5b843593506020850135925060408501359150606085013567ffffffffffffffff81111561101057600080fd5b61101c87828801610ee2565b91505092959194509250565b6000821982111561104957634e487b7160e01b600052601160045260246000fd5b500190565b60005b83811015611069578181015183820152602001611051565b838111156108fe5750506000910152565b6000825161108c81846020870161104e565b9190910192915050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6000602082840312156110f357600080fd5b81518015158114610eac57600080fd5b634e487b7160e01b600052602160045260246000fd5b602081526000825180602084015261113881604085016020870161104e565b601f01601f1916919091016040019291505056fea2646970667358221220ff02ae21f4a2f71e15d104863ad1e886f1aae7904c52270d7ec467b10bd0a37064736f6c634300080b0033';

type BalanceManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BalanceManagerConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BalanceManager__factory extends ContractFactory {
  constructor(...args: BalanceManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string },
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      BalanceManager & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): BalanceManager__factory {
    return super.connect(runner) as BalanceManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BalanceManagerInterface {
    return new Interface(_abi) as BalanceManagerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null,
  ): BalanceManager {
    return new Contract(address, _abi, runner) as unknown as BalanceManager;
  }
}
