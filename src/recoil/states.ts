import {SetterOrUpdater, atom, selector} from 'recoil';
import {ARTS_MAX_YEAR, ARTS_MIN_YEAR} from '../utils/const';

export const currentScrState = atom({
  key: 'currentScrState',
  default: 'Home',
});

export interface IFilterState {
  year: number[];
  artTypes: string[];
  keywords: string[];
  artStyles: string[];
  searchText: string;
}
export const filterState = atom<IFilterState>({
  key: 'filterState',
  default: {
    year: [ARTS_MIN_YEAR, ARTS_MAX_YEAR],
    artTypes: [],
    keywords: [],
    artStyles: [],
    searchText: '',
  },
});
interface IHandleFilter {
  setter: SetterOrUpdater<IFilterState>;
  type: 'year' | 'artTypes' | 'keywords' | 'artStyles' | 'searchText';
  value: string | number[];
}
export const handleFilter = ({setter, type, value}: IHandleFilter) => {
  setter(prev => {
    if (type == 'year' && Array.isArray(value))
      return {
        ...prev,
        artTypes: [...prev.artTypes],
        keywords: [...prev.keywords],
        artStyles: [...prev.artStyles],
        searchText: prev.searchText,
        year: value,
      };
    else if (
      type !== 'year' &&
      type !== 'searchText' &&
      typeof value === 'string'
    )
      return {
        ...prev,
        year: [...prev.year],
        artTypes: [...prev.artTypes],
        keywords: [...prev.keywords],
        artStyles: [...prev.artStyles],
        searchText: prev.searchText,
        [type]: prev[type].includes(value)
          ? prev[type].filter(item => item !== value)
          : [...prev[type], value],
      };
    else if (type === 'searchText' && typeof value === 'string')
      return {
        ...prev,
        artTypes: [...prev.artTypes],
        keywords: [...prev.keywords],
        artStyles: [...prev.artStyles],
        searchText: value,
        year: prev.year,
      };
    return prev;
  });
};
