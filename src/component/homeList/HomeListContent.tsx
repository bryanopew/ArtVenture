import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {styled} from 'styled-components/native';
import {SCREEN_WIDTH, testArts} from '../../utils/const';
import {Col, Icon, Row, TextMainBd, TextSubBd} from '../../style/styledConst';
import {icons} from '../../assets/icons';
import {useGoToArtistScr, useGoToDetailScr} from '../../hooks/customNavHooks';
import {IArt} from '../../query/types/art';
import {IArtist} from '../../query/types/artists';
import FastImage from 'react-native-fast-image';

interface IHomeListContent {
  artist: Partial<IArtist>;
  arts: IArt[];
}
const HomeListContent = ({artist, arts}: IHomeListContent) => {
  // navigation
  const goToArtistScr = useGoToArtistScr();
  const goToDetailScr = useGoToDetailScr();

  return (
    // Flatlist 최적화를 위한 height
    // ArtistBox: 24px, margin: 12px, ImageHeight: (SCREEN_WIDTH - 22 - 22 - 8) / 2 * 2  gap: 8px, rowSpace: 40px
    // => 84px
    <ContentBox>
      <ArtistBox>
        <Row style={{alignItems: 'flex-end'}}>
          <Artist>{artist.artistName}</Artist>
          <Year>{artist.year}</Year>
        </Row>
        <RightBtn onPress={() => goToArtistScr({artistId: artist.artistId})}>
          <Icon source={icons.rightGrey} />
        </RightBtn>
      </ArtistBox>

      <ArtBox>
        {arts.map((art, index) => (
          <TouchableOpacity
            key={art.artId}
            onPress={() => goToDetailScr({artId: art.artId})}>
            <FastImage
              style={{
                width: (SCREEN_WIDTH - 22 - 22 - 8) / 2,
                height: (SCREEN_WIDTH - 22 - 22 - 8) / 2,
                borderRadius: 4,
              }}
              source={{uri: art.imgLink}}
            />
          </TouchableOpacity>
        ))}
      </ArtBox>
    </ContentBox>
  );
};

export default HomeListContent;

const ContentBox = styled.View`
  padding-left: 22px;
  padding-right: 22px;
`;

const ArtistBox = styled.View`
  height: 24px;
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
  row-gap: 8px;
  flex-wrap: wrap;
`;

const ArtImg = styled.Image`
  width: ${(SCREEN_WIDTH - 22 - 22 - 8) / 2}px;
  height: ${(SCREEN_WIDTH - 22 - 22 - 8) / 2}px;
`;
