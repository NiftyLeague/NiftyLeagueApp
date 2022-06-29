import { Dialog, DialogProps, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NFT_CONTRACT } from 'constants/contracts';
import { TRAIT_INDEXES } from 'constants/cosmeticsFilters';
import { NetworkContext } from 'NetworkProvider';
import { useContext, useEffect, useState } from 'react';
import { CharacterType, Degen, GetDegenResponse } from 'types/degens';
import RentDegenContentDialog from './RentDegenContentDialog';
import ClaimDegenContentDialog from './ClaimDegenContentDialog';
import ViewTraitsContentDialog from './ViewTraitsContentDialog';
import { GET_DEGEN_DETAIL_URL } from 'constants/url';
import { DEBUG } from 'constants/index';
import { toast } from 'react-toastify';

export interface DegenDialogProps extends DialogProps {
  degen?: Degen;
  isRent?: boolean;
  setIsRent?: React.Dispatch<React.SetStateAction<boolean>>;
  isClaim?: boolean;
  setIsClaim?: React.Dispatch<React.SetStateAction<boolean>>;
  onRent?: (degen: Degen) => void;
}

const DegenDialog = ({
  open,
  degen,
  isRent,
  setIsRent,
  isClaim,
  setIsClaim,
  onRent,
  onClose,
  ...rest
}: DegenDialogProps) => {
  const theme = useTheme();
  const tokenId = degen?.id || 0;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { readContracts } = useContext(NetworkContext);
  const [degenDetail, setDegenDetail] = useState<GetDegenResponse>();
  const [character, setCharacter] = useState<CharacterType>({
    name: null,
    owner: null,
    traitList: [],
  });
  const { name, traitList } = character as unknown as {
    name: string;
    owner: string;
    traitList: number[];
  };
  const resetDialog = () => {
    setCharacter({
      name: null,
      owner: null,
      traitList: [],
    });
  };

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

    async function getDegenDetail() {
      if (!tokenId || !authToken) {
        return;
      }

      try {
        const res = await fetch(GET_DEGEN_DETAIL_URL(tokenId), {
          method: 'GET',
          headers: { authorizationToken: authToken },
        });

        if (res.status === 404) {
          throw Error('Not Found');
        }
        const json = await res.json();
        setDegenDetail(json);
      } catch (err) {
        if (DEBUG) console.error(err.message);
        toast.error(err.message, { theme: 'dark' });
      }
    }

    if (
      open &&
      tokenId &&
      readContracts &&
      readContracts[NFT_CONTRACT] &&
      authToken
    ) {
      // eslint-disable-next-line no-void
      void getCharacter();
      // eslint-disable-next-line no-void
      void getDegenDetail();
    } else {
      resetDialog();
    }
  }, [tokenId, readContracts, open]);

  const displayName = name || 'No Name DEGEN';
  const traits: { [traitType: string]: number } = traitList.reduce(
    (acc, trait, i) => ({ ...acc, [TRAIT_INDEXES[i]]: trait }),
    {},
  );

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClose?.(event, 'backdropClick');
  };

  return (
    <Dialog
      maxWidth={isRent ? 'md' : 'sm'}
      fullWidth={isClaim ? false : true}
      scroll="body"
      fullScreen={fullScreen}
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.background.default
              : theme.palette.background.paper,
        },
      }}
      {...rest}
    >
      {isClaim && (
        <ClaimDegenContentDialog degen={degen} onClose={handleClose} />
      )}
      {isRent && <RentDegenContentDialog degen={degen} onClose={handleClose} />}
      {!isRent && !isClaim && setIsRent && (
        <ViewTraitsContentDialog
          degen={degen}
          degenDetail={degenDetail}
          character={character}
          traits={traits}
          displayName={displayName}
          onRent={() => setIsRent(true)}
          onClose={handleClose}
        />
      )}
      {!isRent && !isClaim && setIsClaim && (
        <ViewTraitsContentDialog
          degen={degen}
          degenDetail={degenDetail}
          character={character}
          traits={traits}
          displayName={displayName}
          onClaim={() => setIsClaim(true)}
          onClose={handleClose}
        />
      )}
    </Dialog>
  );
};

export default DegenDialog;
