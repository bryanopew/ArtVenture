import FastImage from 'react-native-fast-image';
import {IArt} from '../../query/types/art';
import {Col, Row, RowSpace} from '../../style/styledConst';
import {
  ART_WIDTH_LARGE,
  ART_WIDTH_SMALL,
  SCREEN_WIDTH,
  SIX_ITEM_HEIGHT,
  getFlatListItemLayout,
} from '../../utils/const';
import {styled} from 'styled-components/native';
import {colors} from '../../style/colors';
import {FlatList} from 'react-native-gesture-handler';
import {useGoToDetailScr} from '../../hooks/customNavHooks';

const SixItems = ({item, index}: {item: IArt[]; index: number}) => {
  const goToDetailScr = useGoToDetailScr();
  return (
    // Flatlist 최적화를 위한 height (SCREEN_WIDTH - (22 + 22) - 8 * 2) + 16
    <Col style={{rowGap: 8}}>
      <Row style={{columnGap: 8}}>
        {index % 2 === 0 ? (
          <>
            <Col style={{rowGap: 8}}>
              <ImgBox
                onPress={() => {
                  goToDetailScr({artId: item[0].artId});
                }}>
                {item[0] && (
                  <FastImage
                    source={{uri: item[0].imgLink}}
                    resizeMode="cover"
                    style={{
                      width: ART_WIDTH_SMALL,
                      height: ART_WIDTH_SMALL,
                      borderRadius: 2,
                    }}
                  />
                )}
              </ImgBox>
              <ImgBox
                onPress={() => {
                  goToDetailScr({artId: item[1].artId});
                }}>
                {item[1] && (
                  <FastImage
                    source={{uri: item[1].imgLink}}
                    resizeMode="cover"
                    style={{
                      width: ART_WIDTH_SMALL,
                      height: ART_WIDTH_SMALL,
                      borderRadius: 2,
                    }}
                  />
                )}
              </ImgBox>
            </Col>
            <ImgBox
              onPress={() => {
                goToDetailScr({artId: item[2].artId});
              }}>
              {item[2] && (
                <FastImage
                  source={{uri: item[2].imgLink}}
                  resizeMode="cover"
                  style={{
                    width: ART_WIDTH_LARGE,
                    height: ART_WIDTH_LARGE,
                    borderRadius: 2,
                  }}
                />
              )}
            </ImgBox>
          </>
        ) : (
          <>
            <ImgBox
              onPress={() => {
                goToDetailScr({artId: item[0].artId});
              }}>
              {item[0] && (
                <FastImage
                  source={{uri: item[0].imgLink}}
                  resizeMode="cover"
                  style={{
                    width: ART_WIDTH_LARGE,
                    height: ART_WIDTH_LARGE,
                    borderRadius: 2,
                  }}
                />
              )}
            </ImgBox>
            <Col style={{rowGap: 8}}>
              <ImgBox
                onPress={() => {
                  goToDetailScr({artId: item[1].artId});
                }}>
                {item[1] && (
                  <FastImage
                    source={{uri: item[1].imgLink}}
                    resizeMode="cover"
                    style={{
                      width: ART_WIDTH_SMALL,
                      height: ART_WIDTH_SMALL,
                      borderRadius: 2,
                    }}
                  />
                )}
              </ImgBox>
              <ImgBox
                onPress={() => {
                  goToDetailScr({artId: item[2].artId});
                }}>
                {item[2] && (
                  <FastImage
                    source={{uri: item[2].imgLink}}
                    resizeMode="cover"
                    style={{
                      width: ART_WIDTH_SMALL,
                      height: ART_WIDTH_SMALL,
                      borderRadius: 2,
                    }}
                  />
                )}
              </ImgBox>
            </Col>
          </>
        )}
      </Row>
      <Row style={{columnGap: 8}}>
        <ImgBox
          onPress={() => {
            goToDetailScr({artId: item[3].artId});
          }}>
          {item[3] && (
            <FastImage
              source={{uri: item[3].imgLink}}
              resizeMode="cover"
              style={{
                width: ART_WIDTH_SMALL,
                height: ART_WIDTH_SMALL,
                borderRadius: 2,
              }}
            />
          )}
        </ImgBox>
        <ImgBox
          onPress={() => {
            goToDetailScr({artId: item[4].artId});
          }}>
          {item[4] && (
            <FastImage
              source={{uri: item[4].imgLink}}
              resizeMode="cover"
              style={{
                width: ART_WIDTH_SMALL,
                height: ART_WIDTH_SMALL,
                borderRadius: 2,
              }}
            />
          )}
        </ImgBox>
        <ImgBox
          onPress={() => {
            goToDetailScr({artId: item[5].artId});
          }}>
          {item[5] && (
            <FastImage
              source={{uri: item[5].imgLink}}
              resizeMode="cover"
              style={{
                width: ART_WIDTH_SMALL,
                height: ART_WIDTH_SMALL,
                borderRadius: 2,
              }}
            />
          )}
        </ImgBox>
      </Row>
    </Col>
  );
};

const SixItemsFlatList = ({data}: {data: IArt[][]}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => <SixItems item={item} index={index} />}
      ItemSeparatorComponent={() => <RowSpace height={8} />}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      windowSize={11}
      initialNumToRender={2}
      maxToRenderPerBatch={2}
      getItemLayout={(data, index) =>
        getFlatListItemLayout(data, index, SIX_ITEM_HEIGHT)
      }
    />
  );
};

export default SixItemsFlatList;

const ImgBox = styled.TouchableOpacity``;
const ImgSmall = styled.Image`
  width: ${(SCREEN_WIDTH - (22 + 22) - 8 * 2) / 3}px;
  height: ${(SCREEN_WIDTH - (22 + 22) - 8 * 2) / 3}px;
  background-color: ${colors.inactivate};
  border-radius: 2px;
`;
const ImgLarge = styled.Image`
  width: ${((SCREEN_WIDTH - (22 + 22) - 8 * 2) / 3) * 2 + 8}px;
  height: ${((SCREEN_WIDTH - (22 + 22) - 8 * 2) / 3) * 2 + 8}px;
  background-color: ${colors.inactivate};
  border-radius: 2px;
`;
