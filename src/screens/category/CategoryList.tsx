import {styled} from 'styled-components/native';
import {
  Col,
  Container,
  Icon,
  Row,
  RowSpace,
  TextMainBd,
  TextMainMd,
} from '../../style/styledConst';
import {useNavigation} from '@react-navigation/native';
import {useListArt} from '../../query/queries/art';
import {useMemo} from 'react';
import {reGroupArtsByArtist} from '../../utils/reGroupArts';
import {icons} from '../../assets/icons';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useGoToArtistScr, useGoToDetailScr} from '../../hooks/customNavHooks';
import {
  ART_WIDTH_LARGE,
  ART_WIDTH_SMALL,
  CATEGORY_LIST_ITEM_HEIGHT,
  getFlatListItemLayout,
} from '../../utils/const';
import {colors} from '../../style/colors';
import {IArt} from '../../query/types/art';

const CategoryList = () => {
  // navigation
  const goToArtistScr = useGoToArtistScr();
  const goToDetailScr = useGoToDetailScr();

  // react-query
  const {data: arts} = useListArt({});

  const regroupedArtsByArtist = useMemo(() => {
    return reGroupArtsByArtist(arts);
  }, [arts]);

  console.log(regroupedArtsByArtist?.length);

  // etc
  const renderCategoryListItem = ({item}: {item: IArt[]}) => {
    return (
      <Col>
        <Row style={{width: '100%', justifyContent: 'space-between'}}>
          <Row>
            <ArtistImg source={{uri: item[0]?.imgLink}} />
            <ArtistText>{item[0]?.artistName}</ArtistText>
          </Row>
          <TouchableOpacity
            onPress={() => goToArtistScr({artistId: item[0].artistId})}>
            <Icon source={icons.rightGrey} />
          </TouchableOpacity>
        </Row>
        <ArtBox>
          <ArtLargeBtn onPress={() => goToDetailScr({artId: item[0].artId})}>
            <ArtLarge source={{uri: item[0].imgLink}} />
          </ArtLargeBtn>
          <Col style={{rowGap: 8}}>
            <ArtSmallBtn
              onPress={() => item[1] && goToDetailScr({artId: item[1].artId})}>
              {!!item[1] && <ArtSmall source={{uri: item[1].imgLink}} />}
            </ArtSmallBtn>
            <ArtSmallBtn
              onPress={() =>
                item[2] && goToArtistScr({artistId: item[0].artistId})
              }>
              {!!item[2] && <ArtSmall source={{uri: item[2].imgLink}} />}
              <OpacityView>
                <MoreNumber>+{item.length - 3}</MoreNumber>
              </OpacityView>
            </ArtSmallBtn>
          </Col>
        </ArtBox>
      </Col>
    );
  };

  return (
    <Container style={{paddingHorizontal: 22}}>
      <FlatList
        data={regroupedArtsByArtist}
        renderItem={renderCategoryListItem}
        ItemSeparatorComponent={() => <RowSpace height={28} />}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        windowSize={7}
        initialNumToRender={3}
        maxToRenderPerBatch={2}
        getItemLayout={(data, index) =>
          getFlatListItemLayout(data, index, CATEGORY_LIST_ITEM_HEIGHT)
        }
        contentContainerStyle={{marginTop: 20, paddingBottom: 64}}
      />
    </Container>
  );
};

export default CategoryList;

const ArtistImg = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

const ArtistText = styled(TextMainBd)`
  font-size: 14px;
  margin-left: 4px;
`;

const ArtBox = styled.View`
  flex-direction: row;
  height: ${ART_WIDTH_LARGE}px;

  margin-top: 12px;

  column-gap: 8px;
`;

const ArtLargeBtn = styled.TouchableOpacity`
  width: ${ART_WIDTH_LARGE}px;
  height: ${ART_WIDTH_LARGE}px;
  background-color: ${colors.inactivate};
`;

const ArtSmallBtn = styled.TouchableOpacity`
  width: ${ART_WIDTH_SMALL}px;
  height: ${ART_WIDTH_SMALL}px;
  background-color: ${colors.blackOpacity50};
`;

const ArtLarge = styled.Image`
  width: ${ART_WIDTH_LARGE}px;
  height: ${ART_WIDTH_LARGE}px;
  border-radius: 4px;
`;
const ArtSmall = styled.Image`
  width: ${ART_WIDTH_SMALL}px;
  height: ${ART_WIDTH_SMALL}px;
  border-radius: 4px;
`;

const OpacityView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.blackOpacity50};
  justify-content: center;
  align-items: center;
`;

const MoreNumber = styled(TextMainMd)`
  font-size: 12px;
  color: ${colors.white};
`;
