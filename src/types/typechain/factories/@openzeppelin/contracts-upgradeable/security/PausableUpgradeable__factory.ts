/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from 'ethers';
import type {
  PausableUpgradeable,
  PausableUpgradeableInterface,
} from '../../../../@openzeppelin/contracts-upgradeable/security/PausableUpgradeable';

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
] as const;

export class PausableUpgradeable__factory {
  static readonly abi = _abi;
  static createInterface(): PausableUpgradeableInterface {
    return new Interface(_abi) as PausableUpgradeableInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null,
  ): PausableUpgradeable {
    return new Contract(
      address,
      _abi,
      runner,
    ) as unknown as PausableUpgradeable;
  }
}
