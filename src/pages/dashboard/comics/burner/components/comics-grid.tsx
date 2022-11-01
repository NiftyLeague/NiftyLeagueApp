import { useState } from 'react';
import xor from 'lodash/xor';
import makeStyles from '@mui/styles/makeStyles';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from '@mui/material';

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

export default function ComicsGrid() {
  const classes = useStyles();
  const [selectedComics, setSelectedComics] = useState<Comic[]>([]);
  const { comicsBalance, loading: loadingComics } = useComicsBalance();

  const handleSelectComic = (comic) => {
    // xor creates an array of unique values that is the symmetric difference of the given arrays
    setSelectedComics(xor(selectedComics, [comic]));
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
            loading="lazy"
            style={{
              cursor: 'pointer',
              ...(selectedComics.includes(comic) && {
                boxShadow: '0 0 8px rgba(81, 203, 238, 1)',
                border: '2px solid rgba(81, 203, 238, 1)',
              }),
            }}
          />
          <ImageListItemBar
            classes={{ titleWrap: classes.titleWrap, title: classes.title }}
            title={
              <>
                <span>#{comic.id}</span>
                <span>{comic.balance}X</span>
              </>
            }
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
