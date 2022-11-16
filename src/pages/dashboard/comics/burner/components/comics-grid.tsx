import { useMemo } from 'react';
import xor from 'lodash/xor';
import sum from 'lodash/sum';
import makeStyles from '@mui/styles/makeStyles';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
  TextField,
  InputAdornment,
} from '@mui/material';
import BurnIcon from '@mui/icons-material/Whatshot';

import useComicsBalance from 'hooks/useComicsBalance';
import { Comic } from 'types/comic';

const useStyles = makeStyles({
  titleWrap: {
    padding: 0,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
  },
  sums: {
    top: 432,
    left: 0,
    right: 0,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20,
    width: 300,
    display: 'flex',
    justifyContent: 'space-between',
    color: 'navy',
    fontWeight: 'bold',
  },
  keySum: {},
  itemSum: {},
});

const gridStyles = {
  flexGrow: 1,
  height: 'auto',
  left: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'absolute',
  right: 0,
  width: 315,
  top: 130,
  rowGap: '0 !important',
};

export default function ComicsGrid({
  burnCount,
  selectedComics,
  setBurnCount,
  setSelectedComics,
}: {
  burnCount: number[];
  selectedComics: Comic[];
  setBurnCount: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedComics: React.Dispatch<React.SetStateAction<Comic[]>>;
}) {
  const classes = useStyles();
  const { comicsBalance, loading: loadingComics } = useComicsBalance();
  const keyCount = useMemo(
    () => (burnCount.some((v) => v === 0) ? 0 : Math.min(...burnCount)),
    [burnCount],
  );
  const itemCount = useMemo(
    () => sum(burnCount) - keyCount * 6,
    [burnCount, keyCount],
  );

  const handleManualSetBurnCount = (comic: Comic, value: string) => {
    const newBurnCount = [...burnCount];
    newBurnCount[comic.id - 1] = !value ? 0 : parseInt(value);
    setBurnCount(newBurnCount);
  };

  const handleUpdateBurnCount = (comic: Comic, newSelectedComics: Comic[]) => {
    const removed = !newSelectedComics.includes(comic);
    const newBurnCount = [...burnCount];
    if (removed) {
      newBurnCount[comic.id - 1] = 0;
    } else {
      const comicCount =
        comicsBalance.find((c) => c.id === comic.id)?.balance || 0;
      newBurnCount[comic.id - 1] = comicCount;
    }
    setBurnCount(newBurnCount);
  };

  const handleSelectComic = (comic: Comic) => {
    // xor creates an array of unique values that is the symmetric difference of the given arrays
    const newSelectedComics = xor(selectedComics, [comic]);
    setSelectedComics(newSelectedComics);
    handleUpdateBurnCount(comic, newSelectedComics);
  };

  return loadingComics ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      width={315}
      height={265}
      sx={{ ...gridStyles }}
    />
  ) : (
    <>
      <ImageList
        gap={10}
        cols={3}
        sx={{
          ...gridStyles,
        }}
      >
        {comicsBalance.map((comic) => (
          <ImageListItem key={comic.image}>
            <img
              src={`${comic.image}?w=248&fit=crop&auto=format`}
              srcSet={`${comic.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={comic.title}
              onClick={() => handleSelectComic(comic)}
              style={{
                cursor: 'pointer',
                ...(selectedComics.includes(comic) && {
                  boxShadow: '0 0 8px rgba(81, 203, 238, 1)',
                  border: '3px solid rgba(81, 203, 238, 1)',
                }),
              }}
            />
            <ImageListItemBar
              classes={{ titleWrap: classes.titleWrap, title: classes.title }}
              title={
                selectedComics.includes(comic) ? (
                  <TextField
                    value={burnCount[comic.id - 1]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleManualSetBurnCount(comic, event.target.value);
                    }}
                    size="small"
                    sx={{ m: 0, width: 98 }}
                    type="number"
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      min: 0,
                      max:
                        comicsBalance.find((c) => c.id === comic.id)?.balance ||
                        0,
                      style: {
                        textAlign: 'center',
                        padding: 2.5,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BurnIcon sx={{ fontSize: 14 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <>
                    <span>#{comic.id}</span>
                    <span>{comic.balance}X</span>
                  </>
                )
              }
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div className={classes.sums}>
        <span className={classes.keySum}>{keyCount} Keys</span>
        <span className={classes.itemSum}>{itemCount} Items</span>
      </div>
    </>
  );
}
