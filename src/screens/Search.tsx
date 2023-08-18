import React, {useEffect, useState} from 'react';
import {ContainerWithTopBar, RowSpace} from '../style/styledConst';
import TopBar from '../component/common/TopBar';
import ArrowLeft from '../component/nav/ArrowLeft';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {FilterBtn} from '../component/nav/NavBtns';
import SearchInput from '../component/search/SearchInput';
import {IArt} from '../query/types/art';
import {reGroupArtsBySix} from '../utils/reGroupArts';
import SixItemsFlatList from '../component/common/SixItems';

const Search = () => {
  // navigation
  const isFocused = useIsFocused();
  const route = useRoute();
  console.log(route.params?.filteredArts?.length);

  // useState
  const [regroupedArts, setRegroupedArts] = useState<Array<IArt[]>>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (!isFocused) return;
    const regrouped = reGroupArtsBySix(route.params?.filteredArts);
    !!regrouped && setRegroupedArts(regrouped);
  }, [route.params]);
  // (SCREEN_WIDTH - (22 + 22) - 8 * 2) + 16 + 8
  return (
    <ContainerWithTopBar style={{paddingHorizontal: 22}}>
      <TopBar
        headerLeft={() => <ArrowLeft />}
        header={() => (
          <SearchInput searchText={searchText} setSearchText={setSearchText} />
        )}
        headerRight={() => <FilterBtn />}
      />
      <RowSpace height={20} />
      <SixItemsFlatList data={regroupedArts} />
    </ContainerWithTopBar>
  );
};

export default Search;
