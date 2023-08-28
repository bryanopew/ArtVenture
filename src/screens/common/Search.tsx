import React, {useEffect, useMemo, useState} from 'react';
import {ContainerWithTopBar, RowSpace} from '../../style/styledConst';
import TopBar from '../../component/common/TopBar';
import ArrowLeft from '../../component/nav/ArrowLeft';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {FilterBtn} from '../../component/nav/NavBtns';
import SearchInput from '../../component/search/SearchInput';
import {IArt} from '../../query/types/art';
import {reGroupArtsBySix} from '../../utils/reGroupArts';
import SixItemsFlatList from '../../component/common/SixItems';
import {useListArt} from '../../query/queries/art';
import {useRecoilState} from 'recoil';
import {filterState, handleFilter} from '../../recoil/states';
import {getFilteredArts} from '../../utils/filter';

const Search = () => {
  // navigation
  const isFocused = useIsFocused();
  const route = useRoute();
  console.log('Search: route: ', route.params?.isResultShown);

  // recoil
  const [filter, setFilter] = useRecoilState(filterState);

  // useState
  const [regroupedArts, setRegroupedArts] = useState<Array<IArt[]>>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isResultShown, setIsResultShown] = useState<boolean>(false);

  // react-query
  const {data: artData} = useListArt({});

  const filteredArts = useMemo(() => {
    return getFilteredArts(artData, filter);
  }, [filter, artData]);

  useEffect(() => {
    if (route.params?.isResultShown) setIsResultShown(true);
    const regrouped = reGroupArtsBySix(filteredArts);
    !!regrouped && setRegroupedArts(regrouped);
  }, [route.params, filteredArts, filter]);

  // (SCREEN_WIDTH - (22 + 22) - 8 * 2) + 16 + 8
  console.log('Search: isResultShown', isResultShown);
  return (
    <ContainerWithTopBar style={{paddingHorizontal: 22}}>
      <TopBar
        headerLeft={() => <ArrowLeft />}
        header={() => (
          <SearchInput
            searchText={searchText}
            setSearchText={setSearchText}
            onSubmitEditing={() => {
              handleFilter({
                setter: setFilter,
                type: 'searchText',
                value: searchText,
              });
              setIsResultShown(true);
            }}
          />
        )}
        headerRight={() => <FilterBtn />}
      />
      <RowSpace height={20} />
      {isResultShown && <SixItemsFlatList data={regroupedArts} />}
    </ContainerWithTopBar>
  );
};

export default Search;
