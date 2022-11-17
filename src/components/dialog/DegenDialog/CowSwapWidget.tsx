import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  LinearProgress,
  Link,
  Stack,
  Theme,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SouthIcon from '@mui/icons-material/South';
import makeStyles from '@mui/styles/makeStyles';
import CircleIcon from '@mui/icons-material/Circle';
import { BigNumber, BigNumberish, utils } from 'ethers';
import { OrderKind } from '@cowprotocol/cow-sdk';
import useAccount from 'hooks/useAccount';
import useEtherBalance from 'hooks/useEtherBalance';
import useRateEtherToNFTL from 'hooks/useRateEtherToNFTL';
import NetworkContext from 'contexts/NetworkContext';
import { formatNumberToDisplay, formatNumberToDisplay2 } from 'utils/numbers';
import useImportNFTLToWallet from 'hooks/useImportNFTLToWallet';
import useTokenUSDPrice from 'hooks/useTokenUSDPrice';
import { COW_PROTOCOL_URL } from 'constants/url';
import { GAME_ACCOUNT_CONTRACT, NFTL_CONTRACT } from 'constants/contracts';
import {
  createOrderSwapEtherToNFTL,
  getCowMarketPrice,
  getOrderDetail,
} from 'utils/cowswap';
import { DEBUG } from 'constants/index';
import TokenInfoBox from './TokenInfoBox';
import { ReactComponent as EthIcon } from 'assets/images/tokenIcons/eth.svg';
import NFTL from 'assets/images/logo.png';
import BalanceContext from 'contexts/BalanceContext';

const useStyles = makeStyles((theme: Theme) => ({
  purchaseNFTLBtn: {
    background: '#4291E5',
    borderRadius: '10px !important',
    height: '30px !important',
    '&:hover': {
      background: '#4291E5',
      opacity: 0.8,
    },
  },
  arrowDown: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: '#202230',
    border: '1px solid #282B3F',
    left: 'calc(50% - 16px)',
  },
}));

type CowSwapWidgetProps = {
  refreshBalance: () => void;
};

