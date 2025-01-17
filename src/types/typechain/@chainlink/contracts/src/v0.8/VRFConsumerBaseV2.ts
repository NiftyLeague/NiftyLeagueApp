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
  ContractRunner,
  ContractMethod,
  Listener,
} from 'ethers6';
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from '../../../../common';

export interface VRFConsumerBaseV2Interface extends Interface {
  getFunction(nameOrSignature: 'rawFulfillRandomWords'): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'rawFulfillRandomWords',
    values: [BigNumberish, BigNumberish[]],
  ): string;

  decodeFunctionResult(
    functionFragment: 'rawFulfillRandomWords',
    data: BytesLike,
  ): Result;
}

export interface VRFConsumerBaseV2 extends BaseContract {
  connect(runner?: ContractRunner | null): VRFConsumerBaseV2;
  waitForDeployment(): Promise<this>;

  interface: VRFConsumerBaseV2Interface;

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

  rawFulfillRandomWords: TypedContractMethod<
    [requestId: BigNumberish, randomWords: BigNumberish[]],
    [void],
    'nonpayable'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'rawFulfillRandomWords',
  ): TypedContractMethod<
    [requestId: BigNumberish, randomWords: BigNumberish[]],
    [void],
    'nonpayable'
  >;

  filters: {};
}
