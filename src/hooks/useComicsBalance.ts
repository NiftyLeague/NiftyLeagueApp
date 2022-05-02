import { useContext, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { NetworkContext } from 'NetworkProvider';
import { COMICS_CONTRACT } from 'constants/contracts';
import COMICS from 'constants/comics';
import { Comic } from 'types/comic';

/*
  ~ What it does? ~

  Gets your comics NFT balance

  ~ How can I use? ~

  const yourBalance = useComicsBalance();
*/

export default function useComicsBalance(): Comic[] {
  const [comicsCount, setComicsCount] = useState<Comic[]>([]);
  const { address, readContracts } = useContext(NetworkContext);

  useEffect(() => {
    async function checkUserComics() {
      const ownerArr = [address, address, address, address, address, address];
      const comicIds = [1, 2, 3, 4, 5, 6];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const comicsData = await readContracts[COMICS_CONTRACT].balanceOfBatch(
        ownerArr,
        comicIds,
      );
      setComicsCount(comicsData);
      setComicsCount(
        comicsData.map((c: BigNumber, i: number) => ({
          ...COMICS[i],
          balance: c.toNumber(),
        })),
      );
    }
    if (address && readContracts && readContracts[COMICS_CONTRACT]) {
      // eslint-disable-next-line no-void
      void checkUserComics();
    }
  }, [address, readContracts]);

  return comicsCount;
}
