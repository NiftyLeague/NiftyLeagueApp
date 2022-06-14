import { Dialog, DialogProps, useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NFT_CONTRACT } from 'constants/contracts';
// TODO: Please remove the comment if you want to use the following code.
// import { TRAIT_INDEXES } from 'constants/cosmeticsFilters';
import { NetworkContext } from 'NetworkProvider';
import { useContext, useEffect, useState, createContext } from 'react';
import {
  CharacterType,
  Degen,
  DegenViewType,
  GetDegenResponse,
} from 'types/degens';
import { GET_DEGEN_DETAIL_URL } from 'constants/url';
import { DEBUG } from 'constants/index';
import { toast } from 'react-toastify';
import DegenRent from 'components/degens/DegenRent';
import DegenTraits from 'components/degens/DegenTraits';
import DegenAddWhitelist from 'components/degens/DegenAddWhitelist';
import DegenInGameEarning from 'components/degens/DegenInGameEarning';
import DegenClaim from 'components/degens/DegenClaim';

export interface DegenDialogProps extends DialogProps {
  degen?: Degen;
  view: DegenViewType;
}

export const DialogDegenContext = createContext({
  isDialog: false,
});

const DegenDialog = ({
  open,
  degen,
  onClose,
  view = 'rent',
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

  const renderView = () => {
    const degenProps = {
      isDialog: true,
      degen,
      onClose: handleClose,
    };
    switch (view) {
      case 'rent':
        return <DegenRent {...degenProps} />;
      case 'traits':
        return <DegenTraits {...degenProps} />;
      case 'addWhiteList':
        return <DegenAddWhitelist {...degenProps} />;
      case 'inGameEarning':
        return <DegenInGameEarning {...degenProps} />;
      case 'claim':
        return <DegenClaim {...degenProps} />;
      case 'default':
      default:
        return (
          <Typography>
            Please close this dialog and try open it again.
          </Typography>
        );
    }
  };

  return (
    <Dialog
      maxWidth="xs"
      scroll="body"
      fullScreen={fullScreen}
      onClose={handleClose}
      open={open}
      PaperProps={{ sx: { paddingY: 0 } }}
      {...rest}
    >
      <DialogDegenContext.Provider
        value={{
          isDialog: true,
        }}
      >
        {renderView()}
      </DialogDegenContext.Provider>
    </Dialog>
  );
};

export default DegenDialog;
