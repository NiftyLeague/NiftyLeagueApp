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
} from 'ethers';
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from '../../common';

export interface HydraDistributorInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'claimRandomHydra'
      | 'depositHydra'
      | 'getHydraCount'
      | 'getHydraTokenIds'
      | 'hydraTokenIds'
      | 'initialize'
      | 'niftyDegen'
      | 'niftyWallet'
      | 'onERC721Received'
      | 'owner'
      | 'pause'
      | 'paused'
      | 'renounceOwnership'
      | 'transferOwnership'
      | 'unpause'
      | 'updateNiftyDegen'
      | 'updateNiftyWallet'
      | 'withdrawAllHydra',
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | 'HydraClaimed'
      | 'Initialized'
      | 'NiftyDegenSet'
      | 'NiftyWalletSet'
      | 'OwnershipTransferred'
      | 'Paused'
      | 'Unpaused',
  ): EventFragment;

  encodeFunctionData(
    functionFragment: 'claimRandomHydra',
    values: [BigNumberish[]],
  ): string;
  encodeFunctionData(
    functionFragment: 'depositHydra',
    values: [BigNumberish[]],
  ): string;
  encodeFunctionData(
    functionFragment: 'getHydraCount',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'getHydraTokenIds',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'hydraTokenIds',
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'initialize',
    values: [AddressLike, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'niftyDegen',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'niftyWallet',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'onERC721Received',
    values: [AddressLike, AddressLike, BigNumberish, BytesLike],
  ): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'pause', values?: undefined): string;
  encodeFunctionData(functionFragment: 'paused', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'renounceOwnership',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [AddressLike],
  ): string;
  encodeFunctionData(functionFragment: 'unpause', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'updateNiftyDegen',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'updateNiftyWallet',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'withdrawAllHydra',
    values: [AddressLike],
  ): string;

  decodeFunctionResult(
    functionFragment: 'claimRandomHydra',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'depositHydra',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'getHydraCount',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'getHydraTokenIds',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'hydraTokenIds',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'niftyDegen', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'niftyWallet',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'onERC721Received',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'pause', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'paused', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'renounceOwnership',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'transferOwnership',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'unpause', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'updateNiftyDegen',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'updateNiftyWallet',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'withdrawAllHydra',
    data: BytesLike,
  ): Result;
}

