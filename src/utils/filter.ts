import {IArt} from '../query/types/art';
import {IFilterState} from '../recoil/states';

export const getFilteredArts = (
  artData: IArt[] | undefined,
  filter: IFilterState,
) => {
  return artData?.filter(item => {
    const isArtType =
      filter.artTypes.length > 0
        ? filter.artTypes.some(type => item.type.includes(type))
        : true;
    const isArtStyle =
      filter.artStyles.length > 0
        ? filter.artStyles.includes(item.style)
        : true;
    const isKeyword =
      filter.keywords.length > 0
        ? filter.keywords.some(keyword => item.keyword.includes(keyword))
        : true;
    const isYear =
      Number(item.year) >= filter.year[0] &&
      Number(item.year) <= filter.year[1];
    // TBD | searchText에 따라 설정
    let isSearchText =
      filter.searchText === ''
        ? true
        : item.artTitle.includes(filter.searchText) ||
          item.artistName.includes(filter.searchText) ||
          item.keyword.some(keyword => keyword.includes(filter.searchText)) ||
          item.type.some(type => type.includes(filter.searchText)) ||
          item.style.includes(filter.searchText);

    return isArtType && isArtStyle && isKeyword && isYear && isSearchText;
  });
};
