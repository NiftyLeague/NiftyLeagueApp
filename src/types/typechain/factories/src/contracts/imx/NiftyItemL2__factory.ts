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
import type { NonPayableOverrides } from '../../../../common';
import type {
  NiftyItemL2,
  NiftyItemL2Interface,
} from '../../../../src/contracts/imx/NiftyItemL2';

const _abi = [
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
        internalType: 'bytes',
        name: 'blueprint',
        type: 'bytes',
      },
    ],
    name: 'AssetMinted',
    type: 'event',
  },
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
        name: '_tokenId',
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
    inputs: [],
    name: 'imx',
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
        name: '_imx',
        type: 'address',
      },
    ],
    name: 'initialize',
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
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'itemIdByTokenId',
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
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_mintingBlob',
        type: 'bytes',
      },
    ],
    name: 'mintFor',
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
    inputs: [],
    name: 'renounceOwnership',
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
        internalType: 'string',
        name: '_uri',
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
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
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
  '0x608060405234801561001057600080fd5b5061276f806100206000396000f3fe608060405234801561001057600080fd5b50600436106101cf5760003560e01c80635c975abb1161010457806395d89b41116100a2578063c87b56dd11610071578063c87b56dd146103b8578063e985e9c5146103cb578063eac989f814610407578063f2fde38b1461040f57600080fd5b806395d89b4114610377578063a22cb4651461037f578063b88d4fde14610392578063c4d66de8146103a557600080fd5b8063715018a6116100de578063715018a6146103355780638456cb591461033d5780638a0bdb30146103455780638da5cb5b1461036657600080fd5b80635c975abb146103045780636352211e1461030f57806370a082311461032257600080fd5b806319ee6e3f116101715780633f4ba83a1161014b5780633f4ba83a146102c357806342842e0e146102cb57806342966c68146102de5780634f6ccce7146102f157600080fd5b806319ee6e3f1461028a57806323b872dd1461029d5780632f745c59146102b057600080fd5b8063081812fc116101ad578063081812fc14610226578063095ea7b3146102515780630f08025f1461026457806318160ddd1461027857600080fd5b806301ffc9a7146101d457806302fe5305146101fc57806306fdde0314610211575b600080fd5b6101e76101e23660046120ae565b610422565b60405190151581526020015b60405180910390f35b61020f61020a36600461210d565b61044d565b005b610219610467565b6040516101f391906121a7565b6102396102343660046121ba565b6104f9565b6040516001600160a01b0390911681526020016101f3565b61020f61025f3660046121ef565b610520565b61012e54610239906001600160a01b031681565b6099545b6040519081526020016101f3565b61020f610298366004612219565b610636565b61020f6102ab366004612273565b610764565b61027c6102be3660046121ef565b610795565b61020f61082b565b61020f6102d9366004612273565b61083d565b61020f6102ec3660046121ba565b610858565b61027c6102ff3660046121ba565b61086c565b60fb5460ff166101e7565b61023961031d3660046121ba565b6108ff565b61027c6103303660046122af565b61095f565b61020f6109e5565b61020f6109f7565b61027c6103533660046121ba565b61012f6020526000908152604090205481565b60c9546001600160a01b0316610239565b610219610a07565b61020f61038d3660046122ca565b610a16565b61020f6103a036600461231c565b610a25565b61020f6103b33660046122af565b610a5d565b6102196103c63660046121ba565b610be2565b6101e76103d93660046123f8565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b610219610c49565b61020f61041d3660046122af565b610cd8565b60006001600160e01b0319821663780e9d6360e01b1480610447575061044782610d4e565b92915050565b610455610d9e565b61046261012d8383611f8b565b505050565b6060606580546104769061242b565b80601f01602080910402602001604051908101604052809291908181526020018280546104a29061242b565b80156104ef5780601f106104c4576101008083540402835291602001916104ef565b820191906000526020600020905b8154815290600101906020018083116104d257829003601f168201915b5050505050905090565b600061050482610df8565b506000908152606960205260409020546001600160a01b031690565b600061052b826108ff565b9050806001600160a01b0316836001600160a01b0316141561059e5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806105ba57506105ba81336103d9565b61062c5760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c0000006064820152608401610595565b6104628383610e57565b61012e546001600160a01b031633148061065a575060c9546001600160a01b031633145b6106ba5760405162461bcd60e51b815260206004820152602b60248201527f46756e6374696f6e2063616e206f6e6c792062652063616c6c6564206279206f60448201526a0eedccae440dee440929ab60ab1b6064820152608401610595565b6106c2610ec5565b826001146107055760405162461bcd60e51b815260206004820152601060248201526f416d6f756e74206d757374206265203160801b6044820152606401610595565b6000806107128484610f0b565b915091506107218683836110c6565b7f31e594f6b36b98ec520a91cbbba7b8724b1cec27393f86d8f0f6aa6084db0aaf86838360405161075493929190612466565b60405180910390a1505050505050565b61076e33826110ef565b61078a5760405162461bcd60e51b815260040161059590612496565b61046283838361116e565b60006107a08361095f565b82106108025760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b6064820152608401610595565b506001600160a01b03919091166000908152609760209081526040808320938352929052205490565b610833610d9e565b61083b6112df565b565b61046283838360405180602001604052806000815250610a25565b610860610ec5565b61086981611331565b50565b600061087760995490565b82106108da5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b6064820152608401610595565b609982815481106108ed576108ed6124e3565b90600052602060002001549050919050565b6000818152606760205260408120546001600160a01b0316806104475760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610595565b60006001600160a01b0382166109c95760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610595565b506001600160a01b031660009081526068602052604090205490565b6109ed610d9e565b61083b60006113d4565b6109ff610d9e565b61083b611426565b6060606680546104769061242b565b610a21338383611463565b5050565b610a2f33836110ef565b610a4b5760405162461bcd60e51b815260040161059590612496565b610a5784848484611532565b50505050565b600054610100900460ff1615808015610a7d5750600054600160ff909116105b80610a975750303b158015610a97575060005460ff166001145b610afa5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610595565b6000805460ff191660011790558015610b1d576000805461ff0019166101001790555b610b6d6040518060400160405280600b81526020016a2734b33a3ca4ba32b6a61960a91b8152506040518060400160405280600b81526020016a2734b33a3ca4ba32b6a61960a91b815250611565565b610b75611596565b610b7d6115c5565b61012e80546001600160a01b0319166001600160a01b0384161790558015610a21576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b6060610bed82610df8565b6000610bf76115f4565b90506000815111610c175760405180602001604052806000815250610c42565b80610c2184611604565b604051602001610c329291906124f9565b6040516020818303038152906040525b9392505050565b61012d8054610c579061242b565b80601f0160208091040260200160405190810160405280929190818152602001828054610c839061242b565b8015610cd05780601f10610ca557610100808354040283529160200191610cd0565b820191906000526020600020905b815481529060010190602001808311610cb357829003601f168201915b505050505081565b610ce0610d9e565b6001600160a01b038116610d455760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610595565b610869816113d4565b60006001600160e01b031982166380ac58cd60e01b1480610d7f57506001600160e01b03198216635b5e139f60e01b145b8061044757506301ffc9a760e01b6001600160e01b0319831614610447565b60c9546001600160a01b0316331461083b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610595565b6000818152606760205260409020546001600160a01b03166108695760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610595565b600081815260696020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610e8c826108ff565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60fb5460ff161561083b5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610595565b600060606000610f6985858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052506040805180820190915260018152601d60f91b6020820152935091506116a19050565b90506000811215610fb35760405162461bcd60e51b815260206004820152601460248201527314d95c185c985d1bdc881b5d5cdd08195e1a5cdd60621b6044820152606401610595565b600061100d86600187610fc6828761253e565b92610fd393929190612555565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061173992505050565b90506000600361101d848861253e565b611027919061253e565b90508061104b578160405180602001604052806000815250945094505050506110bf565b366000888861105b87600261257f565b9061106760018c61253e565b9261107493929190612555565b9150915083828281818080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250959c50919a50505050505050505050505b9250929050565b60006110d182611739565b600084815261012f602052604090208190559050610a578484611811565b6000806110fb836108ff565b9050806001600160a01b0316846001600160a01b0316148061114257506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b806111665750836001600160a01b031661115b846104f9565b6001600160a01b0316145b949350505050565b826001600160a01b0316611181826108ff565b6001600160a01b0316146111a75760405162461bcd60e51b815260040161059590612597565b6001600160a01b0382166112095760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610595565b611216838383600161182b565b826001600160a01b0316611229826108ff565b6001600160a01b03161461124f5760405162461bcd60e51b815260040161059590612597565b600081815260696020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260688552838620805460001901905590871680865283862080546001019055868652606790945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6112e761195f565b60fb805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600061133c826108ff565b905061134c81600084600161182b565b611355826108ff565b600083815260696020908152604080832080546001600160a01b03199081169091556001600160a01b0385168085526068845282852080546000190190558785526067909352818420805490911690555192935084927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60c980546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61142e610ec5565b60fb805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586113143390565b816001600160a01b0316836001600160a01b031614156114c55760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610595565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b61153d84848461116e565b611549848484846119a8565b610a575760405162461bcd60e51b8152600401610595906125dc565b600054610100900460ff1661158c5760405162461bcd60e51b81526004016105959061262e565b610a218282611aa6565b600054610100900460ff166115bd5760405162461bcd60e51b81526004016105959061262e565b61083b611af4565b600054610100900460ff166115ec5760405162461bcd60e51b81526004016105959061262e565b61083b611b24565b606061012d80546104769061242b565b6060600061161183611b57565b600101905060008167ffffffffffffffff81111561163157611631612306565b6040519080825280601f01601f19166020018201604052801561165b576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a850494508461169457611699565b611665565b509392505050565b815160009083906001146116b7576116b7612679565b825b855181101561172c57816000815181106116d5576116d56124e3565b602001015160f81c60f81b6001600160f81b0319168682815181106116fc576116fc6124e3565b01602001516001600160f81b031916141561171a579150610c429050565b806117248161268f565b9150506116b9565b5060001995945050505050565b600080805b835181101561180a57600084828151811061175b5761175b6124e3565b016020015160f81c905060308110801590611777575060398111155b156117a35761178760308261253e565b61179284600a6126aa565b61179c919061257f565b92506117f7565b60405162461bcd60e51b815260206004820152602360248201527f696e76616c696420696e7075742c206f6e6c79206e756d6265727320616c6c6f6044820152621dd95960ea1b6064820152608401610595565b50806118028161268f565b91505061173e565b5092915050565b610a21828260405180602001604052806000815250611c2f565b600181111561189a5760405162461bcd60e51b815260206004820152603560248201527f455243373231456e756d657261626c653a20636f6e7365637574697665207472604482015274185b9cd9995c9cc81b9bdd081cdd5c1c1bdc9d1959605a1b6064820152608401610595565b816001600160a01b0385166118f6576118f181609980546000838152609a60205260408120829055600182018355919091527f72a152ddfb8e864297c917af52ea6c1c68aead0fee1a62673fcc7e0c94979d000155565b611919565b836001600160a01b0316856001600160a01b031614611919576119198582611c62565b6001600160a01b0384166119355761193081611cff565b611958565b846001600160a01b0316846001600160a01b031614611958576119588482611dae565b5050505050565b60fb5460ff1661083b5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610595565b60006001600160a01b0384163b15611a9b57604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906119ec9033908990889088906004016126c9565b6020604051808303816000875af1925050508015611a27575060408051601f3d908101601f19168201909252611a2491810190612706565b60015b611a81573d808015611a55576040519150601f19603f3d011682016040523d82523d6000602084013e611a5a565b606091505b508051611a795760405162461bcd60e51b8152600401610595906125dc565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611166565b506001949350505050565b600054610100900460ff16611acd5760405162461bcd60e51b81526004016105959061262e565b8151611ae090606590602085019061200f565b50805161046290606690602084019061200f565b600054610100900460ff16611b1b5760405162461bcd60e51b81526004016105959061262e565b61083b336113d4565b600054610100900460ff16611b4b5760405162461bcd60e51b81526004016105959061262e565b60fb805460ff19169055565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310611b965772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310611bc2576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310611be057662386f26fc10000830492506010015b6305f5e1008310611bf8576305f5e100830492506008015b6127108310611c0c57612710830492506004015b60648310611c1e576064830492506002015b600a83106104475760010192915050565b611c398383611df2565b611c4660008484846119a8565b6104625760405162461bcd60e51b8152600401610595906125dc565b60006001611c6f8461095f565b611c79919061253e565b600083815260986020526040902054909150808214611ccc576001600160a01b03841660009081526097602090815260408083208584528252808320548484528184208190558352609890915290208190555b5060009182526098602090815260408084208490556001600160a01b039094168352609781528383209183525290812055565b609954600090611d119060019061253e565b6000838152609a602052604081205460998054939450909284908110611d3957611d396124e3565b906000526020600020015490508060998381548110611d5a57611d5a6124e3565b6000918252602080832090910192909255828152609a90915260408082208490558582528120556099805480611d9257611d92612723565b6001900381819060005260206000200160009055905550505050565b6000611db98361095f565b6001600160a01b039093166000908152609760209081526040808320868452825280832085905593825260989052919091209190915550565b6001600160a01b038216611e485760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610595565b6000818152606760205260409020546001600160a01b031615611ead5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610595565b611ebb60008383600161182b565b6000818152606760205260409020546001600160a01b031615611f205760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610595565b6001600160a01b038216600081815260686020908152604080832080546001019055848352606790915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b828054611f979061242b565b90600052602060002090601f016020900481019282611fb95760008555611fff565b82601f10611fd25782800160ff19823516178555611fff565b82800160010185558215611fff579182015b82811115611fff578235825591602001919060010190611fe4565b5061200b929150612083565b5090565b82805461201b9061242b565b90600052602060002090601f01602090048101928261203d5760008555611fff565b82601f1061205657805160ff1916838001178555611fff565b82800160010185558215611fff579182015b82811115611fff578251825591602001919060010190612068565b5b8082111561200b5760008155600101612084565b6001600160e01b03198116811461086957600080fd5b6000602082840312156120c057600080fd5b8135610c4281612098565b60008083601f8401126120dd57600080fd5b50813567ffffffffffffffff8111156120f557600080fd5b6020830191508360208285010111156110bf57600080fd5b6000806020838503121561212057600080fd5b823567ffffffffffffffff81111561213757600080fd5b612143858286016120cb565b90969095509350505050565b60005b8381101561216a578181015183820152602001612152565b83811115610a575750506000910152565b6000815180845261219381602086016020860161214f565b601f01601f19169290920160200192915050565b602081526000610c42602083018461217b565b6000602082840312156121cc57600080fd5b5035919050565b80356001600160a01b03811681146121ea57600080fd5b919050565b6000806040838503121561220257600080fd5b61220b836121d3565b946020939093013593505050565b6000806000806060858703121561222f57600080fd5b612238856121d3565b935060208501359250604085013567ffffffffffffffff81111561225b57600080fd5b612267878288016120cb565b95989497509550505050565b60008060006060848603121561228857600080fd5b612291846121d3565b925061229f602085016121d3565b9150604084013590509250925092565b6000602082840312156122c157600080fd5b610c42826121d3565b600080604083850312156122dd57600080fd5b6122e6836121d3565b9150602083013580151581146122fb57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561233257600080fd5b61233b856121d3565b9350612349602086016121d3565b925060408501359150606085013567ffffffffffffffff8082111561236d57600080fd5b818701915087601f83011261238157600080fd5b81358181111561239357612393612306565b604051601f8201601f19908116603f011681019083821181831017156123bb576123bb612306565b816040528281528a60208487010111156123d457600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561240b57600080fd5b612414836121d3565b9150612422602084016121d3565b90509250929050565b600181811c9082168061243f57607f821691505b6020821081141561246057634e487b7160e01b600052602260045260246000fd5b50919050565b60018060a01b038416815282602082015260606040820152600061248d606083018461217b565b95945050505050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b6000835161250b81846020880161214f565b83519083019061251f81836020880161214f565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561255057612550612528565b500390565b6000808585111561256557600080fd5b8386111561257257600080fd5b5050820193919092039150565b6000821982111561259257612592612528565b500190565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052600160045260246000fd5b60006000198214156126a3576126a3612528565b5060010190565b60008160001904831182151516156126c4576126c4612528565b500290565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906126fc9083018461217b565b9695505050505050565b60006020828403121561271857600080fd5b8151610c4281612098565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220a55ff071fb5f4bc8b10fda0d5e465a6a6dbe7cb2fadc91eb6b3e4ac38e6e190764736f6c634300080b0033';

type NiftyItemL2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NiftyItemL2ConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NiftyItemL2__factory extends ContractFactory {
  constructor(...args: NiftyItemL2ConstructorParams) {
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
      NiftyItemL2 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): NiftyItemL2__factory {
    return super.connect(runner) as NiftyItemL2__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NiftyItemL2Interface {
    return new Interface(_abi) as NiftyItemL2Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): NiftyItemL2 {
    return new Contract(address, _abi, runner) as unknown as NiftyItemL2;
  }
}