export namespace HydraClaimedEvent {
  export type InputTuple = [
    user: AddressLike,
    tokenIdsBurned: BigNumberish[],
    hydraTokenId: BigNumberish,
  ];
  export type OutputTuple = [
    user: string,
    tokenIdsBurned: bigint[],
    hydraTokenId: bigint,
  ];
  export interface OutputObject {
    user: string;
    tokenIdsBurned: bigint[];
    hydraTokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NiftyDegenSetEvent {
  export type InputTuple = [niftyDegen: AddressLike];
  export type OutputTuple = [niftyDegen: string];
  export interface OutputObject {
    niftyDegen: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NiftyWalletSetEvent {
  export type InputTuple = [niftyWallet: AddressLike];
  export type OutputTuple = [niftyWallet: string];
  export interface OutputObject {
    niftyWallet: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
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

export interface HydraDistributor extends BaseContract {
  connect(runner?: ContractRunner | null): HydraDistributor;
  waitForDeployment(): Promise<this>;

  interface: HydraDistributorInterface;

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

  claimRandomHydra: TypedContractMethod<
    [_degenTokenIdList: BigNumberish[]],
    [void],
    'nonpayable'
  >;

  depositHydra: TypedContractMethod<
    [_hydraTokenIdList: BigNumberish[]],
    [void],
    'nonpayable'
  >;

  getHydraCount: TypedContractMethod<[], [bigint], 'view'>;

  getHydraTokenIds: TypedContractMethod<[], [bigint[]], 'view'>;

  hydraTokenIds: TypedContractMethod<[arg0: BigNumberish], [bigint], 'view'>;

  initialize: TypedContractMethod<
    [_niftyDegen: AddressLike, _niftyWallet: AddressLike],
    [void],
    'nonpayable'
  >;

  niftyDegen: TypedContractMethod<[], [string], 'view'>;

  niftyWallet: TypedContractMethod<[], [string], 'view'>;

  onERC721Received: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish, arg3: BytesLike],
    [string],
    'nonpayable'
  >;

  owner: TypedContractMethod<[], [string], 'view'>;

  pause: TypedContractMethod<[], [void], 'nonpayable'>;

  paused: TypedContractMethod<[], [boolean], 'view'>;

  renounceOwnership: TypedContractMethod<[], [void], 'nonpayable'>;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    'nonpayable'
  >;

  unpause: TypedContractMethod<[], [void], 'nonpayable'>;

  updateNiftyDegen: TypedContractMethod<
    [_niftyDegen: AddressLike],
    [void],
    'nonpayable'
  >;

  updateNiftyWallet: TypedContractMethod<
    [_niftyWallet: AddressLike],
    [void],
    'nonpayable'
  >;

  withdrawAllHydra: TypedContractMethod<
    [_to: AddressLike],
    [void],
    'nonpayable'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'claimRandomHydra',
  ): TypedContractMethod<
    [_degenTokenIdList: BigNumberish[]],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'depositHydra',
  ): TypedContractMethod<
    [_hydraTokenIdList: BigNumberish[]],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'getHydraCount',
  ): TypedContractMethod<[], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'getHydraTokenIds',
  ): TypedContractMethod<[], [bigint[]], 'view'>;
  getFunction(
    nameOrSignature: 'hydraTokenIds',
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'initialize',
  ): TypedContractMethod<
    [_niftyDegen: AddressLike, _niftyWallet: AddressLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'niftyDegen',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'niftyWallet',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'onERC721Received',
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish, arg3: BytesLike],
    [string],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'owner',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'pause',
  ): TypedContractMethod<[], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'paused',
  ): TypedContractMethod<[], [boolean], 'view'>;
  getFunction(
    nameOrSignature: 'renounceOwnership',
  ): TypedContractMethod<[], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'transferOwnership',
  ): TypedContractMethod<[newOwner: AddressLike], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'unpause',
  ): TypedContractMethod<[], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'updateNiftyDegen',
  ): TypedContractMethod<[_niftyDegen: AddressLike], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'updateNiftyWallet',
  ): TypedContractMethod<[_niftyWallet: AddressLike], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'withdrawAllHydra',
  ): TypedContractMethod<[_to: AddressLike], [void], 'nonpayable'>;

  getEvent(
    key: 'HydraClaimed',
  ): TypedContractEvent<
    HydraClaimedEvent.InputTuple,
    HydraClaimedEvent.OutputTuple,
    HydraClaimedEvent.OutputObject
  >;
  getEvent(
    key: 'Initialized',
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: 'NiftyDegenSet',
  ): TypedContractEvent<
    NiftyDegenSetEvent.InputTuple,
    NiftyDegenSetEvent.OutputTuple,
    NiftyDegenSetEvent.OutputObject
  >;
  getEvent(
    key: 'NiftyWalletSet',
  ): TypedContractEvent<
    NiftyWalletSetEvent.InputTuple,
    NiftyWalletSetEvent.OutputTuple,
    NiftyWalletSetEvent.OutputObject
  >;
  getEvent(
    key: 'OwnershipTransferred',
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: 'Paused',
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: 'Unpaused',
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;

  filters: {
    'HydraClaimed(address,uint256[],uint256)': TypedContractEvent<
      HydraClaimedEvent.InputTuple,
      HydraClaimedEvent.OutputTuple,
      HydraClaimedEvent.OutputObject
    >;
    HydraClaimed: TypedContractEvent<
      HydraClaimedEvent.InputTuple,
      HydraClaimedEvent.OutputTuple,
      HydraClaimedEvent.OutputObject
    >;

    'Initialized(uint8)': TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    'NiftyDegenSet(address)': TypedContractEvent<
      NiftyDegenSetEvent.InputTuple,
      NiftyDegenSetEvent.OutputTuple,
      NiftyDegenSetEvent.OutputObject
    >;
    NiftyDegenSet: TypedContractEvent<
      NiftyDegenSetEvent.InputTuple,
      NiftyDegenSetEvent.OutputTuple,
      NiftyDegenSetEvent.OutputObject
    >;

    'NiftyWalletSet(address)': TypedContractEvent<
      NiftyWalletSetEvent.InputTuple,
      NiftyWalletSetEvent.OutputTuple,
      NiftyWalletSetEvent.OutputObject
    >;
    NiftyWalletSet: TypedContractEvent<
      NiftyWalletSetEvent.InputTuple,
      NiftyWalletSetEvent.OutputTuple,
      NiftyWalletSetEvent.OutputObject
    >;

    'OwnershipTransferred(address,address)': TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
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
