import {ScrollView} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Container, RowSpace, TextMainBd} from '../../style/styledConst';
import HomeListContent from '../../component/homeList/HomeListContent';
import {IArt} from '../../query/types/art';
import {useListArtistSummaryBySubject} from '../../query/queries/artist';
import {useListArt} from '../../query/queries/art';
import {IArtist} from '../../query/types/artists';
import {FlatList} from 'react-native-gesture-handler';
import {HOME_LIST_ITEM_HEIGHT, getFlatListItemLayout} from '../../utils/const';

const HomeList = () => {
  // navigation
  const navigation = useNavigation();
  const {subject} = useRoute().params as {
    subject: string;
  };

  // react-query
  const {data: artistBySubject} = useListArtistSummaryBySubject(subject);
  const {data: artBySubject} = useListArt({
    enabled: !!artistBySubject,
    artistIdArr: artistBySubject?.map(artist => artist.artistId),
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextMainBd style={{fontSize: 20, marginLeft: 10}}>
          {subject}
        </TextMainBd>
      ),
    });
  }, [subject]);

  const artSortedByArtist = useMemo(() => {
    if (!artBySubject || !artistBySubject) return [];

    const artSortedByArtist: Array<{artist: IArtist; arts: IArt[]}> =
      artistBySubject.map(artist => {
        return {
          artist,
          arts: [],
        };
      });

    // artBySubject.forEach(art => {
    //   const idx = artSortedByArtist.findIndex(
    //     sorted => sorted.artist.artistId === art.artistId,
    //   );
    //   artSortedByArtist[idx].arts.push(art);
    // });

    for (let i = 0; i < artBySubject.length; i++) {
      const idx = artSortedByArtist.findIndex(
        sorted => sorted.artist.artistId === artBySubject[i].artistId,
      );
      if (artSortedByArtist[idx].arts.length >= 4) continue;
      artSortedByArtist[idx].arts.push(artBySubject[i]);
    }

    return artSortedByArtist;
  }, [artistBySubject, artBySubject]);
  return (
    <Container>
      <FlatList
        data={artSortedByArtist}
        renderItem={({item}) => (
          <HomeListContent artist={item.artist} arts={item.arts} />
        )}
        keyExtractor={item => item.artist.artistId.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <RowSpace style={{height: 40}} />}
        windowSize={11}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        getItemLayout={(data, index) =>
          getFlatListItemLayout(data, index, HOME_LIST_ITEM_HEIGHT)
        }
        contentContainerStyle={{marginTop: 20}}
      />
    </Container>
  );
};

export default HomeList;
