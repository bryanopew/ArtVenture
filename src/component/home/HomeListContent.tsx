import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {styled} from 'styled-components/native';
import {SCREEN_WIDTH, testArts} from '../../utils/const';
import {Col, Icon, Row, TextMainBd, TextSubBd} from '../../style/styledConst';
import {icons} from '../../assets/icons';
import {useGoToArtistScr, useGoToDetailScr} from '../../hooks/customNavHooks';

interface IArts {
  name: string;
  id: string;
  uri: string;
  width: number;
  height: number;
}

// {id: 1, name: '빈센트 반 고흐', works: [1, 2, 3, 4, 5]},
interface IHomeListContent {
  id: string;
  name: string;
  year: string;
  works: string[];
}
const HomeListContent = ({id, name, year, works}: IHomeListContent) => {
  // navigation
  const goToArtistScr = useGoToArtistScr();
  const goToDetailScr = useGoToDetailScr();

  // useState
  const [leftArts, setLeftArts] = useState<IArts[]>();
  const [rightArts, setRightArts] = useState<IArts[]>();

  // 모든 이미지의 사이즈 가져와서
  // 왼쪽, 오른쪽 컬럼에 들어갈 사진 개수 설정
  useEffect(() => {
    const setArtNum = async () => {
      let leftNum = 0;
      let totalHeight = 0;
      let artWithSizeInEffect: IArts[] = [];

      for (let i = 0; i < testArts.length; i++) {
        await Image.getSize(testArts[i].uri, (width, height) => {
          const modWidth = (SCREEN_WIDTH - (22 + 22 + 8)) / 2;
          const modHeight = (height * modWidth) / width;
          artWithSizeInEffect.push({
            ...testArts[i],
            width: modWidth,
            height: modHeight,
          });
          totalHeight += modHeight;
        });
      }

      let sumHeight = 0;
      for (let i = 0; i < artWithSizeInEffect.length; i++) {
        const prevHeight = sumHeight;
        sumHeight += artWithSizeInEffect[i].height;
        if (sumHeight >= totalHeight / 2) {
          if (totalHeight / 2 - prevHeight <= sumHeight - totalHeight / 2) {
            leftNum = i;
          } else {
            leftNum = i + 1;
          }
          break;
        }
      }
      setLeftArts(artWithSizeInEffect.slice(0, leftNum));
      setRightArts(artWithSizeInEffect.slice(leftNum));
    };

    setArtNum();
  }, [testArts]);

  return (
    <ContentBox>
      <ArtistBox>
        <Row style={{alignItems: 'flex-end'}}>
          <Artist>{name}</Artist>
          <Year>{year}</Year>
        </Row>
        <RightBtn onPress={() => goToArtistScr({id: '1'})}>
          <Icon source={icons.rightGrey} />
        </RightBtn>
      </ArtistBox>

      <ArtBox>
        {leftArts && (
          <ArtColumn>
            {leftArts.map(art => (
              <TouchableOpacity
                key={art.id}
                onPress={() => goToDetailScr({id: '1'})}>
                <Image
                  style={{borderRadius: 4}}
                  source={{uri: art.uri, width: art.width, height: art.height}}
                />
              </TouchableOpacity>
            ))}
          </ArtColumn>
        )}
        {rightArts && (
          <ArtColumn>
            {rightArts.map(art => (
              <TouchableOpacity
                key={art.id}
                onPress={() => goToDetailScr({id: '1'})}>
                <Image
                  style={{borderRadius: 4}}
                  source={{uri: art.uri, width: art.width, height: art.height}}
                />
              </TouchableOpacity>
            ))}
          </ArtColumn>
        )}
      </ArtBox>
    </ContentBox>
  );
};

export default HomeListContent;

const ContentBox = styled.View`
  margin-top: 40px;
  padding-left: 22px;
  padding-right: 22px;
`;

const ArtistBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const Artist = styled(TextMainBd)`
  font-size: 16px;
`;
const Year = styled(TextSubBd)`
  font-size: 12px;
  margin-left: 4px;
`;

const RightBtn = styled.TouchableOpacity`
  margin-right: -6px;
`;

const ArtBox = styled.View`
  width: 100%;
  margin-top: 12px;
  flex-direction: row;
  column-gap: 8px;
`;

const ArtColumn = styled.View`
  flex: 1;
  row-gap: 8px;
`;
