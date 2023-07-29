import {View, Text, Image} from 'react-native';
import {
  HOME_ART_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  _MPY_,
} from '../../utils/const';
import React, {useEffect, useMemo} from 'react';
import styled from 'styled-components/native';
import {Container, Row, TextMainBd} from '../../style/styledConst';
import Carousel from 'react-native-reanimated-carousel';
import {colors} from '../../style/colors';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {icons} from '../../assets/icons';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {currentScrState} from '../../recoil/atoms';

const recommendedExTest = [
  {
    name: '전시1',
    uri: 'https://drive.google.com/uc?export=view&id=1VNzVcpOqKsa1EhpslYtP4gPP7qNDIqXZ',
  },
  {
    name: '전시2',
    uri: 'https://drive.google.com/uc?export=view&id=1lMwt-QXHaR16TWhICNuT29mdJ6LV4_RO',
  },
  {
    name: '전시3',
    uri: 'https://drive.google.com/uc?export=view&id=1aoZ62402vjdQ1aAWpTt31xjjW1AanTaY',
  },
  {
    name: '전시4',
    uri: 'https://drive.google.com/uc?export=view&id=1M7dP3apFOsZhKDyMyI1wrhd8o7gIOR7F',
  },
  {
    name: '전시5',
    uri: 'https://drive.google.com/uc?export=view&id=1ksMsWE4a-0A6SU0lsUhQF0UcYx7Psfz2',
  },
];

const famousArtTest = [
  {
    name: 'test1',
    uri: 'https://drive.google.com/uc?export=view&id=1VNzVcpOqKsa1EhpslYtP4gPP7qNDIqXZ',
  },
  {
    name: 'test2',
    uri: 'https://drive.google.com/uc?export=view&id=1lMwt-QXHaR16TWhICNuT29mdJ6LV4_RO',
  },
  {
    name: 'test3',
    uri: 'https://drive.google.com/uc?export=view&id=1aoZ62402vjdQ1aAWpTt31xjjW1AanTaY',
  },
  {
    name: 'test4',
    uri: 'https://drive.google.com/uc?export=view&id=1M7dP3apFOsZhKDyMyI1wrhd8o7gIOR7F',
  },
  {
    name: 'test5',
    uri: 'https://drive.google.com/uc?export=view&id=1ksMsWE4a-0A6SU0lsUhQF0UcYx7Psfz2',
  },
];

const Home = () => {
  // navigation
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  // recoil
  const [currentScr, setCurrentScr] = useRecoilState(currentScrState);

  // useeffect
  useEffect(() => {
    console.log(isFocused);
    isFocused && setCurrentScr(route.name);
  }, [route.name]);

  // etc
  const famousArtTestWithSize = useMemo(() => {
    return famousArtTest.map(art => {
      const {artWidth, artHeight} = Image.getSize(
        art.uri,
        (width, height) => {
          console.log(width, height);
        },
        () => {
          console.log(`${art.name} getSize error`);
        },
      );

      const height = 326 * _MPY_;
      const width = artWidth * (height / artHeight);

      return {
        ...art,
        width,
        height,
      };
    });
  }, [famousArtTest]);

  // animation
  const animValue = useSharedValue<number>(0);

  return (
    <Container>
      <HomeScroll>
        {/* exhibition */}
        <RecommendExTitle>이 주의 추천 전시회</RecommendExTitle>
        <Carousel
          style={{marginTop: 16 * _MPY_}}
          loop
          width={SCREEN_WIDTH}
          height={700 * _MPY_}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.95,
            parallaxScrollingOffset: 100,
          }}
          data={recommendedExTest}
          scrollAnimationDuration={1000}
          onSnapToItem={index => console.log('current index:', index)}
          onProgressChange={(_, absoluteProgress) => {
            // console.log('absoluteProgress:', absoluteProgress);
            animValue.value = absoluteProgress;
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          renderItem={({item, index}) => (
            <RecommendExBox
              onPress={() => {
                console.log(item.name, 'pressed');
                navigate('HomeShow', {name: item.name, uri: item.uri});
              }}>
              <RecommendExImg source={{uri: item.uri}} />
            </RecommendExBox>
          )}
        />
        <PaginationBox>
          {recommendedExTest.map((_, index) => (
            <Pagination
              key={index}
              index={index}
              animValue={animValue}
              length={recommendedExTest.length}
            />
          ))}
        </PaginationBox>

        {/* homeList */}
        <Row
          style={{
            marginTop: 96 * _MPY_,
            justifyContent: 'space-between',
            marginHorizontal: 46 * _MPY_,
          }}>
          <HomeTitle>유명작가 그림 모음집</HomeTitle>
          <RightImg source={icons.right} />
        </Row>
        <HomeHorizontalScroll horizontal={true}>
          {famousArtTestWithSize.map((art, index) => (
            <ArtBox
              key={index}
              onPress={() => {
                console.log(art.name, 'pressed');
                navigate('HomeNav', {
                  screen: 'HomeList',
                });
              }}>
              <ArtImg
                source={{uri: art.uri}}
                style={{
                  height: HOME_ART_HEIGHT,
                  width: art.width
                    ? (art.width * HOME_ART_HEIGHT) / art.height
                    : HOME_ART_HEIGHT,
                }}
              />
            </ArtBox>
          ))}
        </HomeHorizontalScroll>
      </HomeScroll>
    </Container>
  );
};

const Pagination: React.FC<{
  index: number;
  animValue: Animated.SharedValue<number>;
  length: number;
}> = ({index, animValue, length}) => {
  // animation

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [1, 1.8, 1];
    let outputColorRange = [colors.inactivate, colors.black, colors.inactivate];
    if (index === 0 && animValue.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [1, 1.8, 1];
      outputColorRange = [colors.inactivate, colors.black, colors.inactivate];
    }

    let interpolatedValue = interpolate(
      animValue.value,
      inputRange,
      outputRange,
      Extrapolate.CLAMP,
    );
    return {
      backgroundColor: interpolateColor(
        animValue.value,
        inputRange,
        outputColorRange,
      ),
      transform: [{scaleX: interpolatedValue}],
    };
  }, [animValue.value]);

  return (
    <Animated.View
      style={[
        {
          width: 10 * _MPY_,
          height: 10 * _MPY_,
          borderRadius: 4 * _MPY_,
        },
        animStyle,
      ]}
    />
  );
};

export default Home;

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
const HomeScroll = styled.ScrollView``;

const RecommendExTitle = styled(TextMainBd)`
  font-size: ${40 * _MPY_}px;
  margin-top: ${32 * _MPY_}px;
  margin-left: ${46 * _MPY_}px;
`;

const RecommendExBox = styled.Pressable`
  width: ${525 * _MPY_}px;
  height: ${700 * _MPY_}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-width: 1px;
`;
const RecommendExImg = styled.Image`
  width: ${525 * _MPY_}px;
  height: ${700 * _MPY_}px;
`;

const PaginationBox = styled.View`
  align-self: center;
  flex-direction: row;
  margin-top: ${32 * _MPY_}px;
  column-gap: ${14 * _MPY_}px;
`;

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
const ArtImg = styled.Image`
  border-radius: ${10 * _MPY_}px;
`;
