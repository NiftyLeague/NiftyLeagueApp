import { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Button, Link, Stack, Theme, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SouthIcon from '@mui/icons-material/South';
import makeStyles from '@mui/styles/makeStyles';
import CircleIcon from '@mui/icons-material/Circle';
import { BigNumber, ethers } from 'ethers';
import { OrderKind } from '@cowprotocol/cow-sdk';
import useAccount from 'hooks/useAccount';
import useEtherBalance from 'hooks/useEtherBalance';
import useRateEtherToNFTL from 'hooks/useRateEtherToNFTL';
import { NetworkContext } from 'NetworkProvider';
import { formatNumberToDisplay, formatNumberToDisplay2 } from 'utils/numbers';
import useImportNFTLToWallet from 'hooks/useImportNFTLToWallet';
import { COW_PROTOCOL_URL } from 'constants/url';
import { createOrderSwapEtherToNFTL, getCowMarketPrice } from 'utils/cowswap';
import TokenInfoBox from './TokenInfoBox';
import { ReactComponent as EthIcon } from 'assets/images/tokenIcons/eth.svg';
import NFTL from 'assets/images/logo.png';

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

const CowSwapWidget = () => {
  const classes = useStyles();
  const { address, targetNetwork, userProvider } = useContext(NetworkContext);
  const [refreshAccKey, setRefreshAccKey] = useState(0);
  const { account } = useAccount(refreshAccKey);
  const { balance: etherBalance, refetch: refetchEthBalance } =
    useEtherBalance();
  const { rate: rateEtherToNftl, refetch: refetchRateEtherToNftl } =
    useRateEtherToNFTL();
  const { handleImportNFTLToWallet } = useImportNFTLToWallet();

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

  const accountBalance = account?.balance ?? 0;

  useEffect(() => {
    const timer = setInterval(() => {
      refetchRateEtherToNftl();
      refetchEthBalance();
      setRefreshAccKey(Math.random());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const getMarketPrice = async (kind: OrderKind, amount: string) => {
    try {
      setFeeExceedAmount(false);
      const quoteResponse = await getCowMarketPrice({
        kind,
        chainId: targetNetwork.chainId,
        amount,
        userAddress: address,
      });
      const { feeAmount: fee, buyAmount, sellAmount } = quoteResponse?.quote;
      setFeeAmount(ethers.utils.formatEther(fee));
      if (kind === OrderKind.SELL) {
        setFromEthAmount('');
        setReceiveNftlAmount(ethers.utils.formatEther(buyAmount));
      } else {
        setReceiveNftlAmount('');
        setFromEthAmount(
          ethers.utils.formatEther(
            BigNumber.from(sellAmount).add(BigNumber.from(fee)),
          ),
        );
      }
    } catch (err) {
      if (err.error_code === 'FeeExceedsFrom') {
        setFeeExceedAmount(true);
        setFeeAmount(ethers.utils.formatEther(err.data.fee_amount));
      }
    }
  };

  useEffect(() => {
    setEthAmount(inputEthAmount);
    if (!rateEtherToNftl) return;
    if (!inputEthAmount || Number(inputEthAmount) === 0) {
      setNftlAmount('');
      return;
    }
    setNftlAmount(
      Math.floor(Number(inputEthAmount) / rateEtherToNftl).toString(),
    );
    getMarketPrice(OrderKind.SELL, inputEthAmount);
  }, [inputEthAmount]);

  useEffect(() => {
    setNftlAmount(inputNftlAmount);
    if (!rateEtherToNftl) return;
    if (!inputNftlAmount || Number(inputNftlAmount) === 0) {
      setEthAmount('');
      return;
    }
    setEthAmount(
      formatNumberToDisplay2(Number(inputNftlAmount) * rateEtherToNftl, 8),
    );
    getMarketPrice(OrderKind.BUY, inputNftlAmount);
  }, [inputNftlAmount]);

  const sufficientBalance: boolean = Number(ethAmount) <= etherBalance;
  // We should alert if Fees exceed 30% of the swap amount
  // const validFee = useMemo(() => {
  //   if (!ethAmount || Number(ethAmount) === 0 || !feeAmount) return true;
  //   return Number(ethAmount) > Number(feeAmount);
  // }, [ethAmount, feeAmount]);

  const handleBuyNFTL = useCallback(async () => {
    try {
      if (!userProvider) return;
      setPurchasing(true);
      const signer = userProvider.getSigner(address);
      const orderID = await createOrderSwapEtherToNFTL({
        signer,
        chainId: targetNetwork.chainId,
        etherVal: ethAmount,
        userAddress: address,
      });
      setOrderId(orderID);
    } catch (err) {
      console.log(err);
    } finally {
      setPurchasing(false);
    }
  }, [address, targetNetwork.chainId, ethAmount, userProvider]);

  const initialize = () => {
    setOrderId('');
    setInputEthAmount('');
    setInputNftlAmount('');
    setEthAmount('');
    setNftlAmount('');
    setFromEthAmount('');
    setReceiveNftlAmount('');
    setFeeAmount('');
  };

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
              setValue={setInputEthAmount}
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
              setValue={setInputNftlAmount}
            />
            <Stack direction="column">
              {feeAmount && (
                <Stack direction="row" justifyContent="space-between" my={1}>
                  <Typography ml={1}>Fees</Typography>
                  <Typography mr={1}>
                    {`${formatNumberToDisplay(Number(feeAmount), 4)} ETH`}
                  </Typography>
                </Stack>
              )}
            </Stack>
            <LoadingButton
              variant="contained"
              fullWidth
              loading={purchasing}
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
                ? 'Buy NFTL'
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
            <Typography variant="h4">Transaction Submitted</Typography>{' '}
            <Link
              href={`https://explorer.cow.fi/mainnet/orders/${orderId}`}
              target="_blank"
              rel="noreferrer"
              color={'#FFFFFF'}
            >
              View on explorer
            </Link>
            <Stack direction="row" alignItems="center" gap={1} mt={2}>
              <Button
                variant="outlined"
                onClick={handleImportNFTLToWallet}
                fullWidth
                sx={{ height: '44px !important', lineHeight: '18px' }}
              >
                Add NFTL to Metamask
              </Button>
              <Button
                variant="contained"
                onClick={initialize}
                fullWidth
                sx={{ height: '44px !important', lineHeight: '18px' }}
              >
                Buy More NFTL
              </Button>
            </Stack>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default CowSwapWidget;
