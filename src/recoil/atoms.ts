import {atom} from 'recoil';

export const currentScrState = atom({
  key: 'currentScrState',
  default: 'Home',
});
