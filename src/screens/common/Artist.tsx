import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styled} from 'styled-components/native';
import {colors} from '../../style/colors';
import TopBar from '../../component/common/TopBar';
import ArrowLeft from '../../component/nav/ArrowLeft';
import {
  Icon,
  Row,
  TextMainBd,
  TextMainRg,
  TextSubMd,
  TextSubRg,
} from '../../style/styledConst';
import {icons} from '../../assets/icons';
import {SCREEN_HEIGHT, SCREEN_WIDTH, testArts} from '../../utils/const';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useGetArtist} from '../../query/queries/artist';
import FastImage from 'react-native-fast-image';
import {useListArt} from '../../query/queries/art';
import {useGoToDetailScr} from '../../hooks/customNavHooks';

const Artist = () => {
  // navigation
  const navigation = useNavigation();
  const route = useRoute();
  const goToDetailScr = useGoToDetailScr();

  // react-query
  const {data: artistData} = useGetArtist(route?.params?.artistId);
  const {data: artData} = useListArt({
    artistId: route?.params?.artistId,
    enabled: !!route?.params?.artistId,
  });

  // useState
  const [loadMore, setLoadMore] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  console.log(artistData);
  return (
    <Container>
      {!isImgLoaded && (
        <Loading style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
          <ActivityIndicator color={colors.black} size={'large'} />
        </Loading>
      )}
      <ScrollView contentContainerStyle={{paddingTop: 55, paddingBottom: 64}}>
        {artistData?.imgLink && (
          <FastImage
            style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH}}
            source={{uri: artistData.imgLink}}
            resizeMode="cover"
            onLoadEnd={() => setIsImgLoaded(true)}
          />
        )}

        <ContentBox>
          <Row style={{justifyContent: 'space-between'}}>
            <ArtistName
              numberOfLines={1}
              style={{
                color:
                  isImgLoaded && artistData
                    ? artistData.artistColor
                    : colors.textMain,
              }}>
              {artistData?.artistName}
            </ArtistName>
            {/* <Icon source={icons.heartGrey} /> */}
          </Row>
          <ArtistYear
            style={{
              color:
                isImgLoaded && artistData
                  ? artistData.artistColor
                  : colors.textMain,
            }}>
            {artistData?.year}
          </ArtistYear>
          <ArtistDesc
            numberOfLines={loadMore ? undefined : 3}
            ellipsizeMode="tail">
            {artistData?.artistDsc}
          </ArtistDesc>
          {!loadMore && (
            <LoadMoreBtn onPress={() => setLoadMore(true)}>
              <LoadMore>더보기</LoadMore>
            </LoadMoreBtn>
          )}
        </ContentBox>
        <WorkBox>
          {artData?.map(art => (
            <Work
              key={art.artId}
              onPress={() => goToDetailScr({artId: art.artId})}>
              <Img source={{uri: art.imgLink}} />
              <Title>{art.artTitle}</Title>
              <Year>{art.year}</Year>
            </Work>
          ))}
        </WorkBox>
      </ScrollView>
      {/* TBD | TopBar animation 적용 */}
      <TopBar
        style={{
          backgroundColor:
            isImgLoaded && !!artistData ? artistData.artistColor : colors.white,
        }}
        headerLeft={() => (
          <ArrowLeft arrowColor={isImgLoaded ? 'white' : 'black'} />
        )}
        header={() => (
          <HeaderText
            style={{color: isImgLoaded ? colors.white : colors.black}}>
            {artistData?.artistName}
          </HeaderText>
        )}
        headerRight={() => (
          <TouchableOpacity
            onPress={() => console.log('Artist: more onPressed')}>
            <Icon source={isImgLoaded ? icons.moreWhite : icons.more} />
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default Artist;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;
const Loading = styled.View`
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled(TextMainBd)`
  font-size: 20px;
  color: ${colors.white};
  margin-left: 12px;
`;

const ArtistImg = styled.Image`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_WIDTH}px;
`;

const ContentBox = styled.View`
  padding: 0 22px;
`;

const ArtistName = styled(TextMainBd)`
  font-size: 30px;
  margin-top: 16px;
`;

const ArtistYear = styled(TextMainRg)`
  margin-top: 4px;
  font-size: 12px;
`;

const ArtistDesc = styled(TextMainRg)`
  margin-top: 20px;
  font-size: 14px;
`;

const LoadMoreBtn = styled.TouchableOpacity``;
const LoadMore = styled(TextSubMd)`
  font-size: 14px;
  align-self: flex-end;
`;

const WorkBox = styled.View`
  width: ${SCREEN_WIDTH - 22 * 2}px;
  align-self: center;
  margin-top: 16px;
  column-gap: 8px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Work = styled.TouchableOpacity``;
const Img = styled.Image`
  width: ${(SCREEN_WIDTH - (22 + 22) - 8) / 2}px;
  height: ${(SCREEN_WIDTH - (22 + 22) - 8) / 2}px;
  border-radius: 4px;
  margin-top: 20px;
`;

const Title = styled(TextMainBd)`
  font-size: 16px;
  color: ${colors.textMain};
  margin-top: 8px;
`;

const Year = styled(TextSubRg)`
  font-size: 12px;
`;
