import { Dialog, DialogProps, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NFT_CONTRACT } from 'constants/contracts';
import { TRAIT_INDEXES } from 'constants/cosmeticsFilters';
import { NetworkContext } from 'NetworkProvider';
import { useContext, useEffect, useState } from 'react';
import { CharacterType, Degen } from 'types/degens';
import RentDegenContentDialog from './RentDegenContentDialog';
import ClaimDegenContentDialog from './ClaimDegenContentDialog';
import ViewTraitsContentDialog from './ViewTraitsContentDialog';

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
    if (open && tokenId && readContracts && readContracts[NFT_CONTRACT]) {
      // eslint-disable-next-line no-void
      void getCharacter();
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
      maxWidth="sm"
      fullWidth
      scroll="body"
      fullScreen={fullScreen}
      onClose={handleClose}
      open={open}
      {...rest}
    >
      {isClaim && (
        <ClaimDegenContentDialog degen={degen} onClose={handleClose} />
      )}
      {isRent && <RentDegenContentDialog degen={degen} onClose={handleClose} />}
      <ViewTraitsContentDialog
        degen={degen}
        character={character}
        traits={traits}
        displayName={displayName}
        onClaim={() => setIsClaim(true)}
        onClose={handleClose}
      />
    </Dialog>
  );
};

export default DegenDialog;
