import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Box, Button, Link, Stack, Theme, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SouthIcon from '@mui/icons-material/South';
import makeStyles from '@mui/styles/makeStyles';
import CircleIcon from '@mui/icons-material/Circle';
import { CowSdk, OrderKind } from '@cowprotocol/cow-sdk';
import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json';
import wethAbi from 'constants/abis/weth.json';
import useAccount from 'hooks/useAccount';
import { Contract, ethers } from 'ethers';
import { NetworkContext } from 'NetworkProvider';
import { CONVERT_TOKEN_TO_USD_URL } from 'constants/url';
import { formatNumberToDisplay2 } from 'utils/numbers';
import NFTLTokenAddress from 'contracts/mainnet/NFTLToken.address';
import {
  COWSWAP_VAULT_RELAYER_ADDRESS,
  WETH_ADDRESS,
} from 'constants/contracts';
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

  const [inputEthAmount, setInputEthAmount] = useState<string>('');
  const [inputNftlAmount, setInputNftlAmount] = useState<string>('');
  const [ethAmount, setEthAmount] = useState<string>('');
  const [nftlAmount, setNftlAmount] = useState<string>('');
  const [ethBalance, setEthBalance] = useState<number>(0);
  const [rateEthToNftl, setRateEthToNftl] = useState<number>(0);
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

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

  const fetchEthBalance = useCallback(() => {
    if (address && userProvider) {
      userProvider
        .getBalance(address)
        .then((rawBalance) => {
          setEthBalance(Number(ethers.utils.formatEther(rawBalance)));
        })
        .catch((err) => {});
    }
  }, [address, userProvider]);

  useEffect(() => {
    // Get NFTL to ETH Conversion Rate and ETH Balance
    fetchNFTLTokenInfo();
    fetchEthBalance();
    const timer = setInterval(() => {
      fetchNFTLTokenInfo();
      fetchEthBalance();
      setRefreshAccKey(Math.random());
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

  const sufficientBalance = useMemo(
    () => Number(ethAmount) <= ethBalance,
    [ethAmount, ethBalance],
  );

  const handleBuyNFTL = useCallback(async () => {
    try {
      if (!userProvider) return;
      setPurchasing(true);
      const signer = userProvider.getSigner(address);

      // Wrap ETH
      const wEth = new Contract(WETH_ADDRESS[targetNetwork.chainId], wethAbi);
      await wEth.connect(signer).deposit({
        value: ethers.utils.parseEther(ethAmount),
      });

      // Approve WETH to Vault Relayer
      const erc20 = new Contract(
        WETH_ADDRESS[targetNetwork.chainId],
        ERC20.abi,
      );
      const tx = await erc20
        .connect(signer)
        .approve(
          COWSWAP_VAULT_RELAYER_ADDRESS,
          ethers.utils.parseEther(ethAmount),
        );
      await tx.wait();

      const cowSdk = new CowSdk(targetNetwork.chainId, {
        signer,
      });
      const quoteResponse = await cowSdk.cowApi.getQuote({
        kind: OrderKind.SELL,
        sellToken: WETH_ADDRESS[targetNetwork.chainId],
        buyToken: NFTLTokenAddress,
        amount: ethers.utils.parseEther(ethAmount).toString(),
        userAddress: address,
        validTo: Math.floor(new Date().getTime() / 1000) + 3600, // Valid for 1 hr
      });
      if (!quoteResponse) return;
      const {
        sellToken,
        buyToken,
        validTo,
        buyAmount,
        sellAmount,
        receiver,
        feeAmount,
      } = quoteResponse.quote;

      if (!receiver) return;

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
      const signedOrder = await cowSdk.signOrder(order);
      const signature = signedOrder?.signature;
      if (!signature) return;

      // Post the order
      const orderID = await cowSdk.cowApi.sendOrder({
        order: {
          ...order,
          ...signedOrder,
          signature,
        },
        owner: address,
      });
      setOrderId(orderID);
    } catch (err) {
      console.log(err);
    } finally {
      setPurchasing(false);
    }
  }, [address, targetNetwork.chainId, ethAmount, userProvider]);

  const handleBuyMoreNFTL = () => {
    setOrderId('');
    setInputEthAmount('');
    setInputNftlAmount('');
    setEthAmount('');
    setNftlAmount('');
  };

  const handleAddToken = () => {
    const params = {
      type: 'ERC20',
      options: {
        address: NFTLTokenAddress,
        symbol: 'NFTL',
        decimals: 18,
        image:
          'https://raw.githubusercontent.com/NiftyLeague/Nifty-League-Images/main/NFTL.png',
      },
    };
    if (userProvider?.provider?.request)
      userProvider.provider
        // @ts-expect-error ts-migrate(2740) FIXME: Type '{ type: string; options: { address: string; ... Remove this comment to see the full error message
        .request({ method: 'wallet_watchAsset', params })
        .then((success) => {
          // eslint-disable-next-line no-console
          if (success) console.log('Successfully added NFTL to MetaMask');
          else throw new Error('Something went wrong.');
        })
        .catch(console.error);
  };

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
        {!orderId ? (
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
                onClick={handleAddToken}
                fullWidth
                sx={{ height: '44px !important', lineHeight: '18px' }}
              >
                Add NFTL to Metamask
              </Button>
              <Button
                variant="contained"
                onClick={handleBuyMoreNFTL}
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
