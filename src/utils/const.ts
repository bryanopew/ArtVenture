import {Dimensions} from 'react-native';

// device size guideline & multiply scale
const guidelineBaseWidth = 360;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const _MPY_ = SCREEN_WIDTH / guidelineBaseWidth;

// common
export const TOP_BAR_HEIGHT = 55;
export const HOME_LIST_ITEM_HEIGHT = 84 + (SCREEN_WIDTH - 22 - 22 - 8);
export const SIX_ITEM_HEIGHT = SCREEN_WIDTH - (22 + 22) - 8 * 2 + 16 + 8;
export const getFlatListItemLayout = (
  data: any,
  index: number,
  height: number,
) => ({
  length: height,
  offset: height * index,
  index,
});

// Home
export const HOME_ART_HEIGHT = 166 * _MPY_;

// Filter
export const ARTS_MIN_YEAR = 1435;
export const ARTS_MAX_YEAR = 1919;

// Category

// artType
export const artTypes = ['인물화', '풍경화', '정물화', '제단화', '종교화'];

// keyword
export const keywords = [
  '사람',
  '미소',
  '신화',
  '여성',
  '남성',
  '종교',
  '마을',
  '건물',
  '얼굴',
  '춤',
  '별',
  '밤',
  '도시',
  '어둠',
  '풍경',
  '술',
  '꽃',
  '기차',
  '악기',
  '목욕',
  '산',
  '고통',
];

// artStyles
export const artStyles = [
  '르네상스',
  '바로크',
  '상징주의',
  '인상주의',
  '현실주의',
];

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

export const G_API_K = 'AIzaSyBny--0qARTfo5CgvyqBLRoXvoUiiidIbE';
