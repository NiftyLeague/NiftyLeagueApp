import { CowSdk, OrderKind } from '@cowprotocol/cow-sdk';
import { Contract, ethers } from 'ethers';
import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json';
import wethAbi from 'constants/abis/weth.json';
import {
  COWSWAP_VAULT_RELAYER_ADDRESS,
  WETH_ADDRESS,
} from 'constants/contracts';
import NFTLTokenAddress from 'contracts/mainnet/NFTLToken.address';
import { formatNumberToDisplay2 } from './numbers';

export const getCowMarketPrice = async ({
  kind,
  chainId,
  amount,
  userAddress,
}) => {
  const cowSdk = new CowSdk(chainId);
  const quoteResponse = await cowSdk.cowApi.getQuote({
    kind,
    sellToken: WETH_ADDRESS[chainId],
    buyToken: NFTLTokenAddress,
    amount: ethers.utils.parseEther(amount).toString(),
    userAddress,
    validTo: Math.floor(new Date().getTime() / 1000) + 3600, // Valid for 1 hr
  });
  if (!quoteResponse) throw Error('Cannot get marketplace');
  return quoteResponse;
};

export const createOrderSwapEtherToNFTL = async ({
  signer,
  chainId,
  etherVal,
  userAddress,
  handleTxnState,
}) => {
  try {
    // Wrap ETH
    handleTxnState('Sign the wrapping with your wallet');
    const wEth = new Contract(WETH_ADDRESS[chainId], wethAbi);
    await wEth.connect(signer).deposit({
      value: ethers.utils.parseEther(etherVal),
    });

    // Approve WETH to Vault Relayer
    handleTxnState('Allow CowSwap to use your WETH');
    const erc20 = new Contract(WETH_ADDRESS[chainId], ERC20.abi);
    const tx = await erc20
      .connect(signer)
      .approve(
        COWSWAP_VAULT_RELAYER_ADDRESS,
        ethers.utils.parseEther(etherVal),
      );
    await tx.wait();

    const cowSdk = new CowSdk(chainId, {
      signer,
    });
    const quoteResponse = await cowSdk.cowApi.getQuote({
      kind: OrderKind.SELL,
      sellToken: WETH_ADDRESS[chainId],
      buyToken: NFTLTokenAddress,
      amount: ethers.utils.parseEther(etherVal).toString(),
      userAddress,
      validTo: Math.floor(new Date().getTime() / 1000) + 3600, // Valid for 1 hr
    });
    if (!quoteResponse) throw Error('Cannot get marketplace');

    const {
      sellToken,
      buyToken,
      validTo,
      buyAmount,
      sellAmount,
      receiver,
      feeAmount,
    } = quoteResponse.quote;

    if (!receiver) throw Error('No receiver in Quote');

    // Prepare the RAW order
    const order = {
      kind: OrderKind.SELL,
      receiver,
      sellToken,
      buyToken,
      partiallyFillable: false,
      validTo: Number(validTo),
      sellAmount,
      buyAmount,
      feeAmount,
      appData:
        '0x0000000000000000000000000000000000000000000000000000000000000000',
    };

    // Sign the order
    handleTxnState(
      `Swapping ${formatNumberToDisplay2(
        Number(etherVal),
        4,
      )} WETH for ${formatNumberToDisplay2(
        Number(ethers.utils.formatEther(buyAmount)),
        2,
      )} NFTL`,
    );
    const signedOrder = await cowSdk.signOrder(order);
    const signature = signedOrder?.signature;
    if (!signature) throw Error('No Signature');

    // Post the order
    const orderID = await cowSdk.cowApi.sendOrder({
      order: {
        ...order,
        ...signedOrder,
        signature,
      },
      owner: userAddress,
    });
    return orderID;
  } catch (err) {
    throw err;
  }
};

export const getOrderDetail = async (chainId, orderID) => {
  const cowSdk = new CowSdk(chainId);
  const order = await cowSdk.cowApi.getOrder(orderID);
  return order;
};
