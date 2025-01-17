/* eslint-disable no-console */
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import Notify, { API, InitOptions } from 'bnc-notify';
import { EthereumTransactionLog, EthereumTransactionData } from 'bnc-sdk';
import { parseUnits, toBeHex } from 'ethers6';
import type {
  Contract,
  JsonRpcSigner,
  TransactionRequest,
  TransactionResponse,
} from 'ethers6';
// import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/dynamic';
import { serializeError } from 'eth-rpc-errors';
import type { GasStationResponse, Network, Provider } from '@/types/web3';
import type { NotifyCallback, NotifyError, Tx } from '@/types/notify';
import { calculateGasMargin, getProviderAndSigner } from '@/utils/ethers';
import { DEBUG } from '@/constants/index';
import {
  VALID_NOTIFY_NETWORKS,
  TARGET_NETWORK,
  NETWORKS,
} from '@/constants/networks';

// Wrapper around BlockNative's wonderful Notify.js
// https://docs.blocknative.com/notify

const callbacks: { [hash: string]: NotifyCallback } = {};

const loadGasPrice = async (
  targetNetwork: Network,
  speed = 'fast',
): Promise<bigint> => {
  let gasPrice = parseUnits('20', 'gwei');
  if (targetNetwork.gasPrice) {
    gasPrice = targetNetwork.gasPrice;
  } else if (navigator.onLine) {
    await axios
      .get('https://ethgasstation.info/json/ethgasAPI.json')
      .then((response: AxiosResponse<GasStationResponse>) => {
        gasPrice = BigInt(response.data[speed] * 100000000);
      })
      .catch((error) => console.log(error));
  }
  return gasPrice;
};

const handleError = (e: NotifyError): void => {
  if (DEBUG) console.log('Transaction Error', e);
  // Accounts for Metamask and default signer on all networks
  let message: string;
  if (e.message) {
    message = e.message;
  } else {
    const serialized = serializeError(e);
    message = serialized.message;
  }

  toast.error(({ data }) => `Transaction Error: ${data}`, {
    data: message,
    theme: 'dark',
  });
};

export const submitTxWithGasEstimate = (
  tx: Tx,
  contract: Contract,
  fn: string,
  args: unknown[],
  config = {},
  minimumGas?: bigint,
  callback?: NotifyCallback,
): Promise<void | TransactionResponse | null> =>
  contract.estimateGas[fn](...args, config)
    .then(async (estimatedGasLimit: bigint) =>
      tx(
        contract[fn](...args, {
          ...config,
          gasLimit: calculateGasMargin(estimatedGasLimit, minimumGas),
        }),
        callback,
      ),
    )
    .catch((error) => {
      handleError(error.error ?? error);
    });

export default function Notifier(
  providerOrSigner?: Provider | JsonRpcSigner,
  darkMode = false,
): Tx {
  return useCallback(
    async (tx, callback) => {
      if (typeof providerOrSigner !== 'undefined') {
        const { signer, provider } =
          await getProviderAndSigner(providerOrSigner);

        let options: InitOptions = {};
        let notify: API | null = null;
        if (navigator.onLine) {
          options = {
            dappId: process.env.NEXT_PUBLIC_BLOCKNATIVE_DAPPID, // GET YOUR OWN KEY AT https://account.blocknative.com
            system: 'ethereum',
            networkId: TARGET_NETWORK.chainId,
            darkMode,
            transactionHandler: (txInformation) => {
              const txData = txInformation.transaction as
                | EthereumTransactionData
                | EthereumTransactionLog;
              if (DEBUG)
                console.log(
                  `HANDLE TX ${txData.status?.toUpperCase()}`,
                  txInformation,
                );
              const possibleFunction = txData.hash && callbacks[txData.hash];
              if (typeof possibleFunction === 'function')
                possibleFunction(txData);
            },
            onerror: (e) => {
              handleError(e);
            },
          };
          notify = Notify(options);
        }

        const etherscanTxUrl = `${TARGET_NETWORK.blockExplorer}/tx/`;

        try {
          let result: TransactionResponse;
          if (tx instanceof Promise) {
            if (DEBUG) console.log('AWAITING TX', tx);
            result = await tx;
          } else {
            const safeTx = { ...tx } as TransactionRequest;
            // TODO: Replace gasPrice with EIP-1559 specifications if non-promise txs are needed
            if (!tx.gasPrice)
              safeTx.gasPrice = await loadGasPrice(TARGET_NETWORK);
            if (!tx.gasLimit) safeTx.gasLimit = toBeHex(120000);
            if (DEBUG) console.log('RUNNING TX', safeTx);
            result = await (signer as JsonRpcSigner).sendTransaction(safeTx);
          }
          if (DEBUG) console.log('RESULT:', result);
          if (callback) callbacks[result.hash] = callback;

          // if it is a valid Notify.js network, use that, if not, just send a default notification
          if (
            notify &&
            VALID_NOTIFY_NETWORKS.includes(TARGET_NETWORK.chainId)
          ) {
            const { emitter } = notify.hash(result.hash);
            emitter.on('all', (transaction) => ({
              onclick: () =>
                transaction.hash &&
                typeof window !== 'undefined' &&
                window.open(etherscanTxUrl + transaction.hash),
            }));
          } else {
            const networkName = TARGET_NETWORK.label;
            toast.info(
              ({ data }) => `${networkName} Transaction Sent: ${data}`,
              {
                data: result.hash,
                position: 'bottom-right',
                theme: 'dark',
              },
            );
            await result.wait();
            toast.success(
              ({ data }) => `${networkName} Transaction Successful: ${data}`,
              {
                data: result.hash,
                position: 'bottom-right',
                theme: 'dark',
              },
            );
            // on most networks BlockNative will update a transaction handler,
            // but locally we will set an interval to listen...
            if (callback) {
              // const txResult = await tx;
              // res = result || txResult?
              // const listeningInterval = setIntervalAsync(async () => {
              //   console.log('CHECK IN ON THE TX', result, provider);
              //   const currentTransactionReceipt = await (provider as Provider).getTransactionReceipt(result.hash);
              //   if (currentTransactionReceipt && currentTransactionReceipt.confirmations) {
              //     callback({ ...result, ...currentTransactionReceipt });
              //     void (async () => {
              //       await clearIntervalAsync(listeningInterval);
              //     })();
              //   }
              // }, 1000);
              const currentTransactionReceipt = await (
                provider as Provider
              ).getTransactionReceipt(result.hash);
              callback(currentTransactionReceipt);
            }
          }

          if (typeof result.wait === 'function') await result.wait();

          return result;
        } catch (e) {
          handleError(e as NotifyError);
          return null;
        }
      } else {
        return null;
      }
    },
    [providerOrSigner, darkMode],
  );
}
