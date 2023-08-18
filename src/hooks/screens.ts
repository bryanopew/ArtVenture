import {currentScrState} from '../recoil/states';
import {useRecoilState} from 'recoil';

export const useSetCurrentScr = (screen: string) => {
  const [currentScr, setCurrentScr] = useRecoilState(currentScrState);
  setCurrentScr(screen);
};
