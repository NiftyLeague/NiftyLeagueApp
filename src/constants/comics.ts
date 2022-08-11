import { Comic, Item } from 'types/comic';

import ComicP1 from 'assets/images/comics/page1.png';
import ComicP2 from 'assets/images/comics/page2.png';
import ComicP3 from 'assets/images/comics/page3.png';
import ComicP4 from 'assets/images/comics/page4.png';
import ComicP5 from 'assets/images/comics/page5.png';
import ComicP6 from 'assets/images/comics/page6.png';

import ComicThumbnailP1 from 'assets/images/comics/thumbnail/page1.png';
import ComicThumbnailP2 from 'assets/images/comics/thumbnail/page2.png';
import ComicThumbnailP3 from 'assets/images/comics/thumbnail/page3.png';
import ComicThumbnailP4 from 'assets/images/comics/thumbnail/page4.png';
import ComicThumbnailP5 from 'assets/images/comics/thumbnail/page5.png';
import ComicThumbnailP6 from 'assets/images/comics/thumbnail/page6.png';

import ItemP1 from 'assets/images/comics/items/1.gif';
import ItemP2 from 'assets/images/comics/items/2.gif';
import ItemP3 from 'assets/images/comics/items/3.gif';
import ItemP4 from 'assets/images/comics/items/4.gif';
import ItemP5 from 'assets/images/comics/items/5.gif';
import ItemP6 from 'assets/images/comics/items/6.gif';

import ItemThumbnailP1 from 'assets/images/comics/items/thumbnail/1.png';
import ItemThumbnailP2 from 'assets/images/comics/items/thumbnail/2.png';
import ItemThumbnailP3 from 'assets/images/comics/items/thumbnail/3.png';
import ItemThumbnailP4 from 'assets/images/comics/items/thumbnail/4.png';
import ItemThumbnailP5 from 'assets/images/comics/items/thumbnail/5.png';
import ItemThumbnailP6 from 'assets/images/comics/items/thumbnail/6.png';

import ItemEmptyP1 from 'assets/images/comics/items/empty/1.svg';
import ItemEmptyP2 from 'assets/images/comics/items/empty/2.svg';
import ItemEmptyP3 from 'assets/images/comics/items/empty/3.svg';
import ItemEmptyP4 from 'assets/images/comics/items/empty/4.svg';
import ItemEmptyP5 from 'assets/images/comics/items/empty/5.svg';
import ItemEmptyP6 from 'assets/images/comics/items/empty/6.svg';

export const COMICS: Comic[] = [
  {
    id: 1,
    title: 'Comic',
    multiplier: 1.5,
    wearableName: 'Cape',
    viewsCount: 0,
    image: ComicP1,
    thumbnail: ComicThumbnailP1,
  },
  {
    id: 2,
    title: 'Comic',
    multiplier: 1.5,
    wearableName: 'Halo',
    viewsCount: 0,
    image: ComicP2,
    thumbnail: ComicThumbnailP2,
  },
  {
    id: 3,
    title: 'Comic',
    multiplier: 1.5,
    wearableName: 'Diamond Bat',
    viewsCount: 0,
    image: ComicP3,
    thumbnail: ComicThumbnailP3,
  },
  {
    id: 4,
    title: 'Comic',
    multiplier: 1.5,
    wearableName: 'Bread Bat',
    viewsCount: 0,
    image: ComicP4,
    thumbnail: ComicThumbnailP4,
  },
  {
    id: 5,
    title: 'Comic',
    multiplier: 1.5,
    wearableName: 'Purple Bat',
    viewsCount: 0,
    image: ComicP5,
    thumbnail: ComicThumbnailP5,
  },
  {
    id: 6,
    title: 'Comic',
    multiplier: 1.5,
    wearableName: 'Companion Character',
    viewsCount: 0,
    image: ComicP6,
    thumbnail: ComicThumbnailP6,
  },
];

export const ITEMS: Item[] = [
  {
    id: 1,
    title: 'Cape',
    multiplier: 2,
    wearableName: '',
    balance: 0,
    image: ItemP1,
    thumbnail: ItemThumbnailP1,
    empty: ItemEmptyP1,
  },
  {
    id: 2,
    title: 'Companion',
    multiplier: 1,
    wearableName: '',
    balance: 0,
    image: ItemP2,
    thumbnail: ItemThumbnailP2,
    empty: ItemEmptyP2,
    isNew: true,
  },
  {
    id: 3,
    title: 'Halo',
    multiplier: 1,
    wearableName: '',
    balance: 0,
    image: ItemP3,
    thumbnail: ItemThumbnailP3,
    empty: ItemEmptyP3,
    equipped: true,
  },
  {
    id: 4,
    title: 'Diamond Bat',
    multiplier: 1,
    wearableName: '',
    balance: 0,
    image: ItemP4,
    thumbnail: ItemThumbnailP4,
    empty: ItemEmptyP4,
  },
  {
    id: 5,
    title: 'Purple Bat',
    multiplier: 1,
    wearableName: '',
    balance: 0,
    image: ItemP5,
    thumbnail: ItemThumbnailP5,
    empty: ItemEmptyP5,
  },
  {
    id: 6,
    title: 'Bread Bat',
    multiplier: 1,
    wearableName: '',
    balance: 0,
    image: ItemP6,
    thumbnail: ItemThumbnailP6,
    empty: ItemEmptyP6,
  },
];
