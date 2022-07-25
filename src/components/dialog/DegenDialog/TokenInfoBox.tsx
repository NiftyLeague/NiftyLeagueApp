import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, InputBase, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { formatNumberToDisplay } from 'utils/numbers';
import { CONVERT_TOKEN_TO_USD_URL } from 'constants/url';

export interface TokenInfoBoxProps {
  balance: number;
  icon: React.ReactNode;
  name: string;
  slug: string;
  value: string;
  setValue: (value: string) => void;
}

const useStyles = makeStyles(() => ({
  swapBox: {
    background: '#161622',
    border: '1px solid #282B3F',
    borderRadius: '10px',
    padding: '12px 12px 4px 12px',
    height: 93,
    width: '100%',
  },
  tokenBox: {
    background: '#202230',
    borderRadius: '10px',
    width: 72,
  },
  infoUSD: {
    color: '#4D4D4F',
    position: 'absolute',
  },
}));

const TokenAmountInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    height: 36,
    fontSize: 36,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '::placeholder': {
      fontSize: 36,
      color: '#4D4D4F',
    },
  },
}));

const TokenInfoBox = ({
  balance,
  icon,
  name,
  slug,
  value,
  setValue,
}: TokenInfoBoxProps) => {
  const classes = useStyles();
  const [tokenPrice, setTokenPrice] = useState<number>(0);

  const fetchTokenUSDPrice = useCallback(() => {
    fetch(CONVERT_TOKEN_TO_USD_URL + slug, {
      method: 'GET',
    })
      .then(async (response) => {
        const json = await response.json();
        setTokenPrice(json.fiat.usd);
      })
      .catch((err) => {});
  }, [slug]);

  useEffect(() => {
    // Get Token USD Price
    fetchTokenUSDPrice();
    const timer = setInterval(() => {
      fetchTokenUSDPrice();
    }, 10000);
    return () => clearInterval(timer);
  }, [fetchTokenUSDPrice]);

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const newValue = e.target.value;
    if (!isNaN(Number(newValue))) {
      setValue(newValue);
    } else {
      e.preventDefault();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (['.', ','].includes(e.key)) {
      if (!value) {
        setValue('0.');
      } else if (e.key === ',' && !value.includes('.')) {
        setValue(value + '.');
      }
    }
  };

  const fillAmountAsBalance = useCallback(() => {
    setValue(balance.toString());
  }, [balance]);

  const price = useMemo(() => {
    if (!tokenPrice) return '';
    if (Number(value) === 0) {
      return formatNumberToDisplay(tokenPrice, tokenPrice < 1 ? 4 : 2);
    }
    const total = Number(value) * tokenPrice;
    return formatNumberToDisplay(total, total < 1 ? 4 : 2);
  }, [tokenPrice, value]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      className={classes.swapBox}
    >
      <Stack
        direction="row"
        alignItems="center"
        px={1}
        py={0.5}
        className={classes.tokenBox}
        spacing={0.5}
      >
        {icon}
        <Typography variant="body1" fontWeight="bold">
          {name}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        width="100%"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          flex={1}
          position="relative"
          overflow="hidden"
        >
          <TokenAmountInput
            inputProps={{
              autoComplete: 'off',
              autoCorrect: 'off',
              inputMode: 'decimal',
              minLength: 1,
              maxLength: 79,
              pattern: '^[0-9]*[.,]?[0-9]*$',
              title: 'Token Amount',
            }}
            placeholder="0.00"
            value={value}
            onChange={handleChangeValue}
            onKeyDown={handleKeyDown}
          />
          {value !== '0' && price && (
            <Typography
              variant="body1"
              fontWeight="bold"
              className={classes.infoUSD}
              sx={{ left: value.length > 0 ? value.length * 19 + 10 : 86 }}
            >
              {`~$${price}`}
            </Typography>
          )}
        </Stack>
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ color: '#4D4D4F', cursor: 'pointer' }}
          onClick={fillAmountAsBalance}
        >
          {`Balance: ${balance ? formatNumberToDisplay(balance) : '0.00'}`}
        </Typography>
      </Stack>
    </Box>
  );
};

export default TokenInfoBox;
