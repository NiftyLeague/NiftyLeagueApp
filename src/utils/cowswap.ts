import { OrderSigningUtils, OrderBookApi } from '@cowprotocol/cow-sdk';
import { parseEther, formatEther } from 'ethers6';
import {
  COWSWAP_VAULT_RELAYER_ADDRESS,
  WETH_ADDRESS,
  NFTL_TOKEN_ADDRESS,
} from '@/constants/contracts';
import { formatNumberToDisplay2 } from './numbers';
import { ERC20__factory, WETH__factory } from '@/types/typechain';

export const getCowMarketPrice = async ({
  kind,
  chainId,
  amount,
  userAddress,
}) => {
  const orderBookApi = new OrderBookApi({ chainId });
  const quoteResponse = await orderBookApi.getQuote({
    kind,
    sellToken: WETH_ADDRESS[chainId],
    buyToken: NFTL_TOKEN_ADDRESS[chainId],
    sellAmountBeforeFee: parseEther(amount).toString(),
    from: userAddress,
    receiver: userAddress,
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
    const wEth = WETH__factory.connect(WETH_ADDRESS[chainId]);
    await wEth.connect(signer).deposit({
      value: parseEther(etherVal),
    });

    // Approve WETH to Vault Relayer
    handleTxnState('Allow CowSwap to use your WETH');
    const erc20 = ERC20__factory.connect(WETH_ADDRESS[chainId]);
    const tx = await erc20
      .connect(signer)
      .approve(COWSWAP_VAULT_RELAYER_ADDRESS, parseEther(etherVal));
    await tx.wait();

    const orderBookApi = new OrderBookApi({ chainId });
    const quoteRequest = {
      sellToken: WETH_ADDRESS[chainId],
      buyToken: NFTL_TOKEN_ADDRESS[chainId],
      from: userAddress,
      receiver: userAddress,
      sellAmountBeforeFee: parseEther(etherVal).toString(),
      validTo: Math.floor(new Date().getTime() / 1000) + 3600,
      // @ts-expect-error
      kind: OrderQuoteSide.kind.SELL,
    };
    const { quote } = await orderBookApi.getQuote(quoteRequest);

    if (!quote) throw Error('Cannot get marketplace');

    // Sign the order
    handleTxnState(
      `Swapping ${formatNumberToDisplay2(
        Number(etherVal),
        4,
      )} WETH for ${formatNumberToDisplay2(
        Number(formatEther(quote.buyAmount)),
        2,
      )} NFTL`,
    );
    const signedOrder = await OrderSigningUtils.signOrder(
      // @ts-expect-error
      quote,
      chainId,
      signer,
    );
    const signature = signedOrder?.signature;
    if (!signature) throw Error('No Signature');

    // Post the order
    // @ts-expect-error
    const orderID = await orderBookApi.sendOrder({ ...quote, ...signedOrder });
    return orderID;
  } catch (err) {
    throw err;
  }
};

export const getOrderDetail = async (chainId, orderID) => {
  const orderBookApi = new OrderBookApi({ chainId });
  const order = await orderBookApi.getOrder(orderID);
  return order;
};
