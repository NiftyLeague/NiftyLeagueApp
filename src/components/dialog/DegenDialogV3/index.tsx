import { Dialog, DialogProps, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NFT_CONTRACT } from 'constants/contracts';
// TODO: Please remove the comment if you want to use the following code.
// import { TRAIT_INDEXES } from 'constants/cosmeticsFilters';
import { NetworkContext } from 'NetworkProvider';
import { useContext, useEffect, useState } from 'react';
import { CharacterType, Degen, GetDegenResponse } from 'types/degens';
import { GET_DEGEN_DETAIL_URL } from 'constants/url';
import { DEBUG } from 'constants/index';
import { toast } from 'react-toastify';
import DegenRent from 'components/degens/DegenRent';

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
  // TODO: Please add `degenDetail` after you implement the function.
  const [, setDegenDetail] = useState<GetDegenResponse>();
  // TODO: Please add `character` after you implement the function.
  const [, setCharacter] = useState<CharacterType>({
    name: null,
    owner: null,
    traitList: [],
  });
  // TODO: Please remove the comment if you want to use the following code.
  // const { name, traitList } = character as unknown as {
  //   name: string;
  //   owner: string;
  //   traitList: number[];
  // };
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

  // TODO: Please remove the comment if you want to use the following code.
  // const displayName = name || 'No Name DEGEN';
  // const traits: { [traitType: string]: number } = traitList.reduce(
  //   (acc, trait, i) => ({ ...acc, [TRAIT_INDEXES[i]]: trait }),
  //   {},
  // );

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    onClose?.(event, 'backdropClick');
  };

  return (
    <Dialog
      maxWidth="xs"
      fullWidth={isClaim ? false : true}
      scroll="body"
      fullScreen={fullScreen}
      onClose={handleClose}
      open={open}
      {...rest}
    >
      {/* {isClaim && (
        <ClaimDegenContentDialog degen={degen} onClose={handleClose} />
      )} */}
      {isRent && <DegenRent isDialog degen={degen} onClose={handleClose} />}
      {/* {!isRent && !isClaim && setIsRent && (
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
      )} */}
    </Dialog>
  );
};

export default DegenDialog;