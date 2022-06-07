import {
  Stack,
  Typography,
  SxProps,
  Skeleton,
  IconButton,
} from '@mui/material';
import { CharacterType, Degen } from 'types/degens';
import HeaderDegen from './HeaderDegen';
import { Theme } from '@mui/material/styles';
import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { NFT_CONTRACT } from 'constants/contracts';
import {
  TRAIT_INDEXES,
  TRAIT_KEY_VALUE_MAP,
  TRAIT_NAME_MAP,
} from 'constants/cosmeticsFilters';
import { sendEvent } from 'utils/google-analytics';
import { v4 as uuidv4 } from 'uuid';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import DegenContainer from './DegenContainer';

export interface DegenTraitsProps {
  degen?: Degen;
  isDialog?: boolean;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  onBack?: React.MouseEventHandler<HTMLDivElement>;
  onFullScreen?: React.MouseEventHandler<HTMLDivElement>;
}

const DegenTraits = ({
  degen,
  isDialog,
  onClose,
  onBack,
  onFullScreen,
}: DegenTraitsProps) => {
  const tokenId = degen?.id || 0;
  const typographySetting: SxProps<Theme> = { textDecoration: 'underline ' };
  const { readContracts } = useContext(NetworkContext);
  const [pagination, setPagination] = useState<{
    limit: number;
    offset: number;
  }>({ limit: 10, offset: 0 });
  const [character, setCharacter] = useState<CharacterType>({
    name: null,
    owner: null,
    traitList: [],
  });

  useEffect(() => {
    sendEvent('view_item', 'engagement');
  }, []);

  useEffect(() => {
    const authToken = window.localStorage.getItem('authentication-token');
    async function getCharacter() {
      const characterData = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        name: await readContracts[NFT_CONTRACT].getName(tokenId),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        owner: await readContracts[NFT_CONTRACT].ownerOf(tokenId),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        traitList: await readContracts[NFT_CONTRACT].getCharacterTraits(
          tokenId,
        ),
      };
      setCharacter(characterData);
    }

    if (tokenId && readContracts && readContracts[NFT_CONTRACT] && authToken) {
      // eslint-disable-next-line no-void
      void getCharacter();
    }
  }, [tokenId, readContracts]);

  const { traitList } = character;
  const traits: { [traitType: string]: number } = traitList.reduce(
    (acc, trait, i) => ({ ...acc, [TRAIT_INDEXES[i]]: trait }),
    {},
  );

  const traitsData = useMemo(
    () =>
      Object.entries(traits)
        .filter(([, value]) => parseInt(value as unknown as string, 10) > 0)
        .map(([key, value]) => ({
          label: TRAIT_NAME_MAP[key],
          value: TRAIT_KEY_VALUE_MAP[value] ?? value,
        })),
    [traits],
  );

  const handleNext = useCallback(() => {
    setPagination({
      ...pagination,
      offset: pagination.offset + pagination.limit,
    });
  }, [pagination]);

  const handlePrevious = useCallback(() => {
    if (pagination.offset - pagination.limit >= 0) {
      setPagination({
        ...pagination,
        offset: pagination.offset - pagination.limit,
      });
    }
  }, [pagination]);

  return (
    <DegenContainer>
      <HeaderDegen
        degen={degen}
        isDialog={isDialog}
        onBack={onBack}
        onFullScreen={onFullScreen}
        onClose={onClose}
      />
      {!traitList.length
        ? [...Array(10)].map(() => (
            <Stack gap={4} key={uuidv4()}>
              <Stack direction="row" justifyContent="space-between">
                <Skeleton animation="wave" width={60} />
                <Skeleton animation="wave" width={40} />
              </Stack>
            </Stack>
          ))
        : traitsData
            .slice(pagination.offset, pagination.offset + pagination.limit)
            .map(({ label, value }) => (
              <Stack gap={4} key={`${label}-${value}`}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="paragraphXXSmall" fontWeight="500">
                    {label}
                  </Typography>
                  <Typography variant="paragraphXXSmall" sx={typographySetting}>
                    {value}
                  </Typography>
                </Stack>
              </Stack>
            ))}
      <Stack
        gap={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        sx={{ left: 0, right: 0, bottom: '12px' }}
      >
        <IconButton disabled={pagination.offset === 0} onClick={handlePrevious}>
          <ArrowCircleDownIcon sx={{ transform: 'rotate(90deg)' }} />
        </IconButton>
        <IconButton
          disabled={
            traitsData.length < pagination.offset + (pagination.limit + 1)
          }
          onClick={handleNext}
        >
          <ArrowCircleDownIcon sx={{ transform: 'rotate(-0.25turn)' }} />
        </IconButton>
      </Stack>
    </DegenContainer>
  );
};

export default DegenTraits;
