import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {currentScrState} from '../../recoil/atoms';
import {
  Container,
  Icon,
  Line,
  Row,
  TextMainBd,
  TextMainRg,
  TextSubMd,
  TextSubRg,
} from '../../style/styledConst';
import {styled} from 'styled-components/native';
import {SCREEN_WIDTH, _MPY_} from '../../utils/const';
import {BlurView} from '@react-native-community/blur';
import {ScrollView} from 'react-native-gesture-handler';
import {icons} from '../../assets/icons';
import {colors} from '../../style/colors';

const HomeShow = () => {
  // navigation
  const route = useRoute();
  console.log(route.params.uri);
  const isFocused = useIsFocused();

  // recoil
  const [currentScr, setCurrentScr] = useRecoilState(currentScrState);

  // useState
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    isFocused && setCurrentScr(route.name);
  }, [route.name]);
  return (
    <Container>
      <ScrollView style={{flex: 1}}>
        <MainImageBox>
          <BlurImg source={{uri: route?.params?.uri}} resizeMode="stretch" />
          <BlurView
            style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
            blurType="light"
            blurAmount={20}
          />
          <MainImg source={{uri: route?.params?.uri}} />
        </MainImageBox>

        <ContentBox>
          <ExhibitionTitle numberOfLines={1} ellipsizeMode="tail">
            서도호와 아이들: 아트랜드
          </ExhibitionTitle>
          <ExhibitionSubTitle numberOfLines={1} ellipsizeMode="tail">
            전시 / 상설 · 전체관람가
          </ExhibitionSubTitle>
          <Row style={{marginTop: 24 * _MPY_}}>
            <Icon source={icons.location} />
            <SummaryText numberOfLines={1} ellipsizeMode="tail">
              서울시립 북서울미술관 B1 어린이갤러리
            </SummaryText>
          </Row>
          <Row style={{marginTop: 24 * _MPY_}}>
            <Icon source={icons.calender} />
            <SummaryText numberOfLines={1} ellipsizeMode="tail">
              2023. 05. 02 ~ 2024. 02. 29
            </SummaryText>
          </Row>
          <Row style={{marginTop: 24 * _MPY_}}>
            <Icon source={icons.artist} />
            <SummaryText numberOfLines={1} ellipsizeMode="tail">
              서도호와 아이들
            </SummaryText>
          </Row>
          <Row style={{marginTop: 24 * _MPY_}}>
            <Icon source={icons.price} />
            <SummaryText numberOfLines={1} ellipsizeMode="tail">
              무료
            </SummaryText>
          </Row>
        </ContentBox>
        <Line
          direction="horizontal"
          lineWidth={0.5}
          style={{marginTop: 48 * _MPY_}}
        />
        <ContentBox>
          <GuideText>전시소개</GuideText>
          <DescripttionText
            numberOfLines={loadMore ? undefined : 5}
            ellipsizeMode="tail">
            2022년 7월 26일부터 2023년 3월 12일까지 서울시립 북서울미술관은
            관람객 참여형 어린이 전시《서도호와 아이들: 아트랜드》를
            개최했습니다. 이를 통해 약 14,000명의 어린이들이 만든 61개의 섬으로
            이어진 거대한 아트랜드가 탄생하였습니다. 아트랜드 의 시작은 약 8년
            전으로 거슬러 올라갑니다. 서도호 작가와 그의 두 아이들은 집에서
            어린이용 점토를 사용해 다양한 동식물이 사는 복잡하고 환상적인 생태계
            ‘아트랜드’를 만들었습니다. 이러한 아트랜드의 섬들 중 하나가
            북서울미술관으로 옮겨져, 이제 미술관에 오는 아이들은 새로운 섬들을
            하나씩 이어 나갑니다.이번 2023년 5월부터는 기존의 아이들이 만든
            섬들을 지하 세계로 돌리고 일부를 다시 새롭게 이어 아이들이
            지속적으로 아트랜드를 확장에 참여할 수 있도록 하는 상설전 《서도호와
            아이들: 아트랜드》를 준비하였습니다. 약 1년의 기간 동안 자유롭고
            지속적으로 아트랜드에 방문하여 이 아트랜드가 어디까지 계속 뻗어나갈
            수 있는지 함께 참여해 주시고 지켜봐 주시길 바랍니다.
          </DescripttionText>
          {!loadMore && (
            <LoadMoreBtn onPress={() => setLoadMore(true)}>
              <LoadMore>더보기</LoadMore>
            </LoadMoreBtn>
          )}
          <MapBox></MapBox>
          <Address>서울 노원구 동일로 1238</Address>
        </ContentBox>
      </ScrollView>
    </Container>
  );
};

export default HomeShow;

const MainImageBox = styled.View`
  width: ${SCREEN_WIDTH}px;
  height: ${812 * _MPY_}px;
  align-items: center;
  justify-content: center;
`;

const MainImg = styled.Image`
  width: ${525 * _MPY_}px;
  height: ${700 * _MPY_}px;
`;

const BlurImg = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ContentBox = styled.View`
  width: ${SCREEN_WIDTH - 92 * _MPY_}px;
  align-self: center;
`;

const ExhibitionTitle = styled(TextMainBd)`
  font-size: ${44 * _MPY_}px;
  margin-top: ${32 * _MPY_}px;
`;

const ExhibitionSubTitle = styled(TextSubRg)`
  font-size: ${24 * _MPY_}px;
  margin-top: ${12 * _MPY_}px;
`;

const SummaryText = styled(TextMainRg)`
  font-size: ${30 * _MPY_}px;
  margin-left: ${8 * _MPY_}px;
`;

const GuideText = styled(TextMainBd)`
  font-size: ${40 * _MPY_}px;
  margin-top: ${64 * _MPY_}px;
`;

const DescripttionText = styled(TextMainRg)`
  font-size: ${28 * _MPY_}px;
  margin-top: ${24 * _MPY_}px;
`;
const LoadMoreBtn = styled.TouchableOpacity``;
const LoadMore = styled(TextSubMd)`
  font-size: ${28 * _MPY_}px;
  align-self: flex-end;
`;

const MapBox = styled.View`
  width: 100%;
  height: ${320 * _MPY_}px;
  background-color: ${colors.inactivate};
  margin-top: ${48 * _MPY_}px;
`;

const Address = styled(TextMainRg)`
  font-size: ${28 * _MPY_}px;
  margin-top: ${28 * _MPY_}px;
`;
