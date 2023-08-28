// rn
import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {RefObject, useEffect, useMemo, useRef, useState} from 'react';
import {Platform} from 'react-native';

// 3rd
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import _ from 'lodash';
import Share from 'react-native-share';

// avComp
import {
  Container,
  Icon,
  Row,
  RowSpace,
  TextMainBd,
  TextMainMd,
  TextMainRg,
} from '../../style/styledConst';

// av
import {useGetArt, useListArtBySubject} from '../../query/queries/art';
import {styled} from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/const';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {useGoToDetailScr} from '../../hooks/customNavHooks';
import TopBar from '../../component/common/TopBar';
import ArrowLeft from '../../component/nav/ArrowLeft';
import {icons} from '../../assets/icons';
import {colors} from '../../style/colors';
import DropDown from '../../component/common/DropDown';
import {bookmarkArt, checkIsBookmarked} from '../../utils/bookmark';
import ViewShot from 'react-native-view-shot';
import Clipboard from '@react-native-clipboard/clipboard';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const Detail = () => {
  // navigation
  const navigation = useNavigation();
  const route = useRoute();

  // react-query
  const {data: artData} = useGetArt(route?.params?.artId);
  const {data: artBySubjectData} = useListArtBySubject('유명작가');

  // useState
  const [imgSize, setImgSize] = useState({width: 0, height: 0});
  const [isDDShown, setIsDDShown] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const [shareUri, setShareUri] = useState<string>('');

  // useRef
  const viewShotRef = useRef<RefObject<ViewShot>>(null);

  // useEffect
  useEffect(() => {
    artData &&
      Image.getSize(artData?.imgLink, (width, height) => {
        setImgSize({
          width: SCREEN_WIDTH,
          height: (SCREEN_WIDTH / width) * height,
        });
      });
  }, [artData]);

  useEffect(() => {
    const updateBookmark = async () => {
      const isBookmarked = await checkIsBookmarked(route.params?.artId);
      setIsBookmarked(isBookmarked);
    };
    updateBookmark();
  }, []);

  // useMemo
  const FamousArtRandom = useMemo(() => {
    // shuffle function
    const copiedArt = _.shuffle(artBySubjectData);
    const randomArt = copiedArt.slice(0, 5);
    return randomArt;
  }, [artBySubjectData]);

  // animation
  const animValue = useSharedValue<number>(0);

  // etc
  const handleBookmark = () => {
    bookmarkArt(artData?.artId);
    setIsBookmarked(v => !v);
  };

  // shareOptions
  const shareOptions = {
    url: shareUri,
    saveToFiles: true,
    filename: 'test', // only for base64 file in Android
  };
  // dropDown items
  const detailDDItems = [
    {
      label: '공유하기',
      fn: async () => {
        try {
          const uri = await viewShotRef?.current?.capture();
          setShareUri(uri);
          const shareRes = await Share.open(shareOptions);
          console.log(shareRes);
        } catch (e) {
          console.log(e);
        }
      },
    },
    {
      label: isBookmarked ? '북마크해제' : '북마크하기',
      fn: () => {
        handleBookmark();
        Toast.show({
          type: 'success',
          text1: isBookmarked ? '북마크해제' : '북마크',
          text2: `${artData?.artTitle} | ${artData?.artistName}`,
        });
      },
    },
    {
      label: '링크복사',
      fn: () => {
        artData?.imgLink && Clipboard.setString(artData?.imgLink);
        Toast.show({
          type: 'success',
          text1: '링크복사 완료',
          text2: `${artData?.artTitle} | ${artData?.artistName}`,
        });
      },
    },
    {
      label: '오류제보',
      fn: () => {
        navigation.navigate('Consult');
      },
    },
  ];

  return (
    <Container>
      {!isImgLoaded && (
        <Loading style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
          <ActivityIndicator color={colors.black} size={'large'} />
        </Loading>
      )}
      <TouchableWithoutFeedback
        style={{width: '100%', height: '100%', backgroundColor: colors.white}}
        onPressIn={() => setIsDDShown(false)}>
        <ScrollView
          style={{backgroundColor: colors.white}}
          contentContainerStyle={{
            paddingBottom: 64,
            backgroundColor: colors.white,
          }}>
          <ViewShot
            ref={viewShotRef}
            options={{
              fileName: artData?.artTitle,
              format: 'png',
              quality: 0.9,
            }}>
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
                  },
                  android: {
                    shadowColor: '#000',
                    elevation: 2,
                  },
                }),
                width: isImgLoaded ? 'auto' : 0,
                height: isImgLoaded ? 'auto' : 0,
              }}>
              <FastImage
                style={{
                  width: imgSize.width,
                  height: imgSize.height,
                }}
                resizeMode="cover"
                source={{uri: artData?.imgLink}}
                onLoadEnd={() => setIsImgLoaded(true)}
              />

              {/* TopBar */}
              <TopBar
                style={{}}
                headerLeft={() => (
                  <ArrowLeft arrowColor={isImgLoaded ? 'white' : 'black'} />
                )}
                header={() => (
                  <TextMainBd
                    style={{
                      fontSize: 20,
                      marginLeft: 12,
                      color: isImgLoaded ? colors.white : colors.black,
                    }}>
                    {artData?.artTitle}
                  </TextMainBd>
                )}
                headerRight={() => (
                  <TouchableOpacity onPress={() => setIsDDShown(true)}>
                    <Icon source={isImgLoaded ? icons.moreWhite : icons.more} />
                  </TouchableOpacity>
                )}
              />
            </ImgBox>

            <ContentBox>
              <Row style={{justifyContent: 'space-between', marginTop: 20}}>
                <Title>{artData?.artTitle}</Title>
                <TouchableOpacity onPress={() => handleBookmark()}>
                  <Icon
                    source={
                      isBookmarked ? icons.bookmarkFilled : icons.bookmark
                    }
                  />
                </TouchableOpacity>
              </Row>
              <Row style={{marginTop: 20}}>
                <Label>제작연도</Label>
                <Value>{artData?.year}</Value>
              </Row>
              <Row style={{marginTop: 12}}>
                <Label>작가</Label>
                <Value>{artData?.artistName}</Value>
              </Row>
              <Row style={{marginTop: 12}}>
                <Label>재료</Label>
                <Value>{artData?.materials}</Value>
              </Row>
              <Row style={{marginTop: 12}}>
                <Label>스타일</Label>
                <Value>{artData?.style}</Value>
              </Row>

              <SubTitle>상세 설명</SubTitle>
              <DescBox>
                <Desc>{artData?.artDsc}</Desc>
              </DescBox>
              <SubTitle>관련 작품</SubTitle>
            </ContentBox>

            <RowSpace height={12} style={{backgroundColor: colors.white}} />
            {/* Carousel */}
            <Carousel
              style={{backgroundColor: colors.white}}
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
                  onPress={() =>
                    navigation.push('Detail', {artId: item.artId})
                  }>
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
          </ViewShot>
        </ScrollView>
      </TouchableWithoutFeedback>

      {isDDShown && (
        <DropDown items={detailDDItems} setIsDDShown={setIsDDShown} />
      )}
      {<Toast position="top" topOffset={20} visibilityTime={1500} />}
    </Container>
  );
};

export default Detail;

const ContentBox = styled.View`
  padding: 0px 22px;
  background-color: ${colors.white};
`;

const ImgBox = styled.View`
  background-color: ${colors.white};
`;

const Loading = styled.View`
  justify-content: center;
  align-items: center;
`;

const Title = styled(TextMainBd)`
  font-size: 22px;
`;

const Label = styled(TextMainRg)`
  width: 94px;
  font-size: 14px;
`;

const Value = styled(TextMainMd)`
  font-size: 14px;
`;

const DescBox = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const Desc = styled(TextMainRg)`
  font-size: 14px;
`;

const SubTitle = styled(TextMainBd)`
  font-size: 20px;
  margin-top: 60px;
`;
