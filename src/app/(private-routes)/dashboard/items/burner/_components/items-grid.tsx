import { useContext } from 'react';
import Image from 'next/image';
import makeStyles from '@mui/styles/makeStyles';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from '@mui/material';

import IMXContext from '@/contexts/IMXContext';

const ITEMS = [
  { id: 1, name: 'CAPE', image: '/images/comics/burner/wearables/1.gif' },
  { id: 2, name: 'HALO', image: '/images/comics/burner/wearables/2.gif' },
  { id: 3, name: 'DIAMOND', image: '/images/comics/burner/wearables/3.gif' },
  { id: 4, name: 'BREAD', image: '/images/comics/burner/wearables/4.gif' },
  { id: 5, name: 'NL PURPLE', image: '/images/comics/burner/wearables/5.gif' },
  { id: 6, name: 'COMPANION', image: '/images/comics/burner/wearables/6.gif' },
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

export default function ItemsGrid({ itemCounts }: { itemCounts: number[] }) {
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
            <Image
              src={item.image}
              alt={item.name}
              loading="lazy"
              width={98}
              height={98}
              style={{ width: '100%', height: 'auto' }}
            />
            <ImageListItemBar
              classes={{ titleWrap: classes.titleWrap, title: classes.title }}
              title={
                <>
                  <span>{item.name}</span>
                  <span>x{itemCounts[item.id - 1]}</span>
                </>
              }
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div style={{ textAlign: 'center' }}>
        <Image
          src="/images/comics/burner/wearables/7.gif"
          alt="CITADEL KEY"
          loading="lazy"
          width={98}
          height={98}
          style={{ width: '31%', height: 'auto' }}
        />
        <div className={classes.title} style={{ width: '35%', margin: 'auto' }}>
          <span>CITADEL KEY</span>
          <span>x{itemCounts[6]}</span>
        </div>
      </div>
    </div>
  );
}
