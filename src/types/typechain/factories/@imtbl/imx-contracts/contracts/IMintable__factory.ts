/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from 'ethers6';
import type {
  IMintable,
  IMintableInterface,
} from '../../../../@imtbl/imx-contracts/contracts/IMintable';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'mintingBlob',
        type: 'bytes',
      },
    ],
    name: 'mintFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export class IMintable__factory {
  static readonly abi = _abi;
  static createInterface(): IMintableInterface {
    return new Interface(_abi) as IMintableInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IMintable {
    return new Contract(address, _abi, runner) as unknown as IMintable;
  }
}
