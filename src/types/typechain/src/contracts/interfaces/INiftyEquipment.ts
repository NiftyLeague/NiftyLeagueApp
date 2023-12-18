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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from 'ethers';
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from '../../../common';

export interface INiftyEquipmentInterface extends Interface {
  getFunction(nameOrSignature: 'mint' | 'mintBatch'): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'mint',
    values: [AddressLike, BigNumberish, BigNumberish, BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'mintBatch',
    values: [AddressLike, BigNumberish[], BigNumberish[], BytesLike],
  ): string;

  decodeFunctionResult(functionFragment: 'mint', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintBatch', data: BytesLike): Result;
}

export interface INiftyEquipment extends BaseContract {
  connect(runner?: ContractRunner | null): INiftyEquipment;
  waitForDeployment(): Promise<this>;

  interface: INiftyEquipmentInterface;

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

  mint: TypedContractMethod<
    [to: AddressLike, id: BigNumberish, amount: BigNumberish, data: BytesLike],
    [void],
    'nonpayable'
  >;

  mintBatch: TypedContractMethod<
    [
      to: AddressLike,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
    ],
    [void],
    'nonpayable'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'mint',
  ): TypedContractMethod<
    [to: AddressLike, id: BigNumberish, amount: BigNumberish, data: BytesLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'mintBatch',
  ): TypedContractMethod<
    [
      to: AddressLike,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
    ],
    [void],
    'nonpayable'
  >;

  filters: {};
}
