import {SetterOrUpdater, atom, selector} from 'recoil';
import {ARTS_MAX_YEAR, ARTS_MIN_YEAR} from '../utils/const';

export const currentScrState = atom({
  key: 'currentScrState',
  default: 'Home',
});

interface IFilterState {
  year: number[];
  artTypes: string[];
  keywords: string[];
  artStyles: string[];
}
export const filterState = atom<IFilterState>({
  key: 'filterState',
  default: {
    year: [ARTS_MIN_YEAR, ARTS_MAX_YEAR],
    artTypes: [],
    keywords: [],
    artStyles: [],
  },
});
interface IHandleFilter {
  setter: SetterOrUpdater<IFilterState>;
  isActivated: boolean;
  type: 'year' | 'artTypes' | 'keywords' | 'artStyles';
  value: string | number[];
}
export const handleFilter = ({
  setter,
  isActivated,
  type,
  value,
}: IHandleFilter) => {
  setter(prev => {
    if (type !== 'year' && typeof value === 'string' && isActivated)
      return {
        ...prev,
        year: [...prev.year],
        artTypes: [...prev.artTypes],
        keywords: [...prev.keywords],
        artStyles: [...prev.artStyles],
        [type]: [...prev[type].filter(item => item !== value)],
      };

    if (type == 'year' && Array.isArray(value))
      return {
        ...prev,
        artTypes: [...prev.artTypes],
        keywords: [...prev.keywords],
        artStyles: [...prev.artStyles],
        year: value,
      };
    else if (type !== 'year' && typeof value === 'string')
      return {
        ...prev,
        year: [...prev.year],
        artTypes: [...prev.artTypes],
        keywords: [...prev.keywords],
        artStyles: [...prev.artStyles],
        [type]: prev[type].includes(value)
          ? prev[type].filter(item => item !== value)
          : [...prev[type], value],
      };
    return prev;
  });
};
