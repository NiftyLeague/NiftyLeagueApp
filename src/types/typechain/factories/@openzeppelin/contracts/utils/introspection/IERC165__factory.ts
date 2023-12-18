/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from 'ethers';
import type {
  IERC165,
  IERC165Interface,
} from '../../../../../@openzeppelin/contracts/utils/introspection/IERC165';

const _abi = [
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
] as const;

export class IERC165__factory {
  static readonly abi = _abi;
  static createInterface(): IERC165Interface {
    return new Interface(_abi) as IERC165Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): IERC165 {
    return new Contract(address, _abi, runner) as unknown as IERC165;
  }
}
