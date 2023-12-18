/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from 'ethers6';
import type {
  Signer,
  ContractDeployTransaction,
  ContractRunner,
} from 'ethers6';
import type { NonPayableOverrides } from '../../../common';
import type {
  NiftyEquipment,
  NiftyEquipmentInterface,
} from '../../../src/contracts/NiftyEquipment';

const _abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_symbol',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_uri',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
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
        name: 'operator',
        type: 'address',
      },
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
        indexed: false,
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
    ],
    name: 'TransferBatch',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
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
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'TransferSingle',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'URI',
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
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
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
        internalType: 'address[]',
        name: 'accounts',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
    ],
    name: 'balanceOfBatch',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'value',
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
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
    ],
    name: 'burnBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'exists',
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
        name: 'account',
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
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'mintBatch',
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
    inputs: [],
    name: 'pauseBurn',
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
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeBatchTransferFrom',
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
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
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
        internalType: 'string',
        name: 'newuri',
        type: 'string',
      },
    ],
    name: 'setURI',
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
        name: 'id',
        type: 'uint256',
      },
    ],
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
    inputs: [],
    name: 'unpauseBurn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'uri',
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
] as const;

const _bytecode =
  '0x60806040523480156200001157600080fd5b5060405162002cd638038062002cd683398101604081905262000034916200031a565b806200004081620000e5565b506005805460ff1916905562000058600033620000fe565b620000847f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633620000fe565b620000b07f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33620000fe565b8251620000c5906006906020860190620001a7565b508151620000db906007906020850190620001a7565b50505050620003e8565b8051620000fa906003906020840190620001a7565b5050565b6000828152602081815260408083206001600160a01b0385168452909152902054620000fa908390839060ff16620000fa576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620001633390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b828054620001b590620003ab565b90600052602060002090601f016020900481019282620001d9576000855562000224565b82601f10620001f457805160ff191683800117855562000224565b8280016001018555821562000224579182015b828111156200022457825182559160200191906001019062000207565b506200023292915062000236565b5090565b5b8082111562000232576000815560010162000237565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200027557600080fd5b81516001600160401b03808211156200029257620002926200024d565b604051601f8301601f19908116603f01168101908282118183101715620002bd57620002bd6200024d565b81604052838152602092508683858801011115620002da57600080fd5b600091505b83821015620002fe5785820183015181830184015290820190620002df565b83821115620003105760008385830101525b9695505050505050565b6000806000606084860312156200033057600080fd5b83516001600160401b03808211156200034857600080fd5b620003568783880162000263565b945060208601519150808211156200036d57600080fd5b6200037b8783880162000263565b935060408601519150808211156200039257600080fd5b50620003a18682870162000263565b9150509250925092565b600181811c90821680620003c057607f821691505b60208210811415620003e257634e487b7160e01b600052602260045260246000fd5b50919050565b6128de80620003f86000396000f3fe608060405234801561001057600080fd5b50600436106101c35760003560e01c80636b20c454116100f9578063bd85b03911610097578063e63ab1e911610071578063e63ab1e9146103d0578063e985e9c5146103f7578063f242432a14610433578063f5298aca1461044657600080fd5b8063bd85b03914610376578063d539139314610396578063d547741f146103bd57600080fd5b806395d89b41116100d357806395d89b411461034b578063a217fddf14610353578063a22cb4651461035b578063a6559fe41461036e57600080fd5b80636b20c45414610312578063731133e91461032557806391d148541461033857600080fd5b80632eb2c2d6116101665780634295e857116101405780634295e857146102bd5780634e1273f4146102c55780634f558e79146102e55780635c975abb1461030757600080fd5b80632eb2c2d6146102845780632f2ff15d1461029757806336568abe146102aa57600080fd5b806306fdde03116101a257806306fdde03146102265780630e89341c1461023b5780631f7fdffa1461024e578063248a9ca31461026157600080fd5b8062fdd58e146101c857806301ffc9a7146101ee57806302fe530514610211575b600080fd5b6101db6101d6366004611cce565b610459565b6040519081526020015b60405180910390f35b6102016101fc366004611d0e565b6104f1565b60405190151581526020016101e5565b61022461021f366004611dca565b610502565b005b61022e61051a565b6040516101e59190611e72565b61022e610249366004611e85565b6105a8565b61022461025c366004611f52565b61063c565b6101db61026f366004611e85565b60009081526020819052604090206001015490565b610224610292366004611fea565b610679565b6102246102a5366004612093565b6106be565b6102246102b8366004612093565b6106e8565b610224610762565b6102d86102d33660046120bf565b610797565b6040516101e591906121c4565b6102016102f3366004611e85565b600090815260046020526040902054151590565b60055460ff16610201565b6102246103203660046121d7565b6108c0565b61022461033336600461224a565b61093b565b610201610346366004612093565b610971565b61022e61099a565b6101db600081565b61022461036936600461229e565b6109a7565b6102246109b2565b6101db610384366004611e85565b60009081526004602052604090205490565b6101db7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6102246103cb366004612093565b6109e4565b6101db7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6102016104053660046122da565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205460ff1690565b610224610441366004612304565b610a09565b610224610454366004612368565b610a4e565b60006001600160a01b0383166104c95760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a2061646472657373207a65726f206973206e6f742061207660448201526930b634b21037bbb732b960b11b60648201526084015b60405180910390fd5b5060009081526001602090815260408083206001600160a01b03949094168352929052205490565b60006104fc82610ac9565b92915050565b600061050d81610b09565b61051682610b13565b5050565b600680546105279061239b565b80601f01602080910402602001604051908101604052809291908181526020018280546105539061239b565b80156105a05780601f10610575576101008083540402835291602001916105a0565b820191906000526020600020905b81548152906001019060200180831161058357829003601f168201915b505050505081565b6060600380546105b79061239b565b80601f01602080910402602001604051908101604052809291908181526020018280546105e39061239b565b80156106305780601f1061060557610100808354040283529160200191610630565b820191906000526020600020905b81548152906001019060200180831161061357829003601f168201915b50505050509050919050565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a661066681610b09565b61067285858585610b26565b5050505050565b6001600160a01b03851633148061069557506106958533610405565b6106b15760405162461bcd60e51b81526004016104c0906123d6565b6106728585858585610c81565b6000828152602081905260409020600101546106d981610b09565b6106e38383610e2e565b505050565b6001600160a01b03811633146107585760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016104c0565b6105168282610eb2565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a61078c81610b09565b610794610f17565b50565b606081518351146107fc5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604482015268040dad2e6dac2e8c6d60bb1b60648201526084016104c0565b600083516001600160401b0381111561081757610817611d2b565b604051908082528060200260200182016040528015610840578160200160208202803683370190505b50905060005b84518110156108b85761088b85828151811061086457610864612424565b602002602001015185838151811061087e5761087e612424565b6020026020010151610459565b82828151811061089d5761089d612424565b60209081029190910101526108b181612450565b9050610846565b509392505050565b6108c8610f69565b6001600160a01b0383163314806108e457506108e48333610405565b6109305760405162461bcd60e51b815260206004820181905260248201527f43616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656460448201526064016104c0565b6106e3838383610fb1565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a661096581610b09565b61067285858585611152565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b600780546105279061239b565b61051633838361123d565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6109dc81610b09565b61079461131e565b6000828152602081905260409020600101546109ff81610b09565b6106e38383610eb2565b6001600160a01b038516331480610a255750610a258533610405565b610a415760405162461bcd60e51b81526004016104c0906123d6565b610672858585858561135b565b610a56610f69565b6001600160a01b038316331480610a725750610a728333610405565b610abe5760405162461bcd60e51b815260206004820181905260248201527f43616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656460448201526064016104c0565b6106e3838383611497565b60006001600160e01b03198216636cdb3d1360e11b1480610afa57506001600160e01b031982166303a24d0760e21b145b806104fc57506104fc826115b3565b61079481336115e8565b8051610516906003906020840190611c19565b6001600160a01b038416610b4c5760405162461bcd60e51b81526004016104c09061246b565b8151835114610b6d5760405162461bcd60e51b81526004016104c0906124ac565b33610b7d81600087878787611641565b60005b8451811015610c1957838181518110610b9b57610b9b612424565b602002602001015160016000878481518110610bb957610bb9612424565b602002602001015181526020019081526020016000206000886001600160a01b03166001600160a01b031681526020019081526020016000206000828254610c0191906124f4565b90915550819050610c1181612450565b915050610b80565b50846001600160a01b031660006001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610c6a92919061250c565b60405180910390a4610672816000878787876117ba565b8151835114610ca25760405162461bcd60e51b81526004016104c0906124ac565b6001600160a01b038416610cc85760405162461bcd60e51b81526004016104c09061253a565b33610cd7818787878787611641565b60005b8451811015610dc0576000858281518110610cf757610cf7612424565b602002602001015190506000858381518110610d1557610d15612424565b60209081029190910181015160008481526001835260408082206001600160a01b038e168352909352919091205490915081811015610d665760405162461bcd60e51b81526004016104c09061257f565b60008381526001602090815260408083206001600160a01b038e8116855292528083208585039055908b16825281208054849290610da59084906124f4565b9250508190555050505080610db990612450565b9050610cda565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610e1092919061250c565b60405180910390a4610e268187878787876117ba565b505050505050565b610e388282610971565b610516576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610e6e3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610ebc8282610971565b15610516576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b610f1f611916565b6005805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b60055460ff1615610faf5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016104c0565b565b6001600160a01b038316610fd75760405162461bcd60e51b81526004016104c0906125c9565b8051825114610ff85760405162461bcd60e51b81526004016104c0906124ac565b600033905061101b81856000868660405180602001604052806000815250611641565b60005b83518110156110e357600084828151811061103b5761103b612424565b60200260200101519050600084838151811061105957611059612424565b60209081029190910181015160008481526001835260408082206001600160a01b038c1683529093529190912054909150818110156110aa5760405162461bcd60e51b81526004016104c09061260c565b60009283526001602090815260408085206001600160a01b038b16865290915290922091039055806110db81612450565b91505061101e565b5060006001600160a01b0316846001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb868660405161113492919061250c565b60405180910390a46040805160208101909152600090525b50505050565b6001600160a01b0384166111785760405162461bcd60e51b81526004016104c09061246b565b3360006111848561195f565b905060006111918561195f565b90506111a283600089858589611641565b60008681526001602090815260408083206001600160a01b038b168452909152812080548792906111d49084906124f4565b909155505060408051878152602081018790526001600160a01b03808a1692600092918716917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4611234836000898989896119aa565b50505050505050565b816001600160a01b0316836001600160a01b031614156112b15760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604482015268103337b91039b2b63360b91b60648201526084016104c0565b6001600160a01b03838116600081815260026020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611326610f69565b6005805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610f4c3390565b6001600160a01b0384166113815760405162461bcd60e51b81526004016104c09061253a565b33600061138d8561195f565b9050600061139a8561195f565b90506113aa838989858589611641565b60008681526001602090815260408083206001600160a01b038c168452909152902054858110156113ed5760405162461bcd60e51b81526004016104c09061257f565b60008781526001602090815260408083206001600160a01b038d8116855292528083208985039055908a1682528120805488929061142c9084906124f4565b909155505060408051888152602081018890526001600160a01b03808b16928c821692918816917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a461148c848a8a8a8a8a6119aa565b505050505050505050565b6001600160a01b0383166114bd5760405162461bcd60e51b81526004016104c0906125c9565b3360006114c98461195f565b905060006114d68461195f565b90506114f683876000858560405180602001604052806000815250611641565b60008581526001602090815260408083206001600160a01b038a168452909152902054848110156115395760405162461bcd60e51b81526004016104c09061260c565b60008681526001602090815260408083206001600160a01b038b81168086529184528285208a8703905582518b81529384018a90529092908816917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4604080516020810190915260009052611234565b60006001600160e01b03198216637965db0b60e01b14806104fc57506301ffc9a760e01b6001600160e01b03198316146104fc565b6115f28282610971565b610516576115ff81611a65565b61160a836020611a77565b60405160200161161b929190612650565b60408051601f198184030181529082905262461bcd60e51b82526104c091600401611e72565b6001600160a01b0385166116c85760005b83518110156116c65782818151811061166d5761166d612424565b60200260200101516004600086848151811061168b5761168b612424565b6020026020010151815260200190815260200160002060008282546116b091906124f4565b909155506116bf905081612450565b9050611652565b505b6001600160a01b038416610e265760005b83518110156112345760008482815181106116f6576116f6612424565b60200260200101519050600084838151811061171457611714612424565b60200260200101519050600060046000848152602001908152602001600020549050818110156117975760405162461bcd60e51b815260206004820152602860248201527f455243313135353a206275726e20616d6f756e74206578636565647320746f74604482015267616c537570706c7960c01b60648201526084016104c0565b600092835260046020526040909220910390556117b381612450565b90506116d9565b6001600160a01b0384163b15610e265760405163bc197c8160e01b81526001600160a01b0385169063bc197c81906117fe90899089908890889088906004016126c5565b6020604051808303816000875af1925050508015611839575060408051601f3d908101601f1916820190925261183691810190612723565b60015b6118e657611845612740565b806308c379a0141561187f575061185a61275c565b806118655750611881565b8060405162461bcd60e51b81526004016104c09190611e72565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e2d455243313135356044820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b60648201526084016104c0565b6001600160e01b0319811663bc197c8160e01b146112345760405162461bcd60e51b81526004016104c0906127e5565b60055460ff16610faf5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016104c0565b6040805160018082528183019092526060916000919060208083019080368337019050509050828160008151811061199957611999612424565b602090810291909101015292915050565b6001600160a01b0384163b15610e265760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e61906119ee908990899088908890889060040161282d565b6020604051808303816000875af1925050508015611a29575060408051601f3d908101601f19168201909252611a2691810190612723565b60015b611a3557611845612740565b6001600160e01b0319811663f23a6e6160e01b146112345760405162461bcd60e51b81526004016104c0906127e5565b60606104fc6001600160a01b03831660145b60606000611a86836002612872565b611a919060026124f4565b6001600160401b03811115611aa857611aa8611d2b565b6040519080825280601f01601f191660200182016040528015611ad2576020820181803683370190505b509050600360fc1b81600081518110611aed57611aed612424565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611b1c57611b1c612424565b60200101906001600160f81b031916908160001a9053506000611b40846002612872565b611b4b9060016124f4565b90505b6001811115611bc3576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611b7f57611b7f612424565b1a60f81b828281518110611b9557611b95612424565b60200101906001600160f81b031916908160001a90535060049490941c93611bbc81612891565b9050611b4e565b508315611c125760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016104c0565b9392505050565b828054611c259061239b565b90600052602060002090601f016020900481019282611c475760008555611c8d565b82601f10611c6057805160ff1916838001178555611c8d565b82800160010185558215611c8d579182015b82811115611c8d578251825591602001919060010190611c72565b50611c99929150611c9d565b5090565b5b80821115611c995760008155600101611c9e565b80356001600160a01b0381168114611cc957600080fd5b919050565b60008060408385031215611ce157600080fd5b611cea83611cb2565b946020939093013593505050565b6001600160e01b03198116811461079457600080fd5b600060208284031215611d2057600080fd5b8135611c1281611cf8565b634e487b7160e01b600052604160045260246000fd5b601f8201601f191681016001600160401b0381118282101715611d6657611d66611d2b565b6040525050565b60006001600160401b03831115611d8657611d86611d2b565b604051611d9d601f8501601f191660200182611d41565b809150838152848484011115611db257600080fd5b83836020830137600060208583010152509392505050565b600060208284031215611ddc57600080fd5b81356001600160401b03811115611df257600080fd5b8201601f81018413611e0357600080fd5b611e1284823560208401611d6d565b949350505050565b60005b83811015611e35578181015183820152602001611e1d565b8381111561114c5750506000910152565b60008151808452611e5e816020860160208601611e1a565b601f01601f19169290920160200192915050565b602081526000611c126020830184611e46565b600060208284031215611e9757600080fd5b5035919050565b60006001600160401b03821115611eb757611eb7611d2b565b5060051b60200190565b600082601f830112611ed257600080fd5b81356020611edf82611e9e565b604051611eec8282611d41565b83815260059390931b8501820192828101915086841115611f0c57600080fd5b8286015b84811015611f275780358352918301918301611f10565b509695505050505050565b600082601f830112611f4357600080fd5b611c1283833560208501611d6d565b60008060008060808587031215611f6857600080fd5b611f7185611cb2565b935060208501356001600160401b0380821115611f8d57600080fd5b611f9988838901611ec1565b94506040870135915080821115611faf57600080fd5b611fbb88838901611ec1565b93506060870135915080821115611fd157600080fd5b50611fde87828801611f32565b91505092959194509250565b600080600080600060a0868803121561200257600080fd5b61200b86611cb2565b945061201960208701611cb2565b935060408601356001600160401b038082111561203557600080fd5b61204189838a01611ec1565b9450606088013591508082111561205757600080fd5b61206389838a01611ec1565b9350608088013591508082111561207957600080fd5b5061208688828901611f32565b9150509295509295909350565b600080604083850312156120a657600080fd5b823591506120b660208401611cb2565b90509250929050565b600080604083850312156120d257600080fd5b82356001600160401b03808211156120e957600080fd5b818501915085601f8301126120fd57600080fd5b8135602061210a82611e9e565b6040516121178282611d41565b83815260059390931b850182019282810191508984111561213757600080fd5b948201945b8386101561215c5761214d86611cb2565b8252948201949082019061213c565b9650508601359250508082111561217257600080fd5b5061217f85828601611ec1565b9150509250929050565b600081518084526020808501945080840160005b838110156121b95781518752958201959082019060010161219d565b509495945050505050565b602081526000611c126020830184612189565b6000806000606084860312156121ec57600080fd5b6121f584611cb2565b925060208401356001600160401b038082111561221157600080fd5b61221d87838801611ec1565b9350604086013591508082111561223357600080fd5b5061224086828701611ec1565b9150509250925092565b6000806000806080858703121561226057600080fd5b61226985611cb2565b9350602085013592506040850135915060608501356001600160401b0381111561229257600080fd5b611fde87828801611f32565b600080604083850312156122b157600080fd5b6122ba83611cb2565b9150602083013580151581146122cf57600080fd5b809150509250929050565b600080604083850312156122ed57600080fd5b6122f683611cb2565b91506120b660208401611cb2565b600080600080600060a0868803121561231c57600080fd5b61232586611cb2565b945061233360208701611cb2565b9350604086013592506060860135915060808601356001600160401b0381111561235c57600080fd5b61208688828901611f32565b60008060006060848603121561237d57600080fd5b61238684611cb2565b95602085013595506040909401359392505050565b600181811c908216806123af57607f821691505b602082108114156123d057634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602e908201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60408201526d195c881bdc88185c1c1c9bdd995960921b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60006000198214156124645761246461243a565b5060010190565b60208082526021908201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736040820152607360f81b606082015260800190565b60208082526028908201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206040820152670dad2e6dac2e8c6d60c31b606082015260800190565b600082198211156125075761250761243a565b500190565b60408152600061251f6040830185612189565b82810360208401526125318185612189565b95945050505050565b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b60208082526023908201527f455243313135353a206275726e2066726f6d20746865207a65726f206164647260408201526265737360e81b606082015260800190565b60208082526024908201527f455243313135353a206275726e20616d6f756e7420657863656564732062616c604082015263616e636560e01b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351612688816017850160208801611e1a565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516126b9816028840160208801611e1a565b01602801949350505050565b6001600160a01b0386811682528516602082015260a0604082018190526000906126f190830186612189565b82810360608401526127038186612189565b905082810360808401526127178185611e46565b98975050505050505050565b60006020828403121561273557600080fd5b8151611c1281611cf8565b600060033d11156127595760046000803e5060005160e01c5b90565b600060443d101561276a5790565b6040516003193d81016004833e81513d6001600160401b03816024840111818411171561279957505050505090565b82850191508151818111156127b15750505050505090565b843d87010160208285010111156127cb5750505050505090565b6127da60208286010187611d41565b509095945050505050565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061286790830184611e46565b979650505050505050565b600081600019048311821515161561288c5761288c61243a565b500290565b6000816128a0576128a061243a565b50600019019056fea2646970667358221220ae10f3d1bcf269c83dde7cdeaf1fbfbb537a5424b007a7cec22bd73a8359b9d664736f6c634300080b0033';

type NiftyEquipmentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NiftyEquipmentConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NiftyEquipment__factory extends ContractFactory {
  constructor(...args: NiftyEquipmentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _name: string,
    _symbol: string,
    _uri: string,
    overrides?: NonPayableOverrides & { from?: string },
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_name, _symbol, _uri, overrides || {});
  }
  override deploy(
    _name: string,
    _symbol: string,
    _uri: string,
    overrides?: NonPayableOverrides & { from?: string },
  ) {
    return super.deploy(_name, _symbol, _uri, overrides || {}) as Promise<
      NiftyEquipment & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): NiftyEquipment__factory {
    return super.connect(runner) as NiftyEquipment__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NiftyEquipmentInterface {
    return new Interface(_abi) as NiftyEquipmentInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null,
  ): NiftyEquipment {
    return new Contract(address, _abi, runner) as unknown as NiftyEquipment;
  }
}