import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {currentScrState} from '../recoil/atoms';
import {Container, TextMainBd} from '../style/styledConst';
import HomeListContent from '../component/home/HomeListContent';
import {testArtists} from '../utils/const';

const HomeList = () => {
  // navigation
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  // recoil
  const [currentScr, setCurrentScr] = useRecoilState(currentScrState);

  useEffect(() => {
    isFocused && setCurrentScr(route.name);
  }, [route.name]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextMainBd style={{fontSize: 20, marginLeft: 10}}>
          {route.params?.title}
        </TextMainBd>
      ),
    });
  }, [route?.params?.title]);

  return (
    <Container>
      <ScrollView>
        {testArtists.map(artist => (
          <HomeListContent
            key={artist.id}
            id={artist.id}
            name={artist.name}
            works={artist.works}
            year={artist.year}
          />
        ))}
      </ScrollView>
    </Container>
  );
};

export default HomeList;
