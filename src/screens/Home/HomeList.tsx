import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useSetCurrentScr} from '../../hooks/screens';
import {useRecoilState} from 'recoil';
import {currentScrState} from '../../recoil/atoms';

const HomeList = () => {
  // navigation
  const route = useRoute();
  const isFocused = useIsFocused();

  // recoil
  const [currentScr, setCurrentScr] = useRecoilState(currentScrState);

  useEffect(() => {
    isFocused && setCurrentScr(route.name);
  }, [route.name]);

  return (
    <View>
      <Text>HomeList</Text>
    </View>
  );
};

export default HomeList;
