import { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Button, Stack, Theme, Typography } from '@mui/material';
import SouthIcon from '@mui/icons-material/South';
import makeStyles from '@mui/styles/makeStyles';
import CircleIcon from '@mui/icons-material/Circle';
import { CowSdk, OrderKind } from '@cowprotocol/cow-sdk';
import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json';
import useAccount from 'hooks/useAccount';
import { Contract, ethers } from 'ethers';
import { NetworkContext } from 'NetworkProvider';
import { CONVERT_TOKEN_TO_USD_URL } from 'constants/url';
import { formatNumberToDisplay2 } from 'utils/numbers';
import TokenInfoBox from './TokenInfoBox';
import { ReactComponent as EthIcon } from 'assets/images/tokenIcons/eth.svg';
import NFTL from 'assets/images/logo.png';
import { parseBalance } from 'helpers';

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

  const [inputEthAmount, setInputEthAmount] = useState<string>('');
  const [inputNftlAmount, setInputNftlAmount] = useState<string>('');
  const [ethAmount, setEthAmount] = useState<string>('');
  const [nftlAmount, setNftlAmount] = useState<string>('');
  const [ethBalance, setEthBalance] = useState<number>(0);
  const [rateEthToNftl, setRateEthToNftl] = useState<number>(0);

  const accountBalance = account?.balance ?? 0;

  const fetchNFTLTokenInfo = () => {
    fetch(CONVERT_TOKEN_TO_USD_URL + 'nifty-league', {
      method: 'GET',
    })
      .then(async (response) => {
        const json = await response.json();
        setRateEthToNftl(json.crypto.eth);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    // Get NFTL to ETH Conversion Rate
    fetchNFTLTokenInfo();
    const timer = setInterval(() => {
      fetchNFTLTokenInfo();
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setEthAmount(inputEthAmount);
    if (!rateEthToNftl) return;
    if (!inputEthAmount || Number(inputEthAmount) === 0) {
      setNftlAmount('');
      return;
    }
    setNftlAmount(
      Math.floor(Number(inputEthAmount) / rateEthToNftl).toString(),
    );
  }, [inputEthAmount]);

  useEffect(() => {
    setNftlAmount(inputNftlAmount);
    if (!rateEthToNftl) return;
    if (!inputNftlAmount || Number(inputNftlAmount) === 0) {
      setEthAmount('');
      return;
    }
    setEthAmount(
      formatNumberToDisplay2(Number(inputNftlAmount) * rateEthToNftl, 8),
    );
  }, [inputNftlAmount]);

  useEffect(() => {
    if (userProvider) {
      userProvider
        // .getBalance(address)
        .getBalance('0x5cf56639814C002cb86c25507c3e450F49baf0A9')
        .then((rawBalance) => {
          setEthBalance(Number(ethers.utils.formatEther(rawBalance)));
        })
        .catch((err) => {});
    }
  }, [address, userProvider]);

  const handleBuyNFTL = useCallback(async () => {
    try {
      const cowSdk = new CowSdk(targetNetwork.chainId);
      const quoteResponse = await cowSdk.cowApi.getQuote({
        kind: OrderKind.SELL,
        sellToken: 'ETH', // WETH
        buyToken: '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b', // USDC
        amount: parseBalance(ethAmount).toString(),
        userAddress: '0x5cf56639814C002cb86c25507c3e450F49baf0A9',
        validTo: Math.floor(new Date().getTime() / 1000) + 3600,
      });
      if (!quoteResponse) {
        return;
      }
      const { sellToken, buyToken, validTo, buyAmount, sellAmount, feeAmount } =
        quoteResponse.quote;

      // Prepare the RAW order
      const order = {
        kind: OrderKind.SELL,
        receiver: '0x5cf56639814C002cb86c25507c3e450F49baf0A9',
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

      const erc20 = new Contract(address, ERC20.abi, userProvider);
      const tx = await erc20
        .connect('0xc778417e063141139fce010982780140aa0cd5ab')
        .approve(
          '0x5cf56639814C002cb86c25507c3e450F49baf0A9',
          ethers.constants.MaxUint256,
        );
      await tx.wait();
      // Sign the order
      const signedOrder = await cowSdk.signOrder(order);
      console.log(signedOrder);
      const signature = signedOrder?.signature;
      if (!signature) return;
      const orderId = await cowSdk.cowApi.sendOrder({
        order: {
          ...order,
          ...signedOrder,
          signature,
        },
        owner: '0x5cf56639814C002cb86c25507c3e450F49baf0A9',
      });
      console.log(orderId);
    } catch (err) {
      console.log(err);
    }
  }, [targetNetwork.chainId, ethAmount, userProvider]);

  return (
    <Stack direction="column">
      <Typography variant="caption" ml="auto" mb={1}>
        This transaction is taking place live on{' '}
        <Typography
          variant="caption"
          ml="auto"
          sx={{ color: '#5820D6' }}
          alignItems="center"
        >
          cowswap.com
        </Typography>
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
        <Stack direction="column" spacing={0.75} position="relative">
          <TokenInfoBox
            balance={ethBalance}
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
          <Button
            variant="contained"
            fullWidth
            className={classes.purchaseNFTLBtn}
            onClick={handleBuyNFTL}
            disabled={!ethAmount || !Number(ethAmount)}
          >
            Buy NFTL
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CowSwapWidget;
