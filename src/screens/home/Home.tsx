import {
  HOME_ART_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  _MPY_,
} from '../../utils/const';
import React, {useEffect, useMemo} from 'react';
import styled from 'styled-components/native';
import {Container, RowSpace, TextMainBd} from '../../style/styledConst';
import Carousel from 'react-native-reanimated-carousel';
import {colors} from '../../style/colors';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import HomeSubjectContent from '../../component/home/HomeSubjectContent';
import {useListSubject} from '../../query/queries/subject';

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

const Home = () => {
  // react-query
  const {data: subjects, isInitialLoading: isSubjectLoading} = useListSubject();

  // navigation
  const {navigate} = useNavigation();

  // animation
  const animValue = useSharedValue<number>(0);

  return (
    <Container>
      <HomeScroll>
        {/* exhibition */}
        <RecommendExTitle>이 주의 추천 전시회</RecommendExTitle>
        <Carousel
          style={{marginTop: 8}}
          loop
          width={SCREEN_WIDTH}
          height={350 * _MPY_}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.95,
            parallaxScrollingOffset: 100,
          }}
          data={recommendedExTest}
          scrollAnimationDuration={350}
          onSnapToItem={index => console.log('current index:', index)}
          onProgressChange={(_, absoluteProgress) => {
            animValue.value = absoluteProgress;
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          renderItem={({item, index}) => (
            <RecommendExBox
              onPress={() => {
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

        <RowSpace style={{height: 16}} />
        {/* homeList */}
        {isSubjectLoading ||
          subjects?.map((subject, index) => (
            <HomeSubjectContent key={index} subject={subject} />
          ))}
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
          width: 5,
          height: 5,
          borderRadius: 3,
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
  font-size: 20px;
  margin-top: 16px;
  margin-left: 22px;
`;

const RecommendExBox = styled.Pressable`
  width: ${262 * _MPY_}px;
  height: ${350 * _MPY_}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-width: 0.5px;
  border-color: ${colors.line};
`;
const RecommendExImg = styled.Image`
  width: ${262 * _MPY_}px;
  height: ${350 * _MPY_}px;
`;

const PaginationBox = styled.View`
  align-self: center;
  flex-direction: row;
  margin-top: 16px;
  column-gap: 8px;
`;

const TestImg = styled.Image`
  width: 200px;
  height: 200px;
`;
