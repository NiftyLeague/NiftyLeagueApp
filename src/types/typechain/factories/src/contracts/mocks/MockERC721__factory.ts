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
import type { NonPayableOverrides } from '../../../../common';
import type {
  MockERC721,
  MockERC721Interface,
} from '../../../../src/contracts/mocks/MockERC721';

const _abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MINTER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PAUSER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
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
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'getRoleMember',
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
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleMemberCount',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
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
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
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
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
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
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
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
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
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
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenByIndex',
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
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenOfOwnerByIndex',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
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
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

const _bytecode =
  '0x60806040523480156200001157600080fd5b5060408051808201825260098082526826b7b1b5aa37b5b2b760b91b602080840191825284518086018652928352682a22a9aa2a27a5a2a760b91b8382015284518086019095528085527f68747470733a2f2f6170692e6e696674796c65616775652e636f6d2f6e66747390850152825192939192849184916200009891600291620002a4565b508051620000ae906003906020840190620002a4565b5050600c805460ff19169055508051620000d090600e906020840190620002a4565b50620000de6000336200013f565b6200010a7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6336200013f565b620001367f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a336200013f565b50505062000387565b6200014b82826200014f565b5050565b6200016682826200019260201b62000c511760201c565b60008281526001602090815260409091206200018d91839062000cd562000232821b17901c565b505050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166200014b576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620001ee3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600062000249836001600160a01b03841662000252565b90505b92915050565b60008181526001830160205260408120546200029b575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556200024c565b5060006200024c565b828054620002b2906200034a565b90600052602060002090601f016020900481019282620002d6576000855562000321565b82601f10620002f157805160ff191683800117855562000321565b8280016001018555821562000321579182015b828111156200032157825182559160200191906001019062000304565b506200032f92915062000333565b5090565b5b808211156200032f576000815560010162000334565b600181811c908216806200035f57607f821691505b602082108114156200038157634e487b7160e01b600052602260045260246000fd5b50919050565b6124cc80620003976000396000f3fe608060405234801561001057600080fd5b50600436106101e55760003560e01c80636352211e1161010f578063a22cb465116100a2578063d539139311610071578063d5391393146103f7578063d547741f1461041e578063e63ab1e914610431578063e985e9c51461045857600080fd5b8063a22cb465146103ab578063b88d4fde146103be578063c87b56dd146103d1578063ca15c873146103e457600080fd5b80639010d07c116100de5780639010d07c1461037557806391d148541461038857806395d89b411461039b578063a217fddf146103a357600080fd5b80636352211e146103345780636a6278421461034757806370a082311461035a5780638456cb591461036d57600080fd5b80632f2ff15d1161018757806342842e0e1161015657806342842e0e146102f057806342966c68146103035780634f6ccce7146103165780635c975abb1461032957600080fd5b80632f2ff15d146102af5780632f745c59146102c257806336568abe146102d55780633f4ba83a146102e857600080fd5b8063095ea7b3116101c3578063095ea7b31461025257806318160ddd1461026757806323b872dd14610279578063248a9ca31461028c57600080fd5b806301ffc9a7146101ea57806306fdde0314610212578063081812fc14610227575b600080fd5b6101fd6101f8366004611eee565b610494565b60405190151581526020015b60405180910390f35b61021a6104a5565b6040516102099190611f63565b61023a610235366004611f76565b610537565b6040516001600160a01b039091168152602001610209565b610265610260366004611fab565b61055e565b005b600a545b604051908152602001610209565b610265610287366004611fd5565b610679565b61026b61029a366004611f76565b60009081526020819052604090206001015490565b6102656102bd366004612011565b6106ab565b61026b6102d0366004611fab565b6106d0565b6102656102e3366004612011565b610766565b6102656107e4565b6102656102fe366004611fd5565b61088c565b610265610311366004611f76565b6108a7565b61026b610324366004611f76565b6108d8565b600c5460ff166101fd565b61023a610342366004611f76565b61096b565b61026561035536600461203d565b6109cb565b61026b61036836600461203d565b6109eb565b610265610a71565b61023a610383366004612058565b610b15565b6101fd610396366004612011565b610b34565b61021a610b5d565b61026b600081565b6102656103b936600461207a565b610b6c565b6102656103cc3660046120cc565b610b77565b61021a6103df366004611f76565b610baf565b61026b6103f2366004611f76565b610c15565b61026b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b61026561042c366004612011565b610c2c565b61026b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6101fd6104663660046121a8565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b600061049f82610cea565b92915050565b6060600280546104b4906121d2565b80601f01602080910402602001604051908101604052809291908181526020018280546104e0906121d2565b801561052d5780601f106105025761010080835404028352916020019161052d565b820191906000526020600020905b81548152906001019060200180831161051057829003601f168201915b5050505050905090565b600061054282610d0f565b506000908152600660205260409020546001600160a01b031690565b60006105698261096b565b9050806001600160a01b0316836001600160a01b031614156105dc5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806105f857506105f88133610466565b61066a5760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016105d3565b6106748383610d6e565b505050565b610684335b82610ddc565b6106a05760405162461bcd60e51b81526004016105d39061220d565b610674838383610e5b565b6000828152602081905260409020600101546106c681610fcc565b6106748383610fd6565b60006106db836109eb565b821061073d5760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b60648201526084016105d3565b506001600160a01b03919091166000908152600860209081526040808320938352929052205490565b6001600160a01b03811633146107d65760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016105d3565b6107e08282610ff8565b5050565b61080e7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33610b34565b610882576040805162461bcd60e51b81526020600482015260248101919091527f4552433732315072657365744d696e7465725061757365724175746f49643a2060448201527f6d75737420686176652070617573657220726f6c6520746f20756e706175736560648201526084016105d3565b61088a61101a565b565b61067483838360405180602001604052806000815250610b77565b6108b03361067e565b6108cc5760405162461bcd60e51b81526004016105d39061220d565b6108d58161106c565b50565b60006108e3600a5490565b82106109465760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b60648201526084016105d3565b600a82815481106109595761095961225a565b90600052602060002001549050919050565b6000818152600460205260408120546001600160a01b03168061049f5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016105d3565b6109dd816109d8600f5490565b61110f565b6108d5600f80546001019055565b60006001600160a01b038216610a555760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016105d3565b506001600160a01b031660009081526005602052604090205490565b610a9b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33610b34565b610b0d5760405162461bcd60e51b815260206004820152603e60248201527f4552433732315072657365744d696e7465725061757365724175746f49643a2060448201527f6d75737420686176652070617573657220726f6c6520746f207061757365000060648201526084016105d3565b61088a6112a8565b6000828152600160205260408120610b2d90836112e5565b9392505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6060600380546104b4906121d2565b6107e03383836112f1565b610b813383610ddc565b610b9d5760405162461bcd60e51b81526004016105d39061220d565b610ba9848484846113c0565b50505050565b6060610bba82610d0f565b6000610bc46113f3565b90506000815111610be45760405180602001604052806000815250610b2d565b80610bee84611402565b604051602001610bff929190612270565b6040516020818303038152906040529392505050565b600081815260016020526040812061049f9061149f565b600082815260208190526040902060010154610c4781610fcc565b6106748383610ff8565b610c5b8282610b34565b6107e0576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610c913390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000610b2d836001600160a01b0384166114a9565b60006001600160e01b0319821663780e9d6360e01b148061049f575061049f826114f8565b6000818152600460205260409020546001600160a01b03166108d55760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016105d3565b600081815260066020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610da38261096b565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610de88361096b565b9050806001600160a01b0316846001600160a01b03161480610e2f57506001600160a01b0380821660009081526007602090815260408083209388168352929052205460ff165b80610e535750836001600160a01b0316610e4884610537565b6001600160a01b0316145b949350505050565b826001600160a01b0316610e6e8261096b565b6001600160a01b031614610e945760405162461bcd60e51b81526004016105d39061229f565b6001600160a01b038216610ef65760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016105d3565b610f038383836001611538565b826001600160a01b0316610f168261096b565b6001600160a01b031614610f3c5760405162461bcd60e51b81526004016105d39061229f565b600081815260066020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260058552838620805460001901905590871680865283862080546001019055868652600490945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6108d58133611544565b610fe08282610c51565b60008281526001602052604090206106749082610cd5565b611002828261159d565b60008281526001602052604090206106749082611602565b611022611617565b600c805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b60006110778261096b565b9050611087816000846001611538565b6110908261096b565b600083815260066020908152604080832080546001600160a01b03199081169091556001600160a01b0385168085526005845282852080546000190190558785526004909352818420805490911690555192935084927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6001600160a01b0382166111655760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016105d3565b6000818152600460205260409020546001600160a01b0316156111ca5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016105d3565b6111d8600083836001611538565b6000818152600460205260409020546001600160a01b03161561123d5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016105d3565b6001600160a01b038216600081815260056020908152604080832080546001019055848352600490915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6112b0611660565b600c805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861104f3390565b6000610b2d83836116a6565b816001600160a01b0316836001600160a01b031614156113535760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016105d3565b6001600160a01b03838116600081815260076020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6113cb848484610e5b565b6113d7848484846116d0565b610ba95760405162461bcd60e51b81526004016105d3906122e4565b6060600e80546104b4906121d2565b6060600061140f836117ce565b600101905060008167ffffffffffffffff81111561142f5761142f6120b6565b6040519080825280601f01601f191660200182016040528015611459576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a850494508461149257611497565b611463565b509392505050565b600061049f825490565b60008181526001830160205260408120546114f05750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561049f565b50600061049f565b60006001600160e01b031982166380ac58cd60e01b148061152957506001600160e01b03198216635b5e139f60e01b145b8061049f575061049f826118a6565b610ba9848484846118cb565b61154e8282610b34565b6107e05761155b8161193e565b611566836020611950565b604051602001611577929190612336565b60408051601f198184030181529082905262461bcd60e51b82526105d391600401611f63565b6115a78282610b34565b156107e0576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610b2d836001600160a01b038416611aec565b600c5460ff1661088a5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016105d3565b600c5460ff161561088a5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016105d3565b60008260000182815481106116bd576116bd61225a565b9060005260206000200154905092915050565b60006001600160a01b0384163b156117c357604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906117149033908990889088906004016123ab565b6020604051808303816000875af192505050801561174f575060408051601f3d908101601f1916820190925261174c918101906123e8565b60015b6117a9573d80801561177d576040519150601f19603f3d011682016040523d82523d6000602084013e611782565b606091505b5080516117a15760405162461bcd60e51b81526004016105d3906122e4565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610e53565b506001949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b831061180d5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310611839576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061185757662386f26fc10000830492506010015b6305f5e100831061186f576305f5e100830492506008015b612710831061188357612710830492506004015b60648310611895576064830492506002015b600a831061049f5760010192915050565b60006001600160e01b03198216635a05180f60e01b148061049f575061049f82611bdf565b6118d784848484611c14565b600c5460ff1615610ba95760405162461bcd60e51b815260206004820152602b60248201527f4552433732315061757361626c653a20746f6b656e207472616e73666572207760448201526a1a1a5b19481c185d5cd95960aa1b60648201526084016105d3565b606061049f6001600160a01b03831660145b6060600061195f83600261241b565b61196a90600261243a565b67ffffffffffffffff811115611982576119826120b6565b6040519080825280601f01601f1916602001820160405280156119ac576020820181803683370190505b509050600360fc1b816000815181106119c7576119c761225a565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106119f6576119f661225a565b60200101906001600160f81b031916908160001a9053506000611a1a84600261241b565b611a2590600161243a565b90505b6001811115611a9d576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611a5957611a5961225a565b1a60f81b828281518110611a6f57611a6f61225a565b60200101906001600160f81b031916908160001a90535060049490941c93611a9681612452565b9050611a28565b508315610b2d5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016105d3565b60008181526001830160205260408120548015611bd5576000611b10600183612469565b8554909150600090611b2490600190612469565b9050818114611b89576000866000018281548110611b4457611b4461225a565b9060005260206000200154905080876000018481548110611b6757611b6761225a565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080611b9a57611b9a612480565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061049f565b600091505061049f565b60006001600160e01b03198216637965db0b60e01b148061049f57506301ffc9a760e01b6001600160e01b031983161461049f565b6001811115611c835760405162461bcd60e51b815260206004820152603560248201527f455243373231456e756d657261626c653a20636f6e7365637574697665207472604482015274185b9cd9995c9cc81b9bdd081cdd5c1c1bdc9d1959605a1b60648201526084016105d3565b816001600160a01b038516611cdf57611cda81600a80546000838152600b60205260408120829055600182018355919091527fc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a80155565b611d02565b836001600160a01b0316856001600160a01b031614611d0257611d028582611d48565b6001600160a01b038416611d1e57611d1981611de5565b611d41565b846001600160a01b0316846001600160a01b031614611d4157611d418482611e94565b5050505050565b60006001611d55846109eb565b611d5f9190612469565b600083815260096020526040902054909150808214611db2576001600160a01b03841660009081526008602090815260408083208584528252808320548484528184208190558352600990915290208190555b5060009182526009602090815260408084208490556001600160a01b039094168352600881528383209183525290812055565b600a54600090611df790600190612469565b6000838152600b6020526040812054600a8054939450909284908110611e1f57611e1f61225a565b9060005260206000200154905080600a8381548110611e4057611e4061225a565b6000918252602080832090910192909255828152600b9091526040808220849055858252812055600a805480611e7857611e78612480565b6001900381819060005260206000200160009055905550505050565b6000611e9f836109eb565b6001600160a01b039093166000908152600860209081526040808320868452825280832085905593825260099052919091209190915550565b6001600160e01b0319811681146108d557600080fd5b600060208284031215611f0057600080fd5b8135610b2d81611ed8565b60005b83811015611f26578181015183820152602001611f0e565b83811115610ba95750506000910152565b60008151808452611f4f816020860160208601611f0b565b601f01601f19169290920160200192915050565b602081526000610b2d6020830184611f37565b600060208284031215611f8857600080fd5b5035919050565b80356001600160a01b0381168114611fa657600080fd5b919050565b60008060408385031215611fbe57600080fd5b611fc783611f8f565b946020939093013593505050565b600080600060608486031215611fea57600080fd5b611ff384611f8f565b925061200160208501611f8f565b9150604084013590509250925092565b6000806040838503121561202457600080fd5b8235915061203460208401611f8f565b90509250929050565b60006020828403121561204f57600080fd5b610b2d82611f8f565b6000806040838503121561206b57600080fd5b50508035926020909101359150565b6000806040838503121561208d57600080fd5b61209683611f8f565b9150602083013580151581146120ab57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600080600080608085870312156120e257600080fd5b6120eb85611f8f565b93506120f960208601611f8f565b925060408501359150606085013567ffffffffffffffff8082111561211d57600080fd5b818701915087601f83011261213157600080fd5b813581811115612143576121436120b6565b604051601f8201601f19908116603f0116810190838211818310171561216b5761216b6120b6565b816040528281528a602084870101111561218457600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b600080604083850312156121bb57600080fd5b6121c483611f8f565b915061203460208401611f8f565b600181811c908216806121e657607f821691505b6020821081141561220757634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b60008351612282818460208801611f0b565b835190830190612296818360208801611f0b565b01949350505050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161236e816017850160208801611f0b565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161239f816028840160208801611f0b565b01602801949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906123de90830184611f37565b9695505050505050565b6000602082840312156123fa57600080fd5b8151610b2d81611ed8565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561243557612435612405565b500290565b6000821982111561244d5761244d612405565b500190565b60008161246157612461612405565b506000190190565b60008282101561247b5761247b612405565b500390565b634e487b7160e01b600052603160045260246000fdfea26469706673582212207da7460e1eabca35fdc8fcc7e4a4b06d4a25ba8fe2485c944b131247a4456b2964736f6c634300080b0033';

type MockERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockERC721ConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockERC721__factory extends ContractFactory {
  constructor(...args: MockERC721ConstructorParams) {
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
      MockERC721 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MockERC721__factory {
    return super.connect(runner) as MockERC721__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockERC721Interface {
    return new Interface(_abi) as MockERC721Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): MockERC721 {
    return new Contract(address, _abi, runner) as unknown as MockERC721;
  }
}
