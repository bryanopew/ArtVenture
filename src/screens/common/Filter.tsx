import React, {useEffect, useMemo, useState} from 'react';
import {
  BtnCTA,
  Container,
  IAvStyled,
  Row,
  TextMainMd,
  TextMainRg,
  TextSubMd,
} from '../../style/styledConst';
import {styled} from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ARTS_MAX_YEAR,
  ARTS_MIN_YEAR,
  artStyles,
  artTypes,
  keywords,
} from '../../utils/const';
import {colors} from '../../style/colors';
import {useRecoilState} from 'recoil';
import {filterState, handleFilter} from '../../recoil/states';
import {Slider} from '@miblanchard/react-native-slider';
import {Text} from 'react-native';
import {useListArt} from '../../query/queries/art';
import {IArt} from '../../query/types/art';
import {useGoToSearchScr} from '../../hooks/customNavHooks';
import {useRoute} from '@react-navigation/native';
import {getFilteredArts} from '../../utils/filter';

const Filter = () => {
  // navigation
  const goToSearchScr = useGoToSearchScr();

  // react-query
  const {data: artData} = useListArt({});

  // recoil
  const [filter, setFilter] = useRecoilState(filterState);

  // useMemo
  // 필터 버튼 상태 변경시 artData 필터링
  // 필터 슬라이더는 렌더링 줄이기 위해 onSlidingComplete에서 필터링
  // !!!!!!!!!!!!!! artData의 type, keyword는 배열!!!!!!!!!!!!
  const filteredArts = useMemo(() => {
    return getFilteredArts(artData, filter);
  }, [filter, artData]);

  return (
    <Container style={{paddingHorizontal: 22}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}>
        <Row style={{marginTop: 28, justifyContent: 'space-between'}}>
          <Title style={{marginTop: 0}}>제작 연도</Title>
          <Year>{`${filter.year[0]} ~ ${filter.year[1]}`}</Year>
        </Row>
        <SliderBox>
          <Slider
            minimumValue={ARTS_MIN_YEAR}
            maximumValue={ARTS_MAX_YEAR}
            value={filter.year}
            onValueChange={value =>
              handleFilter({
                setter: setFilter,
                type: 'year',
                value,
              })
            }
            onSlidingComplete={() => console.log(filter)}
            step={10}
            thumbTintColor={colors.black}
            maximumTrackTintColor={colors.inactivate}
            minimumTrackTintColor={colors.black}
            trackStyle={{height: 6}}
          />
        </SliderBox>
        <Title>유형</Title>
        <BtnBox>
          {artTypes.map((item, index) => (
            <Btn
              key={index}
              isActivated={filter.artTypes.includes(item)}
              onPress={() => {
                handleFilter({
                  setter: setFilter,
                  type: 'artTypes',
                  value: item,
                });
              }}>
              <BtnText isActivated={filter.artTypes.includes(item)}>
                {item}
              </BtnText>
            </Btn>
          ))}
        </BtnBox>
        <Title>키워드</Title>
        <BtnBox>
          {keywords.map((item, index) => (
            <Btn
              key={index}
              isActivated={filter.keywords.includes(item)}
              onPress={() => {
                handleFilter({
                  setter: setFilter,
                  type: 'keywords',
                  value: item,
                });
              }}>
              <BtnText isActivated={filter.keywords.includes(item)}>
                {item}
              </BtnText>
            </Btn>
          ))}
        </BtnBox>
        <Title>스타일</Title>
        <BtnBox>
          {artStyles.map((item, index) => (
            <Btn
              key={index}
              isActivated={filter.artStyles.includes(item)}
              onPress={() => {
                handleFilter({
                  setter: setFilter,
                  type: 'artStyles',
                  value: item,
                });
              }}>
              <BtnText isActivated={filter.artStyles.includes(item)}>
                {item}
              </BtnText>
            </Btn>
          ))}
        </BtnBox>
      </ScrollView>
      <BtnCTA
        style={{
          position: 'absolute',
          bottom: 44,
          flexDirection: 'row',
        }}
        onPress={() =>
          !!filteredArts
            ? goToSearchScr({isResultShown: true})
            : goToSearchScr()
        }>
        <CTAText>결과보기</CTAText>
        {!!filteredArts && <CTATextNum>({filteredArts.length})</CTATextNum>}
      </BtnCTA>
    </Container>
  );
};

export default Filter;

const Title = styled(TextMainMd)`
  font-size: 16px;
  margin-top: 36px;
`;

const Year = styled(TextSubMd)`
  font-size: 12px;
`;

const SliderBox = styled.View`
  width: 100%;
`;

const BtnBox = styled.View`
  flex-direction: row;
  margin-top: 18px;
  row-gap: 12px;
  column-gap: 14px;
  flex-wrap: wrap;
`;

const Btn = styled.TouchableOpacity<{isActivated: boolean}>`
  padding: 6px 12px;
  border-radius: 4px;
  background-color: ${({isActivated}) =>
    isActivated ? colors.black : colors.white};
  align-items: center;
  justify-content: center;
  border-width: ${({isActivated}) => (isActivated ? `0px` : `0.5px`)};
  border-color: ${colors.inactivate};
`;

const BtnText = styled(TextMainMd)<{isActivated: boolean}>`
  color: ${({isActivated}) => (isActivated ? colors.white : colors.inactivate)};
`;

const CTAText = styled(TextMainRg)`
  color: ${colors.white};
  font-size: 18px;
  /* background-color: blueviolet;   */
`;
const CTATextNum = styled(TextSubMd)`
  font-size: 12px;
  margin-left: 8px;
  /* background-color: aliceblue;  */
`;
