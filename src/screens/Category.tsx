import React from 'react';
import {
  ColumnSpace,
  Container,
  Icon,
  Row,
  TextMainBd,
  TextMainMd,
} from '../style/styledConst';
import {useListArtist} from '../query/queries/artist';
import {IArtist} from '../query/types/artists';
import {artStyles, artTypes, keywords} from '../utils/const';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {icons} from '../assets/icons';
import {styled} from 'styled-components/native';
import {colors} from '../style/colors';
import {
  useGoToArtistScr,
  useGoToCategoryShowScr,
} from '../hooks/customNavHooks';
import {useNavigation} from '@react-navigation/native';

const ContentTitle = ({title}: {title: string}) => {
  // navigation
  const {navigate} = useNavigation();
  return (
    <Row
      style={{
        justifyContent: 'space-between',
        marginHorizontal: 22,
        marginTop: 20,
      }}>
      <Title>{title}</Title>
      <TouchableOpacity onPress={() => navigate('CategoryList')}>
        <Icon source={icons.rightGrey} />
      </TouchableOpacity>
    </Row>
  );
};

const Category = () => {
  // navigation
  const goToArtistScr = useGoToArtistScr();
  const goToCategoryShowScr = useGoToCategoryShowScr();

  // react-query
  const {data: artistData} = useListArtist();

  console.log(artistData?.length);
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 64}}>
        {/* 작가별 */}
        {artistData && <ContentTitle title="#작가별 모음" />}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={artistData}
          renderItem={({item}) => (
            <ArtistBox onPress={() => goToArtistScr({artistId: item.artistId})}>
              <ArtistImg source={{uri: item.imgLink}} resizeMode="center" />
              <ArtistName numberOfLines={2} ellipsizeMode="tail">
                {item.artistName}
              </ArtistName>
            </ArtistBox>
          )}
          ItemSeparatorComponent={() => <ColumnSpace width={12} />}
          keyExtractor={(item: IArtist) => item.artistId.toString()}
          windowSize={9}
          initialNumToRender={4}
          maxToRenderPerBatch={2}
          style={{marginBottom: 20}}
          contentContainerStyle={{paddingLeft: 22, paddingRight: 22}}
        />

        {/* 유형별 */}
        <ContentTitle title="#다양한 유형" />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={artTypes}
          renderItem={({item}) => (
            <CategoryBtn onPress={() => goToCategoryShowScr({type: item})}>
              <CategoryBtnText>{item}</CategoryBtnText>
            </CategoryBtn>
          )}
          ItemSeparatorComponent={() => <ColumnSpace width={12} />}
          keyExtractor={item => item.toString()}
          style={{marginBottom: 20}}
          contentContainerStyle={{paddingLeft: 22, paddingRight: 22}}
        />

        {/* 키워드별 */}
        <ContentTitle title="#키워드" />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={keywords}
          renderItem={({item}) => (
            <CategoryBtn onPress={() => goToCategoryShowScr({keyword: item})}>
              <CategoryBtnText>{item}</CategoryBtnText>
            </CategoryBtn>
          )}
          ItemSeparatorComponent={() => <ColumnSpace width={12} />}
          keyExtractor={item => item.toString()}
          style={{marginBottom: 20}}
          contentContainerStyle={{paddingLeft: 22, paddingRight: 22}}
        />

        {/* 미술사조별 */}
        <ContentTitle title="#미술사조" />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={artStyles}
          renderItem={({item}) => (
            <CategoryBtn onPress={() => goToCategoryShowScr({style: item})}>
              <CategoryBtnText>{item}</CategoryBtnText>
            </CategoryBtn>
          )}
          ItemSeparatorComponent={() => <ColumnSpace width={12} />}
          keyExtractor={item => item.toString()}
          style={{marginBottom: 20}}
          contentContainerStyle={{paddingLeft: 22, paddingRight: 22}}
        />
      </ScrollView>
    </Container>
  );
};

export default Category;

const Title = styled(TextMainBd)`
  font-size: 16px;
`;

const ArtistBox = styled.TouchableOpacity`
  width: 80px;
  margin-top: 12px;
  align-items: center;
`;

const ArtistImg = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const ArtistName = styled(TextMainMd)`
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;

const CategoryBtn = styled.TouchableOpacity`
  height: 40px;
  border-radius: 5px;
  padding: 12px 24px;
  background-color: ${colors.inactivate};

  margin-top: 12px;

  align-items: center;
  justify-content: center;
`;

const CategoryBtnText = styled(TextMainMd)`
  color: ${colors.white};
  font-size: 12px;
`;
