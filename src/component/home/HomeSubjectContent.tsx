import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {styled} from 'styled-components/native';
import {Row, TextMainBd} from '../../style/styledConst';
import {HOME_ART_HEIGHT, SCREEN_WIDTH} from '../../utils/const';
import {useNavigation} from '@react-navigation/native';
import {icons} from '../../assets/icons';
import ArtImgWithDynSize from '../common/ArtImgWithDynSize';

interface IHomeSubjectContent {
  contents: Array<{name: string; uri: string; id: string}>;
  title: string;
}
const HomeSubjectContent = ({contents, title}: IHomeSubjectContent) => {
  // navigation
  const {navigate} = useNavigation();

  return (
    <>
      {/* homeList */}
      <Row
        style={{
          marginTop: 28,
          justifyContent: 'space-between',
          marginHorizontal: 22,
        }}>
        <HomeTitle>{title}</HomeTitle>
        <TouchableOpacity
          onPress={() =>
            navigate('HomeList', {
              title,
            })
          }>
          <RightImg source={icons.right} />
        </TouchableOpacity>
      </Row>
      <HomeHorizontalScroll
        horizontal={true}
        contentContainerStyle={{paddingLeft: 22, paddingRight: 10}}>
        {contents.map((art, index) => (
          <ArtBox
            key={index}
            onPress={() => {
              console.log(art.name, 'pressed');
              navigate('Detail', {name: art.name, uri: art.uri});
            }}>
            <ArtImgWithDynSize uri={art.uri} />
          </ArtBox>
        ))}
      </HomeHorizontalScroll>
    </>
  );
};

export default HomeSubjectContent;

const HomeTitle = styled(TextMainBd)`
  font-size: 16px;
`;

const RightImg = styled.Image`
  width: 24px;
  height: 24px;
`;

const HomeHorizontalScroll = styled.ScrollView`
  margin-top: 12px;
`;

const ArtBox = styled.TouchableOpacity`
  margin-right: 12px;
`;
