'use client';

import { useContext, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import NetworkContext from '@/contexts/NetworkContext';
import { COMICS_CONTRACT } from '@/constants/contracts';
import { COMICS } from '@/constants/comics';
import { Comic } from '@/types/comic';

/*
  ~ What it does? ~

  Gets your comics NFT balance

  ~ How can I use? ~

  const yourBalance = useComicsBalance();
*/

export default function useComicsBalance(refreshKey = 0): {
  comicsBalance: Comic[];
  loading: boolean;
} {
  const [loading, setLoading] = useState(true);
  const [comicsBalance, setComicsBal] = useState<Comic[]>([]);
  const { address, readContracts } = useContext(NetworkContext);

  useEffect(() => {
    async function checkUserComics() {
      const ownerArr = [address, address, address, address, address, address];
      const comicIds = [1, 2, 3, 4, 5, 6];
      const comicsData = await readContracts[COMICS_CONTRACT].balanceOfBatch(
        ownerArr,
        comicIds,
      );
      setComicsBal(comicsData);
      setComicsBal(
        comicsData.map((c: BigNumber, i: number) => ({
          ...COMICS[i],
          balance: c.toNumber(),
        })),
      );
      setLoading(false);
    }
    if (!address?.length) {
      setLoading(false);
      setComicsBal([]);
    }

    if (address?.length && readContracts && readContracts[COMICS_CONTRACT]) {
      // eslint-disable-next-line no-void
      void checkUserComics();
    }
  }, [address, readContracts, refreshKey]);

  return { comicsBalance, loading };
}
