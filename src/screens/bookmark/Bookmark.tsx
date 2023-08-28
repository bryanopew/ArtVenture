import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Container,
  Icon,
  NavHeader,
  RowSpace,
  TextMainBd,
  TextMainRg,
  TextSubRg,
} from '../../style/styledConst';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {icons} from '../../assets/icons';
import DropDown from '../../component/common/DropDown';
import TopBar from '../../component/common/TopBar';
import ArrowLeft from '../../component/nav/ArrowLeft';
import {useListArt} from '../../query/queries/art';
import {IArt} from '../../query/types/art';
import {getBookmarkedArts} from '../../utils/bookmark';
import {styled} from 'styled-components/native';
import {
  ART_WIDTH_SMALL,
  SCREEN_WIDTH,
  getFlatListItemLayout,
} from '../../utils/const';
import FastImage from 'react-native-fast-image';
import {reGroupArtsByArtist} from '../../utils/reGroupArts';

const Bookmark = () => {
  // navigation
  const {setOptions, navigate} = useNavigation();
  const isFocused = useIsFocused();

  // react-query
  const {data: artData} = useListArt({});

  // useState
  const [bookmarkedArtGroup, setBookmarkedArtGroup] = useState<IArt[][]>([]);
  const [isDDShown, setIsDDShown] = useState<boolean>(false);
  useEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsDDShown(true)}>
          <Icon source={icons.moreWhite} />
        </TouchableOpacity>
      ),
    });
  }, []);

  // useEffect
  useEffect(() => {
    if (!isFocused) return;
    const updateBookmarkedArts = async () => {
      if (!artData) return;
      const bookmarkedArts = await getBookmarkedArts(artData);
      const regrouped = reGroupArtsByArtist(bookmarkedArts);
      regrouped && setBookmarkedArtGroup(regrouped);
    };
    updateBookmarkedArts();
  }, [artData, isFocused]);

  // etc
  // dropdown items
  const bookmarkDDItems = [
    {
      label: '편집',
      fn: () => {
        console.log('편집');
      },
    },
    {
      label: '모두 선택',
      fn: () => {
        console.log('모두 선택');
      },
    },
    {
      label: '공유하기',
      fn: () => {
        console.log('공유하기');
      },
    },
    {
      label: '저장',
      fn: () => {
        console.log('저장');
      },
    },
  ];

  const handleBookmark = () => {};

  return (
    <Container>
      <TouchableWithoutFeedback
        style={{width: '100%', height: '100%'}}
        onPressIn={() => setIsDDShown(false)}>
        <TopBar
          style={{position: 'relative'}}
          headerLeft={() => <ArrowLeft arrowColor="black" />}
          header={() => <NavHeader>북마크</NavHeader>}
          headerRight={() => (
            <TouchableOpacity onPress={() => setIsDDShown(true)}>
              <Icon source={icons.more} />
            </TouchableOpacity>
          )}
        />
        {bookmarkedArtGroup.length > 0 && (
          <FlatList
            contentContainerStyle={{paddingHorizontal: 22, marginLeft: -8}}
            horizontal={false}
            data={bookmarkedArtGroup}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <RowSpace height={20} />}
            numColumns={2}
            windowSize={11}
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            getItemLayout={(data, index) =>
              getFlatListItemLayout(data, index, ART_WIDTH_SMALL + 8)
            }
            renderItem={({item}) => (
              <ImgBox
                onPress={() =>
                  navigate('BookmarkDetail', {artistId: item[0].artistId})
                }>
                <FastImage
                  source={{uri: item[0]?.imgLink}}
                  resizeMode="cover"
                  style={{
                    width: (SCREEN_WIDTH - 44 - 8) / 2,
                    height: (SCREEN_WIDTH - 44 - 8) / 2,
                    borderRadius: 4,
                  }}
                />
                <ImgArtist>{item[0]?.artistName}</ImgArtist>
                <ImgNum>{item.length}</ImgNum>
              </ImgBox>
            )}
          />
        )}
      </TouchableWithoutFeedback>
      {isDDShown && (
        <DropDown items={bookmarkDDItems} setIsDDShown={setIsDDShown} />
      )}
    </Container>
  );
};

export default Bookmark;

const ImgBox = styled.TouchableOpacity`
  border-radius: 2px;
  margin-left: 8px;
`;

const ImgArtist = styled(TextMainBd)`
  font-size: 16px;
  margin-top: 8px;
`;
const ImgNum = styled(TextSubRg)`
  font-size: 12px;
`;
