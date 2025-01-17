'use client';

import { Dialog, DialogProps, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { DEGEN_CONTRACT } from '@/constants/contracts';
import { TRAIT_INDEXES } from '@/constants/cosmeticsFilters';
import NetworkContext from '@/contexts/NetworkContext';
import { useContext, useEffect, useState } from 'react';
import type { CharacterType, Degen, GetDegenResponse } from '@/types/degens';
import RentDegenContentDialog from './RentDegenContentDialog';
import ClaimDegenContentDialog from './ClaimDegenContentDialog';
import ViewTraitsContentDialog from './ViewTraitsContentDialog';
import { GET_DEGEN_DETAIL_URL } from '@/constants/url';
import { errorMsgHandler } from '@/utils/errorHandlers';
import { toast } from 'react-toastify';
import EquipDegenContentDialog from './EquipDegenContentDialog';
import useAuth from '@/hooks/useAuth';

export interface DegenDialogProps extends DialogProps {
  degen?: Degen;
  isRent?: boolean;
  setIsRent?: React.Dispatch<React.SetStateAction<boolean>>;
  isClaim?: boolean;
  setIsClaim?: React.Dispatch<React.SetStateAction<boolean>>;
  isEquip?: boolean;
  setIsEquip?: React.Dispatch<React.SetStateAction<boolean>>;
  onRent?: (degen: Degen) => void;
}

const CustomDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'isRent' && prop !== 'isEquip',
})<{ isRent?: boolean; isEquip?: boolean }>(({ theme, isRent, isEquip }) => ({
  '& .MuiPaper-root': {
    overflowX: 'hidden',
    minWidth: isRent ? 550 : 'inherit',
    [theme.breakpoints.down('md')]: {
      minWidth: 'inherit',
      margin: isRent || isEquip ? 16 : 'inherit',
      maxWidth: isRent || isEquip ? 'calc(100% - 32px) !important' : 'inherit',
      width: isRent || isEquip ? 'calc(100% - 32px) !important' : 'inherit',
      height: isRent || isEquip ? 'auto' : 'inherit',
      borderRadius: isRent || isEquip ? '10px' : 'inherit',
    },
  },
}));

const DegenDialog = ({
  open,
  degen,
  isRent,
  setIsRent,
  isClaim,
  setIsClaim,
  onRent,
  isEquip,
  setIsEquip,
  onClose,
  ...rest
}: DegenDialogProps) => {
  const theme = useTheme();
  const tokenId = degen?.id || 0;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { readContracts } = useContext(NetworkContext);
  const { authToken } = useAuth();
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
    async function getCharacter() {
      const characterData = {
        name: await readContracts[DEGEN_CONTRACT].getName(tokenId),
        owner: await readContracts[DEGEN_CONTRACT].ownerOf(tokenId),
        traitList:
          await readContracts[DEGEN_CONTRACT].getCharacterTraits(tokenId),
      };
      setCharacter(characterData);
    }

    async function getDegenDetail() {
      if (!tokenId || !authToken) return;
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
        toast.error(errorMsgHandler(err), { theme: 'dark' });
      }
    }

    if (open && tokenId && readContracts && readContracts[DEGEN_CONTRACT]) {
      // eslint-disable-next-line no-void
      void getCharacter();
      // eslint-disable-next-line no-void
      void getDegenDetail();
    } else {
      resetDialog();
    }
  }, [tokenId, readContracts, open, authToken]);

  const displayName = name || 'No Name DEGEN';
  const traits: { [traitType: string]: number } = traitList.reduce(
    (acc, trait, i) => ({ ...acc, [TRAIT_INDEXES[i]]: trait }),
    {},
  );

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClose?.(event, 'backdropClick');
  };

  return (
    <CustomDialog
      maxWidth={isRent ? 'xs' : 'sm'}
      fullWidth={isClaim ? false : true}
      scroll="body"
      fullScreen={isEquip ? false : fullScreen}
      onClose={handleClose}
      open={open}
      isRent={isRent}
      isEquip={isEquip}
      {...rest}
    >
      {isClaim && (
        <ClaimDegenContentDialog degen={degen} onClose={handleClose} />
      )}
      {isEquip && <EquipDegenContentDialog degen={degen} name={name} />}
      {isRent && <RentDegenContentDialog degen={degen} onClose={handleClose} />}
      {!isRent && !isClaim && !isEquip && setIsRent && (
        <ViewTraitsContentDialog
          degen={degen}
          degenDetail={degenDetail}
          traits={traits}
          displayName={displayName}
          onRent={() => setIsRent(true)}
          onClose={handleClose}
        />
      )}
      {!isRent && !isClaim && !isEquip && setIsClaim && (
        <ViewTraitsContentDialog
          degen={degen}
          degenDetail={degenDetail}
          traits={traits}
          displayName={displayName}
          onClaim={() => setIsClaim(true)}
          onClose={handleClose}
        />
      )}
    </CustomDialog>
  );
};

export default DegenDialog;
