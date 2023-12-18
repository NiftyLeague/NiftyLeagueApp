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
} from '../../../../../common';

export interface VRFCoordinatorV2MockInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'BASE_FEE'
      | 'GAS_PRICE_LINK'
      | 'MAX_CONSUMERS'
      | 'acceptSubscriptionOwnerTransfer'
      | 'addConsumer'
      | 'cancelSubscription'
      | 'consumerIsAdded'
      | 'createSubscription'
      | 'fulfillRandomWords'
      | 'fulfillRandomWordsWithOverride'
      | 'fundSubscription'
      | 'getConfig'
      | 'getFallbackWeiPerUnitLink'
      | 'getFeeConfig'
      | 'getRequestConfig'
      | 'getSubscription'
      | 'pendingRequestExists'
      | 'removeConsumer'
      | 'requestRandomWords'
      | 'requestSubscriptionOwnerTransfer',
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | 'ConsumerAdded'
      | 'ConsumerRemoved'
      | 'RandomWordsFulfilled'
      | 'RandomWordsRequested'
      | 'SubscriptionCanceled'
      | 'SubscriptionCreated'
      | 'SubscriptionFunded',
  ): EventFragment;

  encodeFunctionData(functionFragment: 'BASE_FEE', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'GAS_PRICE_LINK',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'MAX_CONSUMERS',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'acceptSubscriptionOwnerTransfer',
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'addConsumer',
    values: [BigNumberish, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'cancelSubscription',
    values: [BigNumberish, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'consumerIsAdded',
    values: [BigNumberish, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'createSubscription',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'fulfillRandomWords',
    values: [BigNumberish, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'fulfillRandomWordsWithOverride',
    values: [BigNumberish, AddressLike, BigNumberish[]],
  ): string;
  encodeFunctionData(
    functionFragment: 'fundSubscription',
    values: [BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: 'getConfig', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'getFallbackWeiPerUnitLink',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'getFeeConfig',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'getRequestConfig',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'getSubscription',
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'pendingRequestExists',
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'removeConsumer',
    values: [BigNumberish, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'requestRandomWords',
    values: [BytesLike, BigNumberish, BigNumberish, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'requestSubscriptionOwnerTransfer',
    values: [BigNumberish, AddressLike],
  ): string;

  decodeFunctionResult(functionFragment: 'BASE_FEE', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'GAS_PRICE_LINK',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'MAX_CONSUMERS',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'acceptSubscriptionOwnerTransfer',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'addConsumer',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'cancelSubscription',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'consumerIsAdded',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'createSubscription',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'fulfillRandomWords',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'fulfillRandomWordsWithOverride',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'fundSubscription',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'getConfig', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'getFallbackWeiPerUnitLink',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'getFeeConfig',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'getRequestConfig',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'getSubscription',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'pendingRequestExists',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'removeConsumer',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'requestRandomWords',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'requestSubscriptionOwnerTransfer',
    data: BytesLike,
  ): Result;
}

export namespace ConsumerAddedEvent {
  export type InputTuple = [subId: BigNumberish, consumer: AddressLike];
  export type OutputTuple = [subId: bigint, consumer: string];
  export interface OutputObject {
    subId: bigint;
    consumer: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ConsumerRemovedEvent {
  export type InputTuple = [subId: BigNumberish, consumer: AddressLike];
  export type OutputTuple = [subId: bigint, consumer: string];
  export interface OutputObject {
    subId: bigint;
    consumer: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RandomWordsFulfilledEvent {
  export type InputTuple = [
    requestId: BigNumberish,
    outputSeed: BigNumberish,
    payment: BigNumberish,
    success: boolean,
  ];
  export type OutputTuple = [
    requestId: bigint,
    outputSeed: bigint,
    payment: bigint,
    success: boolean,
  ];
  export interface OutputObject {
    requestId: bigint;
    outputSeed: bigint;
    payment: bigint;
    success: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RandomWordsRequestedEvent {
  export type InputTuple = [
    keyHash: BytesLike,
    requestId: BigNumberish,
    preSeed: BigNumberish,
    subId: BigNumberish,
    minimumRequestConfirmations: BigNumberish,
    callbackGasLimit: BigNumberish,
    numWords: BigNumberish,
    sender: AddressLike,
  ];
  export type OutputTuple = [
    keyHash: string,
    requestId: bigint,
    preSeed: bigint,
    subId: bigint,
    minimumRequestConfirmations: bigint,
    callbackGasLimit: bigint,
    numWords: bigint,
    sender: string,
  ];
  export interface OutputObject {
    keyHash: string;
    requestId: bigint;
    preSeed: bigint;
    subId: bigint;
    minimumRequestConfirmations: bigint;
    callbackGasLimit: bigint;
    numWords: bigint;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SubscriptionCanceledEvent {
  export type InputTuple = [
    subId: BigNumberish,
    to: AddressLike,
    amount: BigNumberish,
  ];
  export type OutputTuple = [subId: bigint, to: string, amount: bigint];
  export interface OutputObject {
    subId: bigint;
    to: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SubscriptionCreatedEvent {
  export type InputTuple = [subId: BigNumberish, owner: AddressLike];
  export type OutputTuple = [subId: bigint, owner: string];
  export interface OutputObject {
    subId: bigint;
    owner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SubscriptionFundedEvent {
  export type InputTuple = [
    subId: BigNumberish,
    oldBalance: BigNumberish,
    newBalance: BigNumberish,
  ];
  export type OutputTuple = [
    subId: bigint,
    oldBalance: bigint,
    newBalance: bigint,
  ];
  export interface OutputObject {
    subId: bigint;
    oldBalance: bigint;
    newBalance: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface VRFCoordinatorV2Mock extends BaseContract {
  connect(runner?: ContractRunner | null): VRFCoordinatorV2Mock;
  waitForDeployment(): Promise<this>;

  interface: VRFCoordinatorV2MockInterface;

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

  BASE_FEE: TypedContractMethod<[], [bigint], 'view'>;

  GAS_PRICE_LINK: TypedContractMethod<[], [bigint], 'view'>;

  MAX_CONSUMERS: TypedContractMethod<[], [bigint], 'view'>;

  acceptSubscriptionOwnerTransfer: TypedContractMethod<
    [_subId: BigNumberish],
    [void],
    'view'
  >;

  addConsumer: TypedContractMethod<
    [_subId: BigNumberish, _consumer: AddressLike],
    [void],
    'nonpayable'
  >;

  cancelSubscription: TypedContractMethod<
    [_subId: BigNumberish, _to: AddressLike],
    [void],
    'nonpayable'
  >;

  consumerIsAdded: TypedContractMethod<
    [_subId: BigNumberish, _consumer: AddressLike],
    [boolean],
    'view'
  >;

  createSubscription: TypedContractMethod<[], [bigint], 'nonpayable'>;

  fulfillRandomWords: TypedContractMethod<
    [_requestId: BigNumberish, _consumer: AddressLike],
    [void],
    'nonpayable'
  >;

  fulfillRandomWordsWithOverride: TypedContractMethod<
    [_requestId: BigNumberish, _consumer: AddressLike, _words: BigNumberish[]],
    [void],
    'nonpayable'
  >;

  fundSubscription: TypedContractMethod<
    [_subId: BigNumberish, _amount: BigNumberish],
    [void],
    'nonpayable'
  >;

  getConfig: TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint] & {
        minimumRequestConfirmations: bigint;
        maxGasLimit: bigint;
        stalenessSeconds: bigint;
        gasAfterPaymentCalculation: bigint;
      },
    ],
    'view'
  >;

  getFallbackWeiPerUnitLink: TypedContractMethod<[], [bigint], 'view'>;

  getFeeConfig: TypedContractMethod<
    [],
    [
      [
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
      ] & {
        fulfillmentFlatFeeLinkPPMTier1: bigint;
        fulfillmentFlatFeeLinkPPMTier2: bigint;
        fulfillmentFlatFeeLinkPPMTier3: bigint;
        fulfillmentFlatFeeLinkPPMTier4: bigint;
        fulfillmentFlatFeeLinkPPMTier5: bigint;
        reqsForTier2: bigint;
        reqsForTier3: bigint;
        reqsForTier4: bigint;
        reqsForTier5: bigint;
      },
    ],
    'view'
  >;

  getRequestConfig: TypedContractMethod<
    [],
    [[bigint, bigint, string[]]],
    'view'
  >;

  getSubscription: TypedContractMethod<
    [_subId: BigNumberish],
    [
      [bigint, bigint, string, string[]] & {
        balance: bigint;
        reqCount: bigint;
        owner: string;
        consumers: string[];
      },
    ],
    'view'
  >;

  pendingRequestExists: TypedContractMethod<
    [subId: BigNumberish],
    [boolean],
    'view'
  >;

  removeConsumer: TypedContractMethod<
    [_subId: BigNumberish, _consumer: AddressLike],
    [void],
    'nonpayable'
  >;

  requestRandomWords: TypedContractMethod<
    [
      _keyHash: BytesLike,
      _subId: BigNumberish,
      _minimumRequestConfirmations: BigNumberish,
      _callbackGasLimit: BigNumberish,
      _numWords: BigNumberish,
    ],
    [bigint],
    'nonpayable'
  >;

  requestSubscriptionOwnerTransfer: TypedContractMethod<
    [_subId: BigNumberish, _newOwner: AddressLike],
    [void],
    'view'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'BASE_FEE',
  ): TypedContractMethod<[], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'GAS_PRICE_LINK',
  ): TypedContractMethod<[], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'MAX_CONSUMERS',
  ): TypedContractMethod<[], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'acceptSubscriptionOwnerTransfer',
  ): TypedContractMethod<[_subId: BigNumberish], [void], 'view'>;
  getFunction(
    nameOrSignature: 'addConsumer',
  ): TypedContractMethod<
    [_subId: BigNumberish, _consumer: AddressLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'cancelSubscription',
  ): TypedContractMethod<
    [_subId: BigNumberish, _to: AddressLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'consumerIsAdded',
  ): TypedContractMethod<
    [_subId: BigNumberish, _consumer: AddressLike],
    [boolean],
    'view'
  >;
  getFunction(
    nameOrSignature: 'createSubscription',
  ): TypedContractMethod<[], [bigint], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'fulfillRandomWords',
  ): TypedContractMethod<
    [_requestId: BigNumberish, _consumer: AddressLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'fulfillRandomWordsWithOverride',
  ): TypedContractMethod<
    [_requestId: BigNumberish, _consumer: AddressLike, _words: BigNumberish[]],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'fundSubscription',
  ): TypedContractMethod<
    [_subId: BigNumberish, _amount: BigNumberish],
    [void],
    'nonpayable'
  >;
  getFunction(nameOrSignature: 'getConfig'): TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint] & {
        minimumRequestConfirmations: bigint;
        maxGasLimit: bigint;
        stalenessSeconds: bigint;
        gasAfterPaymentCalculation: bigint;
      },
    ],
    'view'
  >;
  getFunction(
    nameOrSignature: 'getFallbackWeiPerUnitLink',
  ): TypedContractMethod<[], [bigint], 'view'>;
  getFunction(nameOrSignature: 'getFeeConfig'): TypedContractMethod<
    [],
    [
      [
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
      ] & {
        fulfillmentFlatFeeLinkPPMTier1: bigint;
        fulfillmentFlatFeeLinkPPMTier2: bigint;
        fulfillmentFlatFeeLinkPPMTier3: bigint;
        fulfillmentFlatFeeLinkPPMTier4: bigint;
        fulfillmentFlatFeeLinkPPMTier5: bigint;
        reqsForTier2: bigint;
        reqsForTier3: bigint;
        reqsForTier4: bigint;
        reqsForTier5: bigint;
      },
    ],
    'view'
  >;
  getFunction(
    nameOrSignature: 'getRequestConfig',
  ): TypedContractMethod<[], [[bigint, bigint, string[]]], 'view'>;
  getFunction(nameOrSignature: 'getSubscription'): TypedContractMethod<
    [_subId: BigNumberish],
    [
      [bigint, bigint, string, string[]] & {
        balance: bigint;
        reqCount: bigint;
        owner: string;
        consumers: string[];
      },
    ],
    'view'
  >;
  getFunction(
    nameOrSignature: 'pendingRequestExists',
  ): TypedContractMethod<[subId: BigNumberish], [boolean], 'view'>;
  getFunction(
    nameOrSignature: 'removeConsumer',
  ): TypedContractMethod<
    [_subId: BigNumberish, _consumer: AddressLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'requestRandomWords',
  ): TypedContractMethod<
    [
      _keyHash: BytesLike,
      _subId: BigNumberish,
      _minimumRequestConfirmations: BigNumberish,
      _callbackGasLimit: BigNumberish,
      _numWords: BigNumberish,
    ],
    [bigint],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'requestSubscriptionOwnerTransfer',
  ): TypedContractMethod<
    [_subId: BigNumberish, _newOwner: AddressLike],
    [void],
    'view'
  >;

  getEvent(
    key: 'ConsumerAdded',
  ): TypedContractEvent<
    ConsumerAddedEvent.InputTuple,
    ConsumerAddedEvent.OutputTuple,
    ConsumerAddedEvent.OutputObject
  >;
  getEvent(
    key: 'ConsumerRemoved',
  ): TypedContractEvent<
    ConsumerRemovedEvent.InputTuple,
    ConsumerRemovedEvent.OutputTuple,
    ConsumerRemovedEvent.OutputObject
  >;
  getEvent(
    key: 'RandomWordsFulfilled',
  ): TypedContractEvent<
    RandomWordsFulfilledEvent.InputTuple,
    RandomWordsFulfilledEvent.OutputTuple,
    RandomWordsFulfilledEvent.OutputObject
  >;
  getEvent(
    key: 'RandomWordsRequested',
  ): TypedContractEvent<
    RandomWordsRequestedEvent.InputTuple,
    RandomWordsRequestedEvent.OutputTuple,
    RandomWordsRequestedEvent.OutputObject
  >;
  getEvent(
    key: 'SubscriptionCanceled',
  ): TypedContractEvent<
    SubscriptionCanceledEvent.InputTuple,
    SubscriptionCanceledEvent.OutputTuple,
    SubscriptionCanceledEvent.OutputObject
  >;
  getEvent(
    key: 'SubscriptionCreated',
  ): TypedContractEvent<
    SubscriptionCreatedEvent.InputTuple,
    SubscriptionCreatedEvent.OutputTuple,
    SubscriptionCreatedEvent.OutputObject
  >;
  getEvent(
    key: 'SubscriptionFunded',
  ): TypedContractEvent<
    SubscriptionFundedEvent.InputTuple,
    SubscriptionFundedEvent.OutputTuple,
    SubscriptionFundedEvent.OutputObject
  >;

  filters: {
    'ConsumerAdded(uint64,address)': TypedContractEvent<
      ConsumerAddedEvent.InputTuple,
      ConsumerAddedEvent.OutputTuple,
      ConsumerAddedEvent.OutputObject
    >;
    ConsumerAdded: TypedContractEvent<
      ConsumerAddedEvent.InputTuple,
      ConsumerAddedEvent.OutputTuple,
      ConsumerAddedEvent.OutputObject
    >;

    'ConsumerRemoved(uint64,address)': TypedContractEvent<
      ConsumerRemovedEvent.InputTuple,
      ConsumerRemovedEvent.OutputTuple,
      ConsumerRemovedEvent.OutputObject
    >;
    ConsumerRemoved: TypedContractEvent<
      ConsumerRemovedEvent.InputTuple,
      ConsumerRemovedEvent.OutputTuple,
      ConsumerRemovedEvent.OutputObject
    >;

    'RandomWordsFulfilled(uint256,uint256,uint96,bool)': TypedContractEvent<
      RandomWordsFulfilledEvent.InputTuple,
      RandomWordsFulfilledEvent.OutputTuple,
      RandomWordsFulfilledEvent.OutputObject
    >;
    RandomWordsFulfilled: TypedContractEvent<
      RandomWordsFulfilledEvent.InputTuple,
      RandomWordsFulfilledEvent.OutputTuple,
      RandomWordsFulfilledEvent.OutputObject
    >;

    'RandomWordsRequested(bytes32,uint256,uint256,uint64,uint16,uint32,uint32,address)': TypedContractEvent<
      RandomWordsRequestedEvent.InputTuple,
      RandomWordsRequestedEvent.OutputTuple,
      RandomWordsRequestedEvent.OutputObject
    >;
    RandomWordsRequested: TypedContractEvent<
      RandomWordsRequestedEvent.InputTuple,
      RandomWordsRequestedEvent.OutputTuple,
      RandomWordsRequestedEvent.OutputObject
    >;

    'SubscriptionCanceled(uint64,address,uint256)': TypedContractEvent<
      SubscriptionCanceledEvent.InputTuple,
      SubscriptionCanceledEvent.OutputTuple,
      SubscriptionCanceledEvent.OutputObject
    >;
    SubscriptionCanceled: TypedContractEvent<
      SubscriptionCanceledEvent.InputTuple,
      SubscriptionCanceledEvent.OutputTuple,
      SubscriptionCanceledEvent.OutputObject
    >;

    'SubscriptionCreated(uint64,address)': TypedContractEvent<
      SubscriptionCreatedEvent.InputTuple,
      SubscriptionCreatedEvent.OutputTuple,
      SubscriptionCreatedEvent.OutputObject
    >;
    SubscriptionCreated: TypedContractEvent<
      SubscriptionCreatedEvent.InputTuple,
      SubscriptionCreatedEvent.OutputTuple,
      SubscriptionCreatedEvent.OutputObject
    >;

    'SubscriptionFunded(uint64,uint256,uint256)': TypedContractEvent<
      SubscriptionFundedEvent.InputTuple,
      SubscriptionFundedEvent.OutputTuple,
      SubscriptionFundedEvent.OutputObject
    >;
    SubscriptionFunded: TypedContractEvent<
      SubscriptionFundedEvent.InputTuple,
      SubscriptionFundedEvent.OutputTuple,
      SubscriptionFundedEvent.OutputObject
    >;
  };
}
