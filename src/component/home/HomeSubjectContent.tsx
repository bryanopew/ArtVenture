import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {styled} from 'styled-components/native';
import {Row, TextMainBd} from '../../style/styledConst';
import {HOME_ART_HEIGHT, SCREEN_WIDTH, _MPY_} from '../../utils/const';
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
          marginTop: 64 * _MPY_,
          justifyContent: 'space-between',
          marginHorizontal: 46 * _MPY_,
        }}>
        <HomeTitle>{title}</HomeTitle>
        <TouchableOpacity
          onPress={() =>
            navigate('HomeNav', {
              screen: 'HomeList',
              params: {
                title,
              },
            })
          }>
          <RightImg source={icons.right} />
        </TouchableOpacity>
      </Row>
      <HomeHorizontalScroll horizontal={true}>
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
  font-size: ${34 * _MPY_}px;
`;

const RightImg = styled.Image`
  width: ${48 * _MPY_}px;
  height: ${48 * _MPY_}px;
`;

const HomeHorizontalScroll = styled.ScrollView`
  width: ${SCREEN_WIDTH}px;
  margin-top: ${24 * _MPY_}px;
  padding-left: ${46 * _MPY_}px;
  padding-right: ${46 * _MPY_}px;
`;

const ArtBox = styled.TouchableOpacity`
  margin-right: ${24 * _MPY_}px;
`;
