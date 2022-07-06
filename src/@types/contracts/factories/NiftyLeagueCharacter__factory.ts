/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  NiftyLeagueCharacter,
  NiftyLeagueCharacterInterface,
} from "../NiftyLeagueCharacter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "nftlAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getCharacterTraits",
    outputs: [
      {
        components: [
          {
            internalType: "uint16",
            name: "tribe",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "skinColor",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "furColor",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "eyeColor",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "pupilColor",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "hair",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "mouth",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "beard",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "top",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "outerwear",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "print",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "bottom",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "footwear",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "belt",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "hat",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "eyewear",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "piercing",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "wrist",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "hands",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "neckwear",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "leftItem",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "rightItem",
            type: "uint16",
          },
        ],
        internalType: "struct NiftyLeagueCharacter.CharacterTraits",
        name: "_characterTraits",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRemovedTraits",
    outputs: [
      {
        internalType: "uint16[]",
        name: "",
        type: "uint16[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "trait",
        type: "uint256",
      },
    ],
    name: "isAvailableTrait",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "traitCombo",
        type: "uint256",
      },
    ],
    name: "isUnique",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseMinting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpauseMinting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b506040516200205838038062002058833981016040819052620000349162000254565b8151829082906200004d906000906020850190620000fb565b50805162000063906001906020840190620000fb565b505050620000806200007a620000a560201b60201c565b620000a9565b50506006805460ff60a01b1916905560601b6001600160601b0319166080526200032d565b3390565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b8280546200010990620002da565b90600052602060002090601f0160209004810192826200012d576000855562000178565b82601f106200014857805160ff191683800117855562000178565b8280016001018555821562000178579182015b82811115620001785782518255916020019190600101906200015b565b50620001869291506200018a565b5090565b5b808211156200018657600081556001016200018b565b600082601f830112620001b2578081fd5b81516001600160401b0380821115620001cf57620001cf62000317565b604051601f8301601f19908116603f01168101908282118183101715620001fa57620001fa62000317565b8160405283815260209250868385880101111562000216578485fd5b8491505b838210156200023957858201830151818301840152908201906200021a565b838211156200024a57848385830101525b9695505050505050565b60008060006060848603121562000269578283fd5b83516001600160a01b038116811462000280578384fd5b60208501519093506001600160401b03808211156200029d578384fd5b620002ab87838801620001a1565b93506040860151915080821115620002c1578283fd5b50620002d086828701620001a1565b9150509250925092565b600181811c90821680620002ef57607f821691505b602082108114156200031157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b60805160601c611d0f6200034960003960005050611d0f6000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c806370a08231116100c3578063ae2003221161007c578063ae200322146102ff578063b88d4fde14610307578063c87b56dd1461031a578063da8fbf2a1461032d578063e985e9c514610335578063f2fde38b1461037157600080fd5b806370a082311461028a578063715018a6146102ab5780638da5cb5b146102b357806395d89b41146102c45780639b046ed3146102cc578063a22cb465146102ec57600080fd5b806317bed2c51161011557806317bed2c51461022257806323b872dd146102375780633ccfd60b1461024a57806342842e0e146102525780635c975abb146102655780636352211e1461027757600080fd5b806301ffc9a71461015d57806306fdde03146101855780630750d2fb1461019a578063081812fc146101be578063095ea7b3146101e95780631656efc6146101fe575b600080fd5b61017061016b366004611823565b610384565b60405190151581526020015b60405180910390f35b61018d6103d6565b60405161017c9190611953565b6101706101a836600461185b565b60009081526008602052604090205460ff161590565b6101d16101cc36600461185b565b610468565b6040516001600160a01b03909116815260200161017c565b6101fc6101f73660046117fa565b610502565b005b61017061020c36600461185b565b60009081526009602052604090205460ff161590565b61022a610618565b60405161017c919061190b565b6101fc6102453660046116b0565b610697565b6101fc6106c8565b6101fc6102603660046116b0565b610725565b600654600160a01b900460ff16610170565b6101d161028536600461185b565b610740565b61029d610298366004611664565b6107b7565b60405190815260200161017c565b6101fc61083e565b6006546001600160a01b03166101d1565b61018d610874565b6102df6102da36600461185b565b610883565b60405161017c9190611a3e565b6101fc6102fa3660046117c0565b610c79565b6101fc610c84565b6101fc6103153660046116eb565b610cb6565b61018d61032836600461185b565b610cee565b6101fc610dd6565b61017061034336600461167e565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6101fc61037f366004611664565b610e08565b60006001600160e01b031982166380ac58cd60e01b14806103b557506001600160e01b03198216635b5e139f60e01b145b806103d057506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546103e590611c17565b80601f016020809104026020016040519081016040528092919081815260200182805461041190611c17565b801561045e5780601f106104335761010080835404028352916020019161045e565b820191906000526020600020905b81548152906001019060200180831161044157829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166104e65760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061050d82610740565b9050806001600160a01b0316836001600160a01b0316141561057b5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016104dd565b336001600160a01b038216148061059757506105978133610343565b6106095760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016104dd565b6106138383610ea3565b505050565b6060600a80548060200260200160405190810160405280929190818152602001828054801561045e57602002820191906000526020600020906000905b82829054906101000a900461ffff1661ffff16815260200190600201906020826001010492830192600103820291508084116106555790505050505050905090565b6106a13382610f11565b6106bd5760405162461bcd60e51b81526004016104dd906119ed565b610613838383611008565b6006546001600160a01b031633146106f25760405162461bcd60e51b81526004016104dd906119b8565b6040514790339082156108fc029083906000818181858888f19350505050158015610721573d6000803e3d6000fd5b5050565b61061383838360405180602001604052806000815250610cb6565b6000818152600260205260408120546001600160a01b0316806103d05760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016104dd565b60006001600160a01b0382166108225760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016104dd565b506001600160a01b031660009081526003602052604090205490565b6006546001600160a01b031633146108685760405162461bcd60e51b81526004016104dd906119b8565b61087260006111a8565b565b6060600180546103e590611c17565b604080516102c081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e08101829052610100810182905261012081018290526101408101829052610160810182905261018081018290526101a081018290526101c081018290526101e08101829052610200810182905261022081018290526102408101829052610260810182905261028081018290526102a08101919091526000828152600260205260409020546001600160a01b031661098c5760405162461bcd60e51b81526020600482015260116024820152703737b732bc34b9ba32b73a103a37b5b2b760791b60448201526064016104dd565b600060076000848152602001908152602001600020604051806040016040529081600082015481526020016001820180546109c690611c17565b80601f01602080910402602001604051908101604052809291908181526020018280546109f290611c17565b8015610a3f5780601f10610a1457610100808354040283529160200191610a3f565b820191906000526020600020905b815481529060010190602001808311610a2257829003601f168201915b5050509190925250508151919250506103ff1661ffff1682528051610a6890600a1c6103ff1690565b61ffff1660208301528051610a819060141c6103ff1690565b61ffff1660408301528051610a9a90601e1c6103ff1690565b61ffff1660608301528051610ab39060281c6103ff1690565b61ffff1660808301528051610acc9060321c6103ff1690565b61ffff1660a08301528051610ae590603c1c6103ff1690565b61ffff1660c08301528051610afe9060461c6103ff1690565b61ffff1660e08301528051610b179060501c6103ff1690565b61ffff166101008301528051610b3190605a1c6103ff1690565b61ffff166101208301528051610b4b9060641c6103ff1690565b61ffff166101408301528051610b6590606e1c6103ff1690565b61ffff166101608301528051610b7f9060781c6103ff1690565b61ffff166101808301528051610b999060821c6103ff1690565b61ffff166101a08301528051610bb390608c1c6103ff1690565b61ffff166101c08301528051610bcd9060961c6103ff1690565b61ffff166101e08301528051610be79060a01c6103ff1690565b61ffff166102008301528051610c019060aa1c6103ff1690565b61ffff166102208301528051610c1b9060b41c6103ff1690565b61ffff166102408301528051610c359060be1c6103ff1690565b61ffff166102608301528051610c4f9060c81c6103ff1690565b61ffff166102808301528051610c699060d21c6103ff1690565b61ffff166102a083015250919050565b6107213383836111fa565b6006546001600160a01b03163314610cae5760405162461bcd60e51b81526004016104dd906119b8565b6108726112c9565b610cc03383610f11565b610cdc5760405162461bcd60e51b81526004016104dd906119ed565b610ce884848484611366565b50505050565b6000818152600260205260409020546060906001600160a01b0316610d6d5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016104dd565b6000610d8460408051602081019091526000815290565b90506000815111610da45760405180602001604052806000815250610dcf565b80610dae84611399565b604051602001610dbf92919061189f565b6040516020818303038152906040525b9392505050565b6006546001600160a01b03163314610e005760405162461bcd60e51b81526004016104dd906119b8565b6108726114b3565b6006546001600160a01b03163314610e325760405162461bcd60e51b81526004016104dd906119b8565b6001600160a01b038116610e975760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104dd565b610ea0816111a8565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610ed882610740565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b0316610f8a5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016104dd565b6000610f9583610740565b9050806001600160a01b0316846001600160a01b03161480610fd05750836001600160a01b0316610fc584610468565b6001600160a01b0316145b8061100057506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b031661101b82610740565b6001600160a01b0316146110835760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b60648201526084016104dd565b6001600160a01b0382166110e55760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016104dd565b6110f0600082610ea3565b6001600160a01b0383166000908152600360205260408120805460019290611119908490611bd4565b90915550506001600160a01b0382166000908152600360205260408120805460019290611147908490611ba8565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b0316141561125c5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016104dd565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b600654600160a01b900460ff166113195760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016104dd565b6006805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b611371848484611008565b61137d8484848461153b565b610ce85760405162461bcd60e51b81526004016104dd90611966565b6060816113bd5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156113e757806113d181611c52565b91506113e09050600a83611bc0565b91506113c1565b60008167ffffffffffffffff81111561141057634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561143a576020820181803683370190505b5090505b84156110005761144f600183611bd4565b915061145c600a86611c6d565b611467906030611ba8565b60f81b81838151811061148a57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506114ac600a86611bc0565b945061143e565b600654600160a01b900460ff16156115005760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016104dd565b6006805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586113493390565b60006001600160a01b0384163b1561163d57604051630a85bd0160e11b81526001600160a01b0385169063150b7a029061157f9033908990889088906004016118ce565b602060405180830381600087803b15801561159957600080fd5b505af19250505080156115c9575060408051601f3d908101601f191682019092526115c69181019061183f565b60015b611623573d8080156115f7576040519150601f19603f3d011682016040523d82523d6000602084013e6115fc565b606091505b50805161161b5760405162461bcd60e51b81526004016104dd90611966565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611000565b506001949350505050565b80356001600160a01b038116811461165f57600080fd5b919050565b600060208284031215611675578081fd5b610dcf82611648565b60008060408385031215611690578081fd5b61169983611648565b91506116a760208401611648565b90509250929050565b6000806000606084860312156116c4578081fd5b6116cd84611648565b92506116db60208501611648565b9150604084013590509250925092565b60008060008060808587031215611700578081fd5b61170985611648565b935061171760208601611648565b925060408501359150606085013567ffffffffffffffff8082111561173a578283fd5b818701915087601f83011261174d578283fd5b81358181111561175f5761175f611cad565b604051601f8201601f19908116603f0116810190838211818310171561178757611787611cad565b816040528281528a602084870101111561179f578586fd5b82602086016020830137918201602001949094529598949750929550505050565b600080604083850312156117d2578182fd5b6117db83611648565b9150602083013580151581146117ef578182fd5b809150509250929050565b6000806040838503121561180c578182fd5b61181583611648565b946020939093013593505050565b600060208284031215611834578081fd5b8135610dcf81611cc3565b600060208284031215611850578081fd5b8151610dcf81611cc3565b60006020828403121561186c578081fd5b5035919050565b6000815180845261188b816020860160208601611beb565b601f01601f19169290920160200192915050565b600083516118b1818460208801611beb565b8351908301906118c5818360208801611beb565b01949350505050565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061190190830184611873565b9695505050505050565b6020808252825182820181905260009190848201906040850190845b8181101561194757835161ffff1683529284019291840191600101611927565b50909695505050505050565b602081526000610dcf6020830184611873565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b815161ffff1681526102c081016020830151611a60602084018261ffff169052565b506040830151611a76604084018261ffff169052565b506060830151611a8c606084018261ffff169052565b506080830151611aa2608084018261ffff169052565b5060a0830151611ab860a084018261ffff169052565b5060c0830151611ace60c084018261ffff169052565b5060e0830151611ae460e084018261ffff169052565b506101008381015161ffff90811691840191909152610120808501518216908401526101408085015182169084015261016080850151821690840152610180808501518216908401526101a0808501518216908401526101c0808501518216908401526101e08085015182169084015261020080850151821690840152610220808501518216908401526102408085015182169084015261026080850151821690840152610280808501518216908401526102a09384015116929091019190915290565b60008219821115611bbb57611bbb611c81565b500190565b600082611bcf57611bcf611c97565b500490565b600082821015611be657611be6611c81565b500390565b60005b83811015611c06578181015183820152602001611bee565b83811115610ce85750506000910152565b600181811c90821680611c2b57607f821691505b60208210811415611c4c57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415611c6657611c66611c81565b5060010190565b600082611c7c57611c7c611c97565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b031981168114610ea057600080fdfea26469706673582212203d699093de95d69b5cade5039f57370ca817fba12005cd5a5d0ce964163f165d64736f6c63430008040033";

export class NiftyLeagueCharacter__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    nftlAddress: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NiftyLeagueCharacter> {
    return super.deploy(
      nftlAddress,
      name,
      symbol,
      overrides || {}
    ) as Promise<NiftyLeagueCharacter>;
  }
  getDeployTransaction(
    nftlAddress: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      nftlAddress,
      name,
      symbol,
      overrides || {}
    );
  }
  attach(address: string): NiftyLeagueCharacter {
    return super.attach(address) as NiftyLeagueCharacter;
  }
  connect(signer: Signer): NiftyLeagueCharacter__factory {
    return super.connect(signer) as NiftyLeagueCharacter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NiftyLeagueCharacterInterface {
    return new utils.Interface(_abi) as NiftyLeagueCharacterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NiftyLeagueCharacter {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as NiftyLeagueCharacter;
  }
}