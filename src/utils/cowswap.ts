import { OrderSigningUtils, OrderBookApi } from '@cowprotocol/cow-sdk';
import { Contract, ethers } from 'ethers';
import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json';
import wethAbi from '@/contracts/abis/weth.json';
import {
  COWSWAP_VAULT_RELAYER_ADDRESS,
  WETH_ADDRESS,
  NFTL_TOKEN_ADDRESS,
} from '@/constants/contracts';
import { formatNumberToDisplay2 } from './numbers';

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
    sellAmountBeforeFee: ethers.utils.parseEther(amount).toString(),
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

    const orderBookApi = new OrderBookApi({ chainId });
    const quoteRequest = {
      sellToken: WETH_ADDRESS[chainId],
      buyToken: NFTL_TOKEN_ADDRESS[chainId],
      from: userAddress,
      receiver: userAddress,
      sellAmountBeforeFee: ethers.utils.parseEther(etherVal).toString(),
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
        Number(ethers.utils.formatEther(quote.buyAmount)),
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
