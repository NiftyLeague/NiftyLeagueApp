import { Comic } from 'types/comic';

import ComicP1 from 'assets/images/comics/page1.png';
import ComicP2 from 'assets/images/comics/page2.png';
import ComicP3 from 'assets/images/comics/page3.png';
import ComicP4 from 'assets/images/comics/page4.png';
import ComicP5 from 'assets/images/comics/page5.png';
import ComicP6 from 'assets/images/comics/page6.png';

const COMICS: Comic[] = [
  {
    id: 1,
    title: 'Comic',
    multiplier: 1.5,
    wearableName: 'Cape',
    viewsCount: 0,
    image: ComicP1,
  },
  {
    id: 2,
    title: 'Comic',
    multiplier: 1.5,
    wearableName: 'Halo',
    viewsCount: 0,
    image: ComicP2,
  },
  {
    id: 3,
    title: 'Comic',
    multiplier: 1.5,
    wearableName: 'Diamond Bat',
    viewsCount: 0,
    image: ComicP3,
  },
  {
    id: 4,
    title: 'Comic',
    multiplier: 1.5,
    wearableName: 'Bread Bat',
    viewsCount: 0,
    image: ComicP4,
  },
  {
    id: 5,
    title: 'Comic',
    multiplier: 1.5,
    wearableName: 'Purple Bat',
    viewsCount: 0,
    image: ComicP5,
  },
  {
    id: 6,
    title: 'Comic',
    multiplier: 1.5,
    wearableName: 'Companion Character',
    viewsCount: 0,
    image: ComicP6,
  },
];

export default COMICS;
