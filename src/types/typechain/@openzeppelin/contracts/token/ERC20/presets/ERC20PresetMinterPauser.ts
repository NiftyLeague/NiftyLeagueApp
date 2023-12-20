/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from 'ethers6';
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from '../../../../../common';

export interface ERC20PresetMinterPauserInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'DEFAULT_ADMIN_ROLE'
      | 'MINTER_ROLE'
      | 'PAUSER_ROLE'
      | 'allowance'
      | 'approve'
      | 'balanceOf'
      | 'burn'
      | 'burnFrom'
      | 'decimals'
      | 'decreaseAllowance'
      | 'getRoleAdmin'
      | 'getRoleMember'
      | 'getRoleMemberCount'
      | 'grantRole'
      | 'hasRole'
      | 'increaseAllowance'
      | 'mint'
      | 'name'
      | 'pause'
      | 'paused'
      | 'renounceRole'
      | 'revokeRole'
      | 'supportsInterface'
      | 'symbol'
      | 'totalSupply'
      | 'transfer'
      | 'transferFrom'
      | 'unpause',
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | 'Approval'
      | 'Paused'
      | 'RoleAdminChanged'
      | 'RoleGranted'
      | 'RoleRevoked'
      | 'Transfer'
      | 'Unpaused',
  ): EventFragment;

  encodeFunctionData(
    functionFragment: 'DEFAULT_ADMIN_ROLE',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'MINTER_ROLE',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'PAUSER_ROLE',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'allowance',
    values: [AddressLike, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'approve',
    values: [AddressLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'balanceOf',
    values: [AddressLike],
  ): string;
  encodeFunctionData(functionFragment: 'burn', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'burnFrom',
    values: [AddressLike, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: 'decimals', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'decreaseAllowance',
    values: [AddressLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'getRoleAdmin',
    values: [BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'getRoleMember',
    values: [BytesLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'getRoleMemberCount',
    values: [BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'grantRole',
    values: [BytesLike, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'hasRole',
    values: [BytesLike, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'increaseAllowance',
    values: [AddressLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'mint',
    values: [AddressLike, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: 'name', values?: undefined): string;
  encodeFunctionData(functionFragment: 'pause', values?: undefined): string;
  encodeFunctionData(functionFragment: 'paused', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'renounceRole',
    values: [BytesLike, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'revokeRole',
    values: [BytesLike, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'supportsInterface',
    values: [BytesLike],
  ): string;
  encodeFunctionData(functionFragment: 'symbol', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'totalSupply',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'transfer',
    values: [AddressLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'transferFrom',
    values: [AddressLike, AddressLike, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: 'unpause', values?: undefined): string;

  decodeFunctionResult(
    functionFragment: 'DEFAULT_ADMIN_ROLE',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'MINTER_ROLE',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'PAUSER_ROLE',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'allowance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'approve', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'burn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'burnFrom', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'decimals', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'decreaseAllowance',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'getRoleAdmin',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'getRoleMember',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'getRoleMemberCount',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'grantRole', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'hasRole', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'increaseAllowance',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'mint', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'pause', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'paused', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'renounceRole',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'revokeRole', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'supportsInterface',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'symbol', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'totalSupply',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'transfer', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'transferFrom',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'unpause', data: BytesLike): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    owner: AddressLike,
    spender: AddressLike,
    value: BigNumberish,
  ];
  export type OutputTuple = [owner: string, spender: string, value: bigint];
  export interface OutputObject {
    owner: string;
    spender: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleAdminChangedEvent {
  export type InputTuple = [
    role: BytesLike,
    previousAdminRole: BytesLike,
    newAdminRole: BytesLike,
  ];
  export type OutputTuple = [
    role: string,
    previousAdminRole: string,
    newAdminRole: string,
  ];
  export interface OutputObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleGrantedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike,
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleRevokedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike,
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    from: AddressLike,
    to: AddressLike,
    value: BigNumberish,
  ];
  export type OutputTuple = [from: string, to: string, value: bigint];
  export interface OutputObject {
    from: string;
    to: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ERC20PresetMinterPauser extends BaseContract {
  connect(runner?: ContractRunner | null): ERC20PresetMinterPauser;
  waitForDeployment(): Promise<this>;

  interface: ERC20PresetMinterPauserInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent,
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent,
  ): Promise<this>;

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], 'view'>;

  MINTER_ROLE: TypedContractMethod<[], [string], 'view'>;

  PAUSER_ROLE: TypedContractMethod<[], [string], 'view'>;

  allowance: TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    'view'
  >;

  approve: TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    'nonpayable'
  >;

  balanceOf: TypedContractMethod<[account: AddressLike], [bigint], 'view'>;

  burn: TypedContractMethod<[amount: BigNumberish], [void], 'nonpayable'>;

  burnFrom: TypedContractMethod<
    [account: AddressLike, amount: BigNumberish],
    [void],
    'nonpayable'
  >;

  decimals: TypedContractMethod<[], [bigint], 'view'>;

  decreaseAllowance: TypedContractMethod<
    [spender: AddressLike, subtractedValue: BigNumberish],
    [boolean],
    'nonpayable'
  >;

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], 'view'>;

  getRoleMember: TypedContractMethod<
    [role: BytesLike, index: BigNumberish],
    [string],
    'view'
  >;

  getRoleMemberCount: TypedContractMethod<[role: BytesLike], [bigint], 'view'>;

  grantRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    'nonpayable'
  >;

  hasRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    'view'
  >;

  increaseAllowance: TypedContractMethod<
    [spender: AddressLike, addedValue: BigNumberish],
    [boolean],
    'nonpayable'
  >;

  mint: TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [void],
    'nonpayable'
  >;

  name: TypedContractMethod<[], [string], 'view'>;

  pause: TypedContractMethod<[], [void], 'nonpayable'>;

  paused: TypedContractMethod<[], [boolean], 'view'>;

  renounceRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    'nonpayable'
  >;

  revokeRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    'nonpayable'
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    'view'
  >;

  symbol: TypedContractMethod<[], [string], 'view'>;

  totalSupply: TypedContractMethod<[], [bigint], 'view'>;

  transfer: TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [boolean],
    'nonpayable'
  >;

  transferFrom: TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [boolean],
    'nonpayable'
  >;

  unpause: TypedContractMethod<[], [void], 'nonpayable'>;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'DEFAULT_ADMIN_ROLE',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'MINTER_ROLE',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'PAUSER_ROLE',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'allowance',
  ): TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    'view'
  >;
  getFunction(
    nameOrSignature: 'approve',
  ): TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'balanceOf',
  ): TypedContractMethod<[account: AddressLike], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'burn',
  ): TypedContractMethod<[amount: BigNumberish], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'burnFrom',
  ): TypedContractMethod<
    [account: AddressLike, amount: BigNumberish],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'decimals',
  ): TypedContractMethod<[], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'decreaseAllowance',
  ): TypedContractMethod<
    [spender: AddressLike, subtractedValue: BigNumberish],
    [boolean],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'getRoleAdmin',
  ): TypedContractMethod<[role: BytesLike], [string], 'view'>;
  getFunction(
    nameOrSignature: 'getRoleMember',
  ): TypedContractMethod<
    [role: BytesLike, index: BigNumberish],
    [string],
    'view'
  >;
  getFunction(
    nameOrSignature: 'getRoleMemberCount',
  ): TypedContractMethod<[role: BytesLike], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'grantRole',
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'hasRole',
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    'view'
  >;
  getFunction(
    nameOrSignature: 'increaseAllowance',
  ): TypedContractMethod<
    [spender: AddressLike, addedValue: BigNumberish],
    [boolean],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'mint',
  ): TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'name',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'pause',
  ): TypedContractMethod<[], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'paused',
  ): TypedContractMethod<[], [boolean], 'view'>;
  getFunction(
    nameOrSignature: 'renounceRole',
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'revokeRole',
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'supportsInterface',
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], 'view'>;
  getFunction(
    nameOrSignature: 'symbol',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'totalSupply',
  ): TypedContractMethod<[], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'transfer',
  ): TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [boolean],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'transferFrom',
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [boolean],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'unpause',
  ): TypedContractMethod<[], [void], 'nonpayable'>;

  getEvent(
    key: 'Approval',
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: 'Paused',
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: 'RoleAdminChanged',
  ): TypedContractEvent<
    RoleAdminChangedEvent.InputTuple,
    RoleAdminChangedEvent.OutputTuple,
    RoleAdminChangedEvent.OutputObject
  >;
  getEvent(
    key: 'RoleGranted',
  ): TypedContractEvent<
    RoleGrantedEvent.InputTuple,
    RoleGrantedEvent.OutputTuple,
    RoleGrantedEvent.OutputObject
  >;
  getEvent(
    key: 'RoleRevoked',
  ): TypedContractEvent<
    RoleRevokedEvent.InputTuple,
    RoleRevokedEvent.OutputTuple,
    RoleRevokedEvent.OutputObject
  >;
  getEvent(
    key: 'Transfer',
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;
  getEvent(
    key: 'Unpaused',
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;

  filters: {
    'Approval(address,address,uint256)': TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    'Paused(address)': TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;
    Paused: TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;

    'RoleAdminChanged(bytes32,bytes32,bytes32)': TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;
    RoleAdminChanged: TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;

    'RoleGranted(bytes32,address,address)': TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;
    RoleGranted: TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;

    'RoleRevoked(bytes32,address,address)': TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
    RoleRevoked: TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;

    'Transfer(address,address,uint256)': TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;

    'Unpaused(address)': TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
    Unpaused: TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
  };
}
