// rn
import {View, Text, Image} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Platform} from 'react-native';

// 3rd
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import _ from 'lodash';

// avComp
import {Container, TextMainBd, TextMainRg} from '../style/styledConst';

// av
import {useGetArt, useListArtBySubject} from '../query/queries/art';
import {styled} from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {SCREEN_WIDTH} from '../utils/const';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {useGoToDetailScr} from '../hooks/customNavHooks';

const Detail = () => {
  // navigation
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const goToDetailScr = useGoToDetailScr();

  // react-query
  const {data: artData} = useGetArt(route?.params?.artId);
  const {data: artBySubjectData} = useListArtBySubject('유명작가');

  // useState
  const [imgSize, setImgSize] = useState({width: 0, height: 0});

  // useEffect
  useEffect(() => {
    isFocused &&
      navigation.setOptions({
        headerTitle: () => (
          <TextMainBd style={{fontSize: 20, marginLeft: 12}}>
            {artData?.artTitle}
          </TextMainBd>
        ),
      });
    artData &&
      Image.getSize(artData?.imgLink, (width, height) => {
        setImgSize({
          width: SCREEN_WIDTH - 44,
          height: ((SCREEN_WIDTH - 22) / width) * height,
        });
      });
  }, [isFocused, artData]);

  // useMemo
  const FamousArtRandom = useMemo(() => {
    // shuffle function
    const copiedArt = _.shuffle(artBySubjectData);
    const randomArt = copiedArt.slice(0, 5);
    return randomArt;
  }, [artBySubjectData]);

  // animation
  const animValue = useSharedValue<number>(0);

  return (
    <Container>
      <ScrollView contentContainerStyle={{paddingBottom: 64}}>
        <ContentBox>
          <ImgBox
            style={{
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                  shadowOffset: {
                    height: 0,
                    width: 0,
                  },
                  android: {
                    shadowColor: '#000',
                    elevation: 5,
                  },
                },
              }),
            }}>
            <FastImage
              style={{
                width: imgSize.width,
                height: imgSize.height,
              }}
              resizeMode="cover"
              source={{uri: artData?.imgLink}}
            />
          </ImgBox>
          <Title>{artData?.artTitle}</Title>
          <Artist>
            {artData?.artistName} {artData?.year}
          </Artist>
          <DescBox>
            <Desc>{artData?.artDsc}</Desc>
          </DescBox>
        </ContentBox>
        <FamousArtTitle>유명작가 그림 모음집</FamousArtTitle>
        <Carousel
          style={{marginTop: 12}}
          width={SCREEN_WIDTH}
          height={SCREEN_WIDTH / 2.2}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: SCREEN_WIDTH / 1.7,
          }}
          data={FamousArtRandom}
          scrollAnimationDuration={200}
          onSnapToItem={index => console.log('current index:', index)}
          onProgressChange={(_, absoluteProgress) => {
            animValue.value = absoluteProgress;
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                alignSelf: 'center',
              }}
              // onPress={() => goToDetailScr({artId: item.artId})}>
              onPress={() => navigation.push('Detail', {artId: item.artId})}>
              <FastImage
                style={{
                  width: SCREEN_WIDTH / 2.2,
                  height: SCREEN_WIDTH / 2.2,
                  borderRadius: 4,
                }}
                resizeMode="cover"
                source={{uri: item.imgLink}}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </Container>
  );
};

export default Detail;

const ContentBox = styled.View`
  padding: 0px 22px;
`;

const ImgBox = styled.View``;

const Title = styled(TextMainBd)`
  font-size: 16px;
  margin-top: 20px;
`;

const Artist = styled(TextMainRg)`
  font-size: 12px;
  margin-top: 4px;
`;

const DescBox = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const Desc = styled(TextMainRg)`
  font-size: 14px;
`;

const FamousArtTitle = styled(TextMainBd)`
  font-size: 16px;
  margin-top: 40px;
  margin-left: 22px;
`;
