import React, {useEffect, useState} from 'react';
import {
  Col,
  Container,
  ContainerWithTopBar,
  Row,
  RowSpace,
} from '../style/styledConst';
import {FlatList} from 'react-native-gesture-handler';
import {SCREEN_WIDTH, testArts} from '../utils/const';
import {styled} from 'styled-components/native';
import {colors} from '../style/colors';
import TopBar from '../component/common/TopBar';
import ArrowLeft from '../component/nav/ArrowLeft';
import {useNavigation} from '@react-navigation/native';
import {FilterBtn} from '../component/nav/NavBtns';
import TopBarLogo from '../component/nav/TopBarLogo';
import SearchInput from '../component/search/SearchInput';

interface IArts {
  name: string;
  id: string;
  uri: string;
}

const SearchedItems = ({item, index}: {item: IArts[]; index: number}) => {
  return (
    <Col style={{rowGap: 8}}>
      <Row style={{columnGap: 8}}>
        {index % 2 === 0 ? (
          <>
            <Col style={{rowGap: 8}}>
              <ImgBox>
                {item[0] && <ImgSmall source={{uri: item[0].uri}} />}
              </ImgBox>
              <ImgBox>
                {item[1] && <ImgSmall source={{uri: item[1].uri}} />}
              </ImgBox>
            </Col>
            <ImgBox>
              {item[2] && <ImgLarge source={{uri: item[2].uri}} />}
            </ImgBox>
          </>
        ) : (
          <>
            <ImgBox>
              {item[0] && <ImgLarge source={{uri: item[2].uri}} />}
            </ImgBox>
            <Col style={{rowGap: 8}}>
              <ImgBox>
                {item[1] && <ImgSmall source={{uri: item[0].uri}} />}
              </ImgBox>
              <ImgBox>
                {item[2] && <ImgSmall source={{uri: item[1].uri}} />}
              </ImgBox>
            </Col>
          </>
        )}
      </Row>
      <Row style={{columnGap: 8}}>
        <ImgBox>{item[3] && <ImgSmall source={{uri: item[3].uri}} />}</ImgBox>
        <ImgBox>{item[4] && <ImgSmall source={{uri: item[4].uri}} />}</ImgBox>
        <ImgBox>{item[5] && <ImgSmall source={{uri: item[5].uri}} />}</ImgBox>
      </Row>
    </Col>
  );
};

const Search = () => {
  // navigation
  const {goBack} = useNavigation();

  // useState
  const [parsedArts, setParsedArts] = useState<Array<IArts[]>>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    let arts: Array<IArts[]> = [];
    for (let i = 0; i < testArts.length; i++) {
      console.log(i, i % 6, Math.floor(i / 6));
      if (i % 6 === 0) arts.push([]);
      arts[Math.floor(i / 6)].push(testArts[i]);
    }
    setParsedArts(arts);
  }, testArts);

  return (
    <ContainerWithTopBar style={{paddingHorizontal: 22}}>
      <TopBar
        headerLeft={() => (
          <ArrowLeft
            navigationFn={() => {
              goBack();
            }}
          />
        )}
        header={() => (
          <SearchInput searchText={searchText} setSearchText={setSearchText} />
        )}
        headerRight={() => <FilterBtn />}
      />
      <RowSpace height={20} />
      <FlatList
        data={parsedArts}
        renderItem={({item, index}) => (
          <SearchedItems item={item} index={index} />
        )}
        ItemSeparatorComponent={() => <RowSpace height={8} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </ContainerWithTopBar>
  );
};

export default Search;

const ImgBox = styled.TouchableOpacity``;
const ImgSmall = styled.Image`
  width: ${(SCREEN_WIDTH - (22 + 22) - 8 * 2) / 3}px;
  height: ${(SCREEN_WIDTH - (22 + 22) - 8 * 2) / 3}px;
  background-color: ${colors.inactivate};
  border-radius: 2px;
`;
const ImgLarge = styled.Image`
  width: ${((SCREEN_WIDTH - (22 + 22) - 8 * 2) / 3) * 2 + 8}px;
  height: ${((SCREEN_WIDTH - (22 + 22) - 8 * 2) / 3) * 2 + 8}px;
  background-color: ${colors.inactivate};
  border-radius: 2px;
`;
