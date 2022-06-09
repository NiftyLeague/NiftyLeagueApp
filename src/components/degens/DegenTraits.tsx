import {
  Stack,
  Typography,
  Skeleton,
  Pagination,
  PaginationItem,
} from '@mui/material';
import { useState, useEffect, useContext, useMemo } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { sendEvent } from 'utils/google-analytics';
import { v4 as uuidv4 } from 'uuid';

import { CharacterType, Degen } from 'types/degens';
import HeaderDegen from './HeaderDegen';
import { NFT_CONTRACT } from 'constants/contracts';
import {
  TRAIT_INDEXES,
  TRAIT_KEY_VALUE_MAP,
  TRAIT_NAME_MAP,
} from 'constants/cosmeticsFilters';
import usePagination from 'hooks/usePagination';

import DegenContainer from './DegenContainer';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

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
  const { readContracts } = useContext(NetworkContext);
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

  const { jump, dataForCurrentPage, maxPage, currentPage } = usePagination(
    traitsData,
    12,
  );

  return (
    <DegenContainer>
      <HeaderDegen
        degen={degen}
        isDialog={isDialog}
        onBack={onBack}
        onFullScreen={onFullScreen}
        onClose={onClose}
      />
      {!dataForCurrentPage.length
        ? [...Array(10)].map(() => (
            <Stack gap={4} key={uuidv4()}>
              <Stack direction="row" justifyContent="space-between">
                <Skeleton animation="wave" width={60} />
                <Skeleton animation="wave" width={40} />
              </Stack>
            </Stack>
          ))
        : dataForCurrentPage.map(({ label, value }) => (
            <Stack gap={4} key={`${label}-${value}`}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="paragraphXXSmall" fontWeight="500">
                  {label}
                </Typography>
                <Typography
                  variant="paragraphXXSmall"
                  sx={{ textDecoration: 'underline ' }}
                >
                  {value}
                </Typography>
              </Stack>
            </Stack>
          ))}
      {dataForCurrentPage.length > 0 && (
        <Stack
          alignItems="center"
          justifyContent="center"
          position="absolute"
          sx={{ left: 0, right: 0, bottom: '4px' }}
        >
          <Pagination
            count={maxPage}
            page={currentPage}
            color="primary"
            sx={{
              '& ul': {
                '& li': {
                  display: 'none',
                  '& button': {
                    margin: 0,
                  },
                },
                '& li:first-child, & li:last-child': {
                  display: 'block',
                },
              },
            }}
            onChange={(e: React.ChangeEvent<unknown>, p: number) => jump(p)}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowCircleLeftIcon,
                  next: ArrowCircleRightIcon,
                }}
                {...item}
              />
            )}
          />
        </Stack>
      )}
    </DegenContainer>
  );
};

export default DegenTraits;
