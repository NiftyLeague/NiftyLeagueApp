import { useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from '@mui/material';

import IMXContext from 'contexts/IMXContext';

import Item1 from 'assets/images/comics/burner/wearables/1.gif';
import Item2 from 'assets/images/comics/burner/wearables/2.gif';
import Item3 from 'assets/images/comics/burner/wearables/3.gif';
import Item4 from 'assets/images/comics/burner/wearables/4.gif';
import Item5 from 'assets/images/comics/burner/wearables/5.gif';
import Item6 from 'assets/images/comics/burner/wearables/6.gif';
import Item7 from 'assets/images/comics/burner/wearables/7.gif';

const ITEMS = [
  { id: 1, name: 'CAPE', image: Item1 },
  { id: 2, name: 'HALO', image: Item2 },
  { id: 3, name: 'DIAMOND', image: Item3 },
  { id: 4, name: 'BREAD', image: Item4 },
  { id: 5, name: 'NL PURPLE', image: Item5 },
  { id: 6, name: 'COMPANION', image: Item6 },
];

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

const containerStyles = {
  height: 'auto',
  left: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'absolute',
  right: 0,
  width: 315,
  top: 950,
} as React.CSSProperties;

const gridStyles = {
  flexGrow: 1,
  rowGap: '0 !important',
  marginBottom: 0,
};

export default function ItemsGrid() {
  const classes = useStyles();
  const imx = useContext(IMXContext);

  return imx.loading ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      width={315}
      height={403}
      sx={{ ...containerStyles }}
    />
  ) : (
    <div style={containerStyles}>
      <div>ITEMS I OWN</div>
      <ImageList
        gap={10}
        cols={3}
        sx={{
          ...gridStyles,
        }}
      >
        {ITEMS.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={item.image}
              srcSet={item.image}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              classes={{ titleWrap: classes.titleWrap, title: classes.title }}
              title={
                <>
                  <span>{item.name}</span>
                  <span>
                    x
                    {imx.itemsBalance.find((i) => i.id === item.id)?.balance ||
                      0}
                  </span>
                </>
              }
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div style={{ textAlign: 'center' }}>
        <img
          src={Item7}
          srcSet={Item7}
          alt="CITADEL KEY"
          loading="lazy"
          width="31%"
        />
        <div className={classes.title} style={{ width: '38%', margin: 'auto' }}>
          <span>CITADEL KEY</span>
          <span>x{imx.itemsBalance.find((i) => i.id === 7)?.balance || 0}</span>
        </div>
      </div>
    </div>
  );
}
