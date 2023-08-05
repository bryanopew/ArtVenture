import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Col, Container, Row, RowSpace} from '../style/styledConst';
import {FlatList} from 'react-native-gesture-handler';
import {SCREEN_WIDTH, _MPY_} from '../utils/const';
import {styled} from 'styled-components/native';
import {colors} from '../style/colors';

interface IArts {
  name: string;
  id: string;
  uri: string;
}
const testArts = [
  {
    name: 'test1',
    id: '1',
    uri: 'https://drive.google.com/uc?export=view&id=1VNzVcpOqKsa1EhpslYtP4gPP7qNDIqXZ',
  },
  {
    name: 'test2',
    id: '2',
    uri: 'https://drive.google.com/uc?export=view&id=1lMwt-QXHaR16TWhICNuT29mdJ6LV4_RO',
  },
  {
    name: 'test3',
    id: '3',
    uri: 'https://drive.google.com/uc?export=view&id=1aoZ62402vjdQ1aAWpTt31xjjW1AanTaY',
  },
  {
    name: 'test4',
    id: '4',
    uri: 'https://drive.google.com/uc?export=view&id=1M7dP3apFOsZhKDyMyI1wrhd8o7gIOR7F',
  },
  {
    name: 'test5',
    id: '5',
    uri: 'https://drive.google.com/uc?export=view&id=1ksMsWE4a-0A6SU0lsUhQF0UcYx7Psfz2',
  },
  {
    name: 'test6',
    id: '6',
    uri: 'https://drive.google.com/uc?export=view&id=1VNzVcpOqKsa1EhpslYtP4gPP7qNDIqXZ',
  },
  {
    name: 'test7',
    id: '7',
    uri: 'https://drive.google.com/uc?export=view&id=1lMwt-QXHaR16TWhICNuT29mdJ6LV4_RO',
  },
  {
    name: 'test8',
    id: '8',
    uri: 'https://drive.google.com/uc?export=view&id=1aoZ62402vjdQ1aAWpTt31xjjW1AanTaY',
  },
  {
    name: 'test9',
    id: '9',
    uri: 'https://drive.google.com/uc?export=view&id=1M7dP3apFOsZhKDyMyI1wrhd8o7gIOR7F',
  },
  {
    name: 'test10',
    id: '10',
    uri: 'https://drive.google.com/uc?export=view&id=1ksMsWE4a-0A6SU0lsUhQF0UcYx7Psfz2',
  },
  {
    name: 'test11',
    id: '11',
    uri: 'https://drive.google.com/uc?export=view&id=1M7dP3apFOsZhKDyMyI1wrhd8o7gIOR7F',
  },
  {
    name: 'test12',
    id: '12',
    uri: 'https://drive.google.com/uc?export=view&id=1ksMsWE4a-0A6SU0lsUhQF0UcYx7Psfz2',
  },
];

const SearchedItems = ({item, index}: {item: IArts[]; index: number}) => {
  return (
    <Col style={{rowGap: 8 * _MPY_}}>
      <Row style={{columnGap: 8 * _MPY_}}>
        {index % 2 === 0 ? (
          <>
            <Col style={{rowGap: 8 * _MPY_}}>
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
            <Col style={{rowGap: 8 * _MPY_}}>
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
      <Row style={{columnGap: 8 * _MPY_}}>
        <ImgBox>{item[3] && <ImgSmall source={{uri: item[3].uri}} />}</ImgBox>
        <ImgBox>{item[4] && <ImgSmall source={{uri: item[4].uri}} />}</ImgBox>
        <ImgBox>{item[5] && <ImgSmall source={{uri: item[5].uri}} />}</ImgBox>
      </Row>
    </Col>
  );
};

const Search = () => {
  const [parsedArts, setParsedArts] = useState<Array<IArts[]>>([]);

  useEffect(() => {
    let arts: Array<IArts[]> = [];
    for (let i = 0; i < testArts.length; i++) {
      console.log(i, i % 6, Math.floor(i / 6));
      if (i % 6 === 0) arts.push([]);
      arts[Math.floor(i / 6)].push(testArts[i]);
    }
    console.log(arts);
    setParsedArts(arts);
  }, testArts);

  return (
    <Container style={{paddingHorizontal: 46 * _MPY_}}>
      <RowSpace height={80 * _MPY_} />
      <FlatList
        data={parsedArts}
        renderItem={({item, index}) => (
          <SearchedItems item={item} index={index} />
        )}
        ItemSeparatorComponent={() => <RowSpace height={8 * _MPY_} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Search;

const ImgBox = styled.TouchableOpacity``;
const ImgSmall = styled.Image`
  width: ${(SCREEN_WIDTH - 46 * _MPY_ * 2 - 8 * _MPY_ * 2) / 3}px;
  height: ${(SCREEN_WIDTH - 46 * _MPY_ * 2 - 8 * _MPY_ * 2) / 3}px;
  background-color: ${colors.inactivate};
`;
const ImgLarge = styled.Image`
  width: ${((SCREEN_WIDTH - 46 * _MPY_ * 2 - 8 * _MPY_ * 2) / 3) * 2 +
  8 * _MPY_}px;
  height: ${((SCREEN_WIDTH - 46 * _MPY_ * 2 - 8 * _MPY_ * 2) / 3) * 2 +
  8 * _MPY_}px;
  background-color: ${colors.inactivate};
`;
