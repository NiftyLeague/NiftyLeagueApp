import {
  type TransactionResponse,
  type TransactionRequest,
  type TransactionReceipt,
} from 'ethers6';
import {
  EthereumTransactionLog,
  EthereumTransactionData,
  SDKError,
} from 'bnc-sdk';
import { EthereumRpcError, EthereumProviderError } from 'eth-rpc-errors';

type Deferrable<T> = {
  [K in keyof T]: T[K] | Promise<T[K]>;
};

type Transaction =
  | Promise<TransactionResponse>
  | Deferrable<TransactionRequest>;

export type NotifyTransactionResult =
  | EthereumTransactionLog
  | EthereumTransactionData
  | TransactionReceipt;

export type NotifyCallback = (res: NotifyTransactionResult | null) => void;

export type Tx = (
  tx: Transaction,
  callback?: NotifyCallback,
) => Promise<TransactionResponse | null>;

export type MetamaskError = EthereumRpcError<any> | EthereumProviderError<any>;

export type NotifyError = SDKError | MetamaskError | Error | ErrorEvent;
