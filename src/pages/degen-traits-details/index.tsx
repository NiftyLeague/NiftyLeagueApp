import { NFT_CONTRACT } from 'constants/contracts';
import { GET_DEGEN_DETAIL_URL } from 'constants/url';
import { NetworkContext } from 'NetworkProvider';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CharacterType, Degen, GetDegenResponse } from 'types/degens';
import { toast } from 'react-toastify';
import ViewTraitsContentDialog from 'components/dialog/DegenDialog/ViewTraitsContentDialog';
import { TRAIT_INDEXES } from 'constants/cosmeticsFilters';
import DegenDialog from 'components/dialog/DegenDialog';

const DegenTraitsDetailsPage = (): JSX.Element => {
  const { id: tokenId } = useParams();
  const { readContracts } = useContext(NetworkContext);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [character, setCharacter] = useState<CharacterType>({
    name: null,
    owner: null,
    traitList: [],
  });
  const [degenDetail, setDegenDetail] = useState<GetDegenResponse>();

  const degen = useMemo((): Degen | null => {
    if (character && degenDetail) {
      return {
        id: degenDetail.id,
        stats: degenDetail.stats as Object,
        rental_count: degenDetail.rental_count,
        is_active: degenDetail.is_active,
        last_rented_at: degenDetail.last_rented_at,
        total_rented: degenDetail.total_rented,
        price: degenDetail.price,
        price_daily: degenDetail.price_daily,
        tribe: degenDetail.degen.tribe,
        background: degenDetail.degen.background,
        traits_string: degenDetail.degen.traits_string,
        multiplier: degenDetail.multiplier,
        multipliers: degenDetail.multipliers,
        name: character.name as string,
        owner: character.owner as string,
        earning_cap: 0,
        earning_cap_daily: 0,
      };
    }
    return null;
  }, [character, degenDetail]);

  const { name, traitList } = character as unknown as {
    name: string;
    owner: string;
    traitList: number[];
  };

  const displayName = name || 'No Name DEGEN';
  const traits: { [traitType: string]: number } = traitList.reduce(
    (acc, trait, i) => ({ ...acc, [TRAIT_INDEXES[i]]: trait }),
    {},
  );

  const resetDialog = () => {
    setCharacter({
      name: null,
      owner: null,
      traitList: [],
    });
  };

  const getDegenDetail = useCallback(
    async (authToken) => {
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
    },
    [tokenId],
  );
  const getCharacter = useCallback(async () => {
    const characterData = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      name: await readContracts[NFT_CONTRACT].getName(tokenId),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      owner: await readContracts[NFT_CONTRACT].ownerOf(tokenId),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      traitList: await readContracts[NFT_CONTRACT].getCharacterTraits(tokenId),
    };
    setCharacter(characterData);
  }, [readContracts, tokenId]);

  useEffect(() => {
    const authToken = window.localStorage.getItem('authentication-token');

    if (tokenId && readContracts && readContracts[NFT_CONTRACT] && authToken) {
      // eslint-disable-next-line no-void
      void getCharacter();
      // eslint-disable-next-line no-void
      void getDegenDetail(authToken);
    } else {
      resetDialog();
    }
  }, [tokenId, readContracts, getCharacter, getDegenDetail]);

  return degen ? (
    <>
      <ViewTraitsContentDialog
        degen={degen}
        degenDetail={degenDetail}
        character={character}
        traits={traits}
        displayName={displayName}
        onRent={() => setOpenDialog(true)}
      />
      <DegenDialog
        open={openDialog}
        degen={degen}
        isRent={true}
        onClose={() => setOpenDialog(false)}
      />
    </>
  ) : (
    <></>
  );
};

export default DegenTraitsDetailsPage;