const CowSwapWidget = ({ refreshBalance }: CowSwapWidgetProps) => {
  const classes = useStyles();
  const { address, targetNetwork, tx, userProvider, writeContracts } =
    useContext(NetworkContext);
  const [refreshAccKey, setRefreshAccKey] = useState(0);
  const { account } = useAccount(refreshAccKey);
  const { balance: etherBalance, refetch: refetchEthBalance } =
    useEtherBalance();
  const { rate: rateEtherToNftl, refetch: refetchRateEtherToNftl } =
    useRateEtherToNFTL();
  const { handleImportNFTLToWallet } = useImportNFTLToWallet();
  const { userNFTLBalance, refreshNFTLBalance } = useContext(BalanceContext);

  const [inputEthAmount, setInputEthAmount] = useState<string>('');
  const [inputNftlAmount, setInputNftlAmount] = useState<string>('');
  const [ethAmount, setEthAmount] = useState<string>('');
  const [nftlAmount, setNftlAmount] = useState<string>('');
  const [fromEthAmount, setFromEthAmount] = useState<string>('');
  const [receiveNftlAmount, setReceiveNftlAmount] = useState<string>('');
  const [feeAmount, setFeeAmount] = useState<string>('');
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const [feeExceedAmount, setFeeExceedAmount] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { price: etherPrice } = useTokenUSDPrice({ slug: 'ethereum' });
  const [txnState, setTxnState] = useState<string>('Buy NFTL');
  const [orderFulfilled, setOrderFulfilled] = useState<boolean>(false);
  const [orderBuyAmount, setOrderBuyAmount] = useState<string>('');
  const [deposited, setDeposited] = useState<boolean>(false);
  const [allowance, setAllowance] = useState<BigNumberish>(BigNumber.from('0'));
  const [allowanceLoading, setAllowanceLoading] = useState<boolean>(false);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);

  const accountBalance = account?.balance ?? 0;

  useEffect(() => {
    const timer = setInterval(() => {
      refetchRateEtherToNftl();
      refetchEthBalance();
      setRefreshAccKey(Math.random());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const getAllowance = async () => {
      const gameAccountContract = writeContracts[GAME_ACCOUNT_CONTRACT];
      const gameAccountAddress = gameAccountContract.address;
      const nftl = writeContracts[NFTL_CONTRACT];
      const allowanceBN = (await nftl.allowance(
        address,
        gameAccountAddress,
      )) as BigNumberish;
      setAllowance(allowanceBN);
    };
    if (
      writeContracts &&
      writeContracts[NFTL_CONTRACT] &&
      writeContracts[GAME_ACCOUNT_CONTRACT]
    ) {
      // eslint-disable-next-line no-void
      void getAllowance();
    }
  }, [address, writeContracts]);

  const checkOrderStatus = async () => {
    const orderDetail = await getOrderDetail(targetNetwork.chainId, orderId);
    if (orderDetail?.status === 'fulfilled') {
      setOrderFulfilled(true);
      setOrderBuyAmount(utils.formatEther(orderDetail?.buyAmount ?? ''));
      refreshNFTLBalance();
    } else {
      setTimeout(() => {
        checkOrderStatus();
      }, 3000);
    }
  };

  useEffect(() => {
    if (orderId && targetNetwork.chainId) {
      checkOrderStatus();
    }
  }, [orderId, targetNetwork.chainId]);

  const getMarketPrice = async (kind: OrderKind, amount: string) => {
    try {
      setLoading(true);
      setFeeExceedAmount(false);
      setFeeAmount('');
      const quoteResponse = await getCowMarketPrice({
        kind,
        chainId: targetNetwork.chainId,
        amount,
        userAddress: address,
      });

      const { feeAmount: fee, buyAmount, sellAmount } = quoteResponse?.quote;
      setFeeAmount(utils.formatEther(fee));
      if (kind === OrderKind.SELL) {
        setFromEthAmount('');
        setReceiveNftlAmount(utils.formatEther(buyAmount));
      } else {
        setReceiveNftlAmount('');
        setFromEthAmount(
          utils.formatEther(
            BigNumber.from(sellAmount).add(BigNumber.from(fee)),
          ),
        );
      }
    } catch (err) {
      if (err.error_code === 'FeeExceedsFrom') {
        setFeeExceedAmount(true);
        setFeeAmount(utils.formatEther(err.data.fee_amount));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!rateEtherToNftl) return;
    if (!inputEthAmount || Number(inputEthAmount) === 0) {
      setNftlAmount('');
      setFromEthAmount('');
      setReceiveNftlAmount('');
      setFeeAmount('');
      return;
    }
    setNftlAmount(
      Math.floor(Number(inputEthAmount) / rateEtherToNftl).toString(),
    );
  }, [inputEthAmount]);

  useEffect(() => {
    if (!rateEtherToNftl) return;
    if (!inputNftlAmount || Number(inputNftlAmount) === 0) {
      setEthAmount('');
      setFromEthAmount('');
      setReceiveNftlAmount('');
      setFeeAmount('');
      return;
    }
    setEthAmount(
      formatNumberToDisplay2(Number(inputNftlAmount) * rateEtherToNftl, 8),
    );
  }, [inputNftlAmount]);

  const sufficientBalance: boolean = Number(ethAmount) <= etherBalance;

  const handleTxnState = (status: string) => {
    setTxnState(status);
  };

  const handleBuyNFTL = useCallback(async () => {
    try {
      if (!userProvider) return;
      setPurchasing(true);
      const signer = userProvider.getSigner(address);
      const orderID = await createOrderSwapEtherToNFTL({
        signer,
        chainId: targetNetwork.chainId,
        etherVal: fromEthAmount ? fromEthAmount : ethAmount,
        userAddress: address,
        handleTxnState,
      });
      setOrderId(orderID);
    } catch (err) {
      // eslint-disable-next-line no-console
      if (DEBUG) console.log(err);
    } finally {
      setPurchasing(false);
    }
  }, [address, targetNetwork.chainId, fromEthAmount, ethAmount, userProvider]);

  const initialize = () => {
    setDeposited(false);
    setOrderBuyAmount('');
    setOrderId('');
    setOrderFulfilled(false);
    setInputEthAmount('');
    setInputNftlAmount('');
    setEthAmount('');
    setNftlAmount('');
    setFromEthAmount('');
    setReceiveNftlAmount('');
    setFeeAmount('');
    setTxnState('Buy NFTL');
  };

  const handleDeposit = useCallback(async () => {
    setDepositLoading(true);
    const txRes = await tx(
      writeContracts[GAME_ACCOUNT_CONTRACT].deposit(
        utils.parseEther(`${Number(orderBuyAmount)}`),
      ),
    );
    setDepositLoading(false);
    if (txRes) {
      refreshBalance();
      setDeposited(true);
    }
  }, [orderBuyAmount, refreshBalance, tx, writeContracts]);

  const handleIncreaseAllowance = useCallback(async () => {
    setAllowanceLoading(true);
    const gameAccountContract = writeContracts[GAME_ACCOUNT_CONTRACT];
    const gameAccountAddress = gameAccountContract.address;
    const nftl = writeContracts[NFTL_CONTRACT];
    const newAllowance = utils.parseEther(
      `${Math.max(100000, Math.ceil(userNFTLBalance))}`,
    );
    await tx(nftl.increaseAllowance(gameAccountAddress, newAllowance));
    setAllowance(newAllowance);
    setAllowanceLoading(false);
  }, [tx, userNFTLBalance, writeContracts]);

  const handleEthAmount = (val: string) => {
    setEthAmount(val);
    setInputEthAmount(val);
  };

  const handleNftlAmount = (val: string) => {
    setNftlAmount(val);
    setInputNftlAmount(val);
  };

  const isAllowDeposit =
    parseFloat(utils.formatEther(allowance)) >= parseFloat(orderBuyAmount);

  return (
    <Stack direction="column">
      <Typography variant="caption" ml="auto" mb={1}>
        This transaction is taking place live on{' '}
        <Link href={COW_PROTOCOL_URL} target="_blank" rel="noreferrer">
          cow.fi
        </Link>
        <CircleIcon
          sx={{
            width: 3,
            height: 3,
            color: '#5820D6',
            marginLeft: 0.25,
            marginBottom: 0.25,
          }}
        />
      </Typography>
      <Box
        border={'1px solid #191B1F'}
        boxShadow="0px 0px 9px #5820D6"
        borderRadius="10px"
        px={1}
        py={1.25}
        sx={{ background: '#202230' }}
      >
        {!orderId ? (
          <Stack direction="column" spacing={0.75} position="relative">
            <TokenInfoBox
              balance={etherBalance}
              icon={<EthIcon width={12} height={12} />}
              name="ETH"
              slug="ethereum"
              value={ethAmount}
              transactionValue={fromEthAmount}
              kind="From"
              setValue={handleEthAmount}
              getMarketPrice={getMarketPrice}
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              className={classes.arrowDown}
              sx={{ top: fromEthAmount ? 126 : 76 }}
            >
              <SouthIcon fontSize="small" sx={{ color: '#FFFFFF' }} />
            </Box>
            <TokenInfoBox
              balance={accountBalance}
              icon={<img src={NFTL} alt="NFTL Token" width={12} height={12} />}
              name="NFTL"
              slug="nifty-league"
              value={nftlAmount}
              transactionValue={receiveNftlAmount}
              kind="Receive"
              setValue={handleNftlAmount}
              getMarketPrice={getMarketPrice}
            />
            <Stack direction="column">
              {feeAmount && (
                <Stack direction="row" justifyContent="space-between" my={1}>
                  <Typography ml={1}>Fees</Typography>
                  <Typography mr={1}>
                    {`${formatNumberToDisplay(
                      Number(feeAmount),
                      4,
                    )} ETH (~$${formatNumberToDisplay2(
                      etherPrice * Number(feeAmount),
                      2,
                    )})`}
                  </Typography>
                </Stack>
              )}
            </Stack>
            <LoadingButton
              variant="contained"
              fullWidth
              loading={loading || purchasing}
              loadingPosition={purchasing ? 'end' : 'center'}
              className={classes.purchaseNFTLBtn}
              onClick={handleBuyNFTL}
              disabled={
                !ethAmount ||
                !Number(ethAmount) ||
                !sufficientBalance ||
                feeExceedAmount
              }
            >
              {!ethAmount || !Number(ethAmount)
                ? 'Enter an amount'
                : !sufficientBalance
                ? 'Insufficient ETH Balance'
                : !feeExceedAmount
                ? txnState
                : 'Fees exceed from amount'}
            </LoadingButton>
          </Stack>
        ) : (
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
            height={228}
            gap={1}
          >
            <Typography variant="h4">
              {!orderFulfilled ? 'Order In Progress' : 'Order Confirmed'}
            </Typography>
            {!orderFulfilled && (
              <Box sx={{ width: '100px' }}>
                <LinearProgress />
              </Box>
            )}
            <Link
              href={`https://explorer.cow.fi/mainnet/orders/${orderId}`}
              target="_blank"
              rel="noreferrer"
            >
              View on explorer
            </Link>
            {orderFulfilled && !deposited && (
              <Stack mt={1}>
                <Typography px={4} textAlign="center">
                  Congrats! Your transaction has been confirmed successfully! 🚀
                  Click below Deposit button to purchase in-game NFTL balance
                  from your wallet.
                </Typography>
              </Stack>
            )}
            <Stack direction="row" alignItems="center" gap={1} mt={2}>
              <Button
                variant="outlined"
                onClick={handleImportNFTLToWallet}
                fullWidth
                sx={{ height: '44px !important', lineHeight: '18px' }}
              >
                Add NFTL to Metamask
              </Button>
              {orderFulfilled && !deposited && !isAllowDeposit && (
                <LoadingButton
                  variant="contained"
                  fullWidth
                  loading={allowanceLoading}
                  onClick={handleIncreaseAllowance}
                  sx={{ height: '44px !important', lineHeight: '18px' }}
                >
                  Increase Allowance
                </LoadingButton>
              )}
              {orderFulfilled && !deposited && isAllowDeposit && (
                <LoadingButton
                  variant="contained"
                  fullWidth
                  loading={depositLoading}
                  onClick={handleDeposit}
                  sx={{ height: '44px !important', lineHeight: '18px' }}
                >
                  Deposit NFTL
                </LoadingButton>
              )}
              {orderFulfilled && deposited && (
                <Button
                  variant="contained"
                  onClick={initialize}
                  fullWidth
                  sx={{ height: '44px !important', lineHeight: '18px' }}
                >
                  Buy More NFTL
                </Button>
              )}
            </Stack>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default CowSwapWidget;
