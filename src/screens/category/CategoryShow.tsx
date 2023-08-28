import {useNavigation, useRoute} from '@react-navigation/native';
import {Container, NavHeader, RowSpace} from '../../style/styledConst';
import {useEffect, useMemo, useState} from 'react';
import {useListArt} from '../../query/queries/art';
import {IArt} from '../../query/types/art';
import {Text} from 'react-native';
import SixItemsFlatList from '../../component/common/SixItems';
import {reGroupArtsBySix} from '../../utils/reGroupArts';

const CategoryShow = () => {
  // navigation
  const navigation = useNavigation();
  const route = useRoute();

  // useState
  const [regroupedData, setRegroupedData] = useState<IArt[][]>([]);

  // react-query
  const {data: artData} = useListArt({});

  // Object.keys(route.params)[0]
  // useEffect
  // 전체 작품에서 type | keyword | style 에 따라 필터링
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <NavHeader>
          {!!route.params && '#' + Object.values(route.params)[0]}
        </NavHeader>
      ),
    });

    if (!artData || !route.params) return;
    const artDataKey = Object.keys(route.params)[0];
    const artDataValue = Object.values(route.params)[0];
    const fData = artData.filter(item => {
      // style만 string. 나머지는 string[]
      if (artDataKey === 'style') return item.style === artDataValue;
      return item[artDataKey].includes(artDataValue);
    });
    const regrouped = reGroupArtsBySix(fData);
    !!regrouped && setRegroupedData(regrouped);
  }, [route, artData]);

  console.log('raw: ', artData?.length, 'filtered: ', regroupedData?.legnth);

  return (
    <Container style={{paddingHorizontal: 22}}>
      <RowSpace height={20} />
      {!!regroupedData && <SixItemsFlatList data={regroupedData} />}
    </Container>
  );
};

export default CategoryShow;
