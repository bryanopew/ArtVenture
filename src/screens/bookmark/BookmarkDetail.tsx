import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useListArt} from '../../query/queries/art';
import {
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  Container,
  Icon,
  NavHeader,
  RowSpace,
  TextMainRg,
} from '../../style/styledConst';
import {icons} from '../../assets/icons';
import {filterArtByArtistId, getBookmarkedArts} from '../../utils/bookmark';
import FastImage from 'react-native-fast-image';
import {ART_WIDTH_SMALL, getFlatListItemLayout} from '../../utils/const';
import TopBar from '../../component/common/TopBar';
import ArrowLeft from '../../component/nav/ArrowLeft';
import {IArt} from '../../query/types/art';
import DropDown from '../../component/common/DropDown';
import {styled} from 'styled-components/native';
import {useGoToDetailScr} from '../../hooks/customNavHooks';
import {colors} from '../../style/colors';

const BookmarkDetail = () => {
  // navigation
  const goToDetailScr = useGoToDetailScr();
  const {setOptions} = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  // react-query
  const {data: artData} = useListArt({});

  // useState
  const [bookmarkedArts, setBookmarkedArts] = useState<Array<IArt>>([]);
  const [isDDShown, setIsDDShown] = useState<boolean>(false);

  const [isSelectState, setIsSelectState] = useState<boolean>(false);
  const [selectedArtId, setSelectedArtId] = useState<number[]>([]);
  // console.log('BookmarkDetail: isSelectState: ', isSelectState);
  // console.log('BookmarkDetail: selectedArtId: ', selectedArtId);

  // useEffect
  useEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsDDShown(true)}>
          <Icon source={icons.moreWhite} />
        </TouchableOpacity>
      ),
    });
  }, []);
  useEffect(() => {
    if (!isFocused) return;
    const updateBookmarkedArts = async () => {
      if (!artData || !route.params?.artistId) return;
      const bookmarkedArts = await getBookmarkedArts(artData);
      const filteredBookmarkArts = filterArtByArtistId(
        bookmarkedArts,
        route.params.artistId,
      );
      bookmarkedArts && setBookmarkedArts(filteredBookmarkArts);
    };
    updateBookmarkedArts();
  }, [artData, isFocused]);

  // etc
  // functions
  const selectAll = () => {
    console.log('selectAll: current Art length: ', bookmarkedArts.length);
    const allArtIds = bookmarkedArts.map(art => art.artId);
    setSelectedArtId(allArtIds);
    setIsSelectState(true);
  };

  const onLongPressHandle = (artId: number) => {
    if (isSelectState) return;
    setSelectedArtId([artId]);
    setIsSelectState(true);
  };

  const onPressHandle = (artId: number) => {
    if (!isSelectState) {
      goToDetailScr({artId});
      return;
    }

    if (!selectedArtId.includes(artId)) {
      setSelectedArtId(v => [...v, artId]);
      return;
    }

    if (selectedArtId.length === 1) setIsSelectState(false);
    setSelectedArtId(selectedArtId.filter(id => id !== artId));
  };

  // dropdown items
  const bookmarkDDItems = [
    {label: '편집', fn: () => setIsSelectState(true)},
    {label: '모두선택', fn: () => selectAll()},
  ];

  const selectStateDDItems = [{label: '모두선택', fn: () => selectAll()}];

  return (
    <Container>
      <TouchableWithoutFeedback
        style={{width: '100%', height: '100%'}}
        onPressIn={() => setIsDDShown(false)}>
        {isSelectState ? (
          <TopBar
            style={{position: 'relative'}}
            header={() =>
              isSelectState ? (
                <RemoveBookmarkBtn onPress={() => {}}>
                  <Icon
                    size={16}
                    style={{marginLeft: 8}}
                    source={icons.cancelSmall}
                  />
                  <CancelBtnText>{selectedArtId.length}</CancelBtnText>
                </RemoveBookmarkBtn>
              ) : (
                <NavHeader style={{marginLeft: -20}}>작품선택</NavHeader>
              )
            }
            headerRight={() => (
              <TouchableOpacity onPress={() => setIsDDShown(true)}>
                <Icon source={icons.more} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <TopBar
            style={{position: 'relative'}}
            headerLeft={() => <ArrowLeft arrowColor="black" />}
            header={() => (
              <NavHeader>{bookmarkedArts[0]?.artistName}</NavHeader>
            )}
            headerRight={() => (
              <TouchableOpacity onPress={() => setIsDDShown(true)}>
                <Icon source={icons.more} />
              </TouchableOpacity>
            )}
          />
        )}

        {bookmarkedArts.length > 0 && (
          <FlatList
            contentContainerStyle={{
              marginTop: 20,
              paddingHorizontal: 22,
              marginLeft: -8,
            }}
            horizontal={false}
            data={bookmarkedArts}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <RowSpace height={8} />}
            numColumns={3}
            windowSize={11}
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            getItemLayout={(data, index) =>
              getFlatListItemLayout(data, index, ART_WIDTH_SMALL + 8)
            }
            renderItem={({item}) => (
              <ImgBox
                onLongPress={() => onLongPressHandle(item.artId)}
                onPress={() => onPressHandle(item.artId)}>
                <FastImage
                  source={{uri: item.imgLink}}
                  resizeMode="cover"
                  style={{
                    width: ART_WIDTH_SMALL,
                    height: ART_WIDTH_SMALL,
                    borderRadius: 2,
                  }}
                />
                {isSelectState && (
                  <Icon
                    size={20}
                    style={{position: 'absolute', top: 8, left: 8}}
                    source={
                      selectedArtId.includes(item.artId)
                        ? icons.circleSelected
                        : icons.circle
                    }
                  />
                )}
              </ImgBox>
            )}
          />
        )}
      </TouchableWithoutFeedback>
      {isDDShown && (
        <DropDown
          items={isSelectState ? selectStateDDItems : bookmarkDDItems}
          setIsDDShown={setIsDDShown}
        />
      )}
    </Container>
  );
};

export default BookmarkDetail;

const ImgBox = styled.TouchableOpacity`
  border-radius: 2px;
  margin-left: 8px;
`;

const RemoveBookmarkBtn = styled.TouchableOpacity`
  flex-direction: row;
  width: 62px;
  height: 40px;
  border-radius: 20px;
  border-color: ${colors.inactivate};
  border-width: 0.5px;

  margin-left: -24px;

  align-items: center;
`;

const CancelBtnText = styled(TextMainRg)`
  font-size: 16px;
  margin-left: 12px;
`;
