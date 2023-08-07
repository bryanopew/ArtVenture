import {Dimensions} from 'react-native';

// device size guideline & multiply scale
const guidelineBaseWidth = 360;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const _MPY_ = SCREEN_WIDTH / guidelineBaseWidth;

// common
export const TOP_BAR_HEIGHT = 55;

// Home
export const HOME_ART_HEIGHT = 166 * _MPY_;

///////////////////////////// test
export const testArts = [
  {
    name: 'test1',
    id: '1',
    uri: 'https://drive.google.com/uc?export=view&id=1VNzVcpOqKsa1EhpslYtP4gPP7qNDIqXZ',
    year: '1990',
  },
  {
    name: 'test2',
    id: '2',
    uri: 'https://drive.google.com/uc?export=view&id=1lMwt-QXHaR16TWhICNuT29mdJ6LV4_RO',
    year: '1990',
  },
  {
    name: 'test3',
    id: '3',
    uri: 'https://drive.google.com/uc?export=view&id=1aoZ62402vjdQ1aAWpTt31xjjW1AanTaY',
    year: '1990',
  },
  {
    name: 'test4',
    id: '4',
    uri: 'https://drive.google.com/uc?export=view&id=1M7dP3apFOsZhKDyMyI1wrhd8o7gIOR7F',
    year: '1990',
  },
  {
    name: 'test5',
    id: '5',
    uri: 'https://drive.google.com/uc?export=view&id=1ksMsWE4a-0A6SU0lsUhQF0UcYx7Psfz2',
    year: '1990',
  },
  {
    name: 'test6',
    id: '6',
    uri: 'https://drive.google.com/uc?export=view&id=1VNzVcpOqKsa1EhpslYtP4gPP7qNDIqXZ',
    year: '1990',
  },
  {
    name: 'test7',
    id: '7',
    uri: 'https://drive.google.com/uc?export=view&id=1lMwt-QXHaR16TWhICNuT29mdJ6LV4_RO',
    year: '1990',
  },
  {
    name: 'test8',
    id: '8',
    uri: 'https://drive.google.com/uc?export=view&id=1aoZ62402vjdQ1aAWpTt31xjjW1AanTaY',
    year: '1990',
  },
  {
    name: 'test9',
    id: '9',
    uri: 'https://drive.google.com/uc?export=view&id=1M7dP3apFOsZhKDyMyI1wrhd8o7gIOR7F',
    year: '1990',
  },
  {
    name: 'test10',
    id: '10',
    uri: 'https://drive.google.com/uc?export=view&id=1ksMsWE4a-0A6SU0lsUhQF0UcYx7Psfz2',
    year: '1990',
  },
  {
    name: 'test11',
    id: '11',
    uri: 'https://drive.google.com/uc?export=view&id=1M7dP3apFOsZhKDyMyI1wrhd8o7gIOR7F',
    year: '1990',
  },
  {
    name: 'test12',
    id: '12',
    uri: 'https://drive.google.com/uc?export=view&id=1ksMsWE4a-0A6SU0lsUhQF0UcYx7Psfz2',
    year: '1990',
  },
];
export const testArtists = [
  {
    id: '1',
    name: '빈센트 반 고흐',
    year: '1853. 3. 30 - 1890. 7. 29.',
    works: ['1', '2', '3', '4', '5'],
    pic: 'https://drive.google.com/uc?export=view&id=1qG3nMoR1Ts_e5d7kM2aaGF1DOtE1LvJP',
    artistColor: '#04343a',
  },
  {
    id: '2',
    name: '레오나르도 다빈치',
    year: '1452. 4. 15. - 1519. 5. 2.',
    works: ['1', '2', '3', '4', '5'],
    pic: 'https://drive.google.com/uc?export=view&id=1fjvekcJy9RAnXrf1F8u9dn7yt7mKAB_s',
    artistColor: '#514933',
  },
  {
    id: '3',
    name: '라파엘로 산치오',
    year: '1483. ?. - 1520. 4. 6',
    works: ['1', '2', '3', '4', '5'],
    pic: 'https://drive.google.com/uc?export=view&id=16qvp33nNKbvBsLzkwxLnRp3Gd6ot5q8m',
    artistColor: '#5b2f1c',
  },
];
