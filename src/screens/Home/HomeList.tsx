import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useSetCurrentScr} from '../../hooks/screens';
import {useRecoilState} from 'recoil';
import {currentScrState} from '../../recoil/atoms';
import {
  Container,
  ContainerWithTopBar,
  Icon,
  TextMainBd,
} from '../../style/styledConst';
import {_MPY_} from '../../utils/const';
import TopBar from '../../component/common/TopBar';
import ArrowLeft from '../../component/nav/ArrowLeft';
import {icons} from '../../assets/icons';
import HomeListContent from '../../component/home/HomeListContent';

const testArtists = [
  {
    id: '1',
    name: '빈센트 반 고흐',
    year: '1853. 3. 30 - 1890. 7. 29.',
    works: ['1', '2', '3', '4', '5'],
  },
  {
    id: '2',
    name: '레오나르도 다빈치',
    year: '1452. 4. 15. - 1519. 5. 2.',
    works: ['1', '2', '3', '4', '5'],
  },
  {
    id: '3',
    name: '라파엘로 산치오',
    year: '1483. ?. - 1520. 4. 6',
    works: ['1', '2', '3', '4', '5'],
  },
];

const HomeList = () => {
  // navigation
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  console.log(route);

  // recoil
  const [currentScr, setCurrentScr] = useRecoilState(currentScrState);

  useEffect(() => {
    isFocused && setCurrentScr(route.name);
  }, [route.name]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextMainBd style={{fontSize: 40 * _MPY_}}>
          {route.params?.title}
        </TextMainBd>
      ),
    });
  }, [route?.params?.title]);

  return (
    <ContainerWithTopBar>
      <TopBar
        headerLeft={() => (
          <ArrowLeft navigationFn={() => navigation.goBack()} />
        )}
        header={() =>
          route.params?.title && (
            <TextMainBd style={{fontSize: 40 * _MPY_, marginLeft: 8}}>
              {route.params?.title}
            </TextMainBd>
          )
        }
        headerStyle={{alignItems: 'flex-start'}}
        headerRight={() => (
          <Pressable
            onPress={() => console.log('headerRight pressed')}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              source={icons.search}
              style={{marginRight: 12 * _MPY_}}
              size={48 * _MPY_}
            />
          </Pressable>
        )}
      />
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
    </ContainerWithTopBar>
  );
};

export default HomeList;
