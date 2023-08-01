import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {styled} from 'styled-components/native';
import {SCREEN_WIDTH, _MPY_} from '../../utils/const';
import {Col, Icon, Row, TextMainBd, TextSubBd} from '../../style/styledConst';
import {icons} from '../../assets/icons';

interface IArts {
  name: string;
  id: string;
  uri: string;
  width: number;
  height: number;
}
const testArts = [
  {
    name: 'test1',
    id: '1',
    uri: 'https://drive.google.com/uc?export=view&id=1VNzVcpOqKsa1EhpslYtP4gPP7qNDIqXZ',
  },
  {
    name: 'test2',
    id: '2',
    uri: 'https://drive.google.com/uc?export=view&id=1lMwt-QXHaR16TWhICNuT29mdJ6LV4_RO',
  },
  {
    name: 'test3',
    id: '3',
    uri: 'https://drive.google.com/uc?export=view&id=1aoZ62402vjdQ1aAWpTt31xjjW1AanTaY',
  },
  {
    name: 'test4',
    id: '4',
    uri: 'https://drive.google.com/uc?export=view&id=1M7dP3apFOsZhKDyMyI1wrhd8o7gIOR7F',
  },
  {
    name: 'test5',
    id: '5',
    uri: 'https://drive.google.com/uc?export=view&id=1ksMsWE4a-0A6SU0lsUhQF0UcYx7Psfz2',
  },
];

// {id: 1, name: '빈센트 반 고흐', works: [1, 2, 3, 4, 5]},
interface IHomeListContent {
  id: string;
  name: string;
  year: string;
  works: string[];
}
const HomeListContent = ({id, name, year, works}: IHomeListContent) => {
  // useState
  const [leftArts, setLeftArts] = useState<IArts[]>();
  const [rightArts, setRightArts] = useState<IArts[]>();
  useEffect(() => {
    const setArtNum = async () => {
      let leftNum = 0;
      let totalHeight = 0;
      let artWithSizeInEffect: IArts[] = [];

      for (let i = 0; i < testArts.length; i++) {
        await Image.getSize(testArts[i].uri, (width, height) => {
          const modWidth = (SCREEN_WIDTH - (46 + 46 + 20) * _MPY_) / 2;
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
        <RightBtn
          onPress={() => {
            console.log('ArtistPage로 이동');
          }}>
          <Icon source={icons.rightGrey} />
        </RightBtn>
      </ArtistBox>

      <ArtBox>
        {leftArts && (
          <ArtColumn>
            {leftArts.map(art => (
              <TouchableOpacity
                key={art.id}
                onPress={() => console.log('detail로 이동')}>
                <Image
                  style={{borderRadius: 10 * _MPY_}}
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
                onPress={() => console.log('detail로 이동')}>
                <Image
                  style={{borderRadius: 10 * _MPY_}}
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
  margin-top: ${60 * _MPY_}px;
  padding-left: ${46 * _MPY_}px;
  padding-right: ${46 * _MPY_}px;
`;

const ArtistBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const Artist = styled(TextMainBd)`
  font-size: ${34 * _MPY_}px;
`;
const Year = styled(TextSubBd)`
  font-size: ${24 * _MPY_}px;
  margin-left: ${8 * _MPY_}px;
`;

const RightBtn = styled.TouchableOpacity`
  margin-right: ${-16 * _MPY_}px;
`;

const ArtBox = styled.View`
  width: 100%;
  margin-top: ${24 * _MPY_}px;
  flex-direction: row;
  column-gap: ${20 * _MPY_}px;
`;

const ArtColumn = styled.View`
  flex: 1;
  row-gap: ${20 * _MPY_}px;
`;
