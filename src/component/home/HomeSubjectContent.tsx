import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {styled} from 'styled-components/native';
import {Row, TextMainBd} from '../../style/styledConst';
import {HOME_ART_HEIGHT, SCREEN_WIDTH} from '../../utils/const';
import {useNavigation} from '@react-navigation/native';
import {icons} from '../../assets/icons';
import {useListArt, useListArtBySubject} from '../../query/queries/art';
import ArtImgWithDynSize from '../common/ArtImgWithDynSize';
import FastImage from 'react-native-fast-image';
import {
  useListArtistIdBySubject,
  useListArtistSummaryBySubject,
} from '../../query/queries/artist';
import {useGoToDetailScr} from '../../hooks/customNavHooks';

interface IHomeSubjectContent {
  subject: string;
}
const HomeSubjectContent = ({subject}: IHomeSubjectContent) => {
  // navigation
  const goToDetailScr = useGoToDetailScr();

  // react-query
  const {data: artistIdBySubject} = useListArtistIdBySubject(subject);
  const {data: artBySubject} = useListArt({
    enabled: !!artistIdBySubject,
    artistIdArr: artistIdBySubject,
  });

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
        <HomeTitle>{subject}</HomeTitle>
        <TouchableOpacity
          onPress={() =>
            navigate('HomeList', {
              subject,
            })
          }>
          <RightImg source={icons.right} />
        </TouchableOpacity>
      </Row>
      <HomeHorizontalScroll
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{paddingLeft: 22, paddingRight: 10}}>
        {artBySubject?.slice(0, 5).map((art, index) => (
          <ArtBox
            key={index}
            onPress={() => {
              goToDetailScr({artId: art.artId});
            }}>
            <FastImage
              style={{width: 166, height: 166, borderRadius: 4}}
              source={{
                uri: art.imgLink,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
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

const ArtImg = styled.Image`
  width: 166px;
  height: 166px;
  border-radius: 4px;
`;
