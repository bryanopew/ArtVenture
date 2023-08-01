import {Dimensions} from 'react-native';

// device size guideline & multiply scale
const guidelineBaseWidth = 720;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const _MPY_ = SCREEN_WIDTH / guidelineBaseWidth;

// common
export const TOP_BAR_HEIGHT = 110 * _MPY_;

// Home
export const HOME_ART_HEIGHT = 326 * _MPY_;
