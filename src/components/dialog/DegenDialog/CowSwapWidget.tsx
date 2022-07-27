import { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Button, Link, Stack, Theme, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SouthIcon from '@mui/icons-material/South';
import makeStyles from '@mui/styles/makeStyles';
import CircleIcon from '@mui/icons-material/Circle';
import useAccount from 'hooks/useAccount';
import useEtherBalance from 'hooks/useEtherBalance';
import useRateEtherToNFTL from 'hooks/useRateEtherToNFTL';
import { NetworkContext } from 'NetworkProvider';
import { formatNumberToDisplay2 } from 'utils/numbers';
import useImportNFTLToWallet from 'hooks/useImportNFTLToWallet';
import { COW_PROTOCOL_URL } from 'constants/url';
import { createOrderSwapEtherToNFTL } from 'utils/cowswap';
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
    top: 76,
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
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

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
    setEthAmount(inputEthAmount);
    if (!rateEtherToNftl) return;
    if (!inputEthAmount || Number(inputEthAmount) === 0) {
      setNftlAmount('');
      return;
    }
    setNftlAmount(
      Math.floor(Number(inputEthAmount) / rateEtherToNftl).toString(),
    );
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
  }, [inputNftlAmount]);

  const sufficientBalance: boolean = Number(ethAmount) <= etherBalance;

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
              setValue={setInputEthAmount}
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              className={classes.arrowDown}
            >
              <SouthIcon fontSize="small" sx={{ color: '#FFFFFF' }} />
            </Box>
            <TokenInfoBox
              balance={accountBalance}
              icon={<img src={NFTL} alt="NFTL Token" width={12} height={12} />}
              name="NFTL"
              slug="nifty-league"
              value={nftlAmount}
              setValue={setInputNftlAmount}
            />
            <LoadingButton
              variant="contained"
              fullWidth
              loading={purchasing}
              className={classes.purchaseNFTLBtn}
              onClick={handleBuyNFTL}
              disabled={!ethAmount || !Number(ethAmount) || !sufficientBalance}
            >
              {!sufficientBalance ? 'Insufficient Balance' : 'Buy NFTL'}
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
