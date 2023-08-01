import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {Container} from '../style/styledConst';

const Detail = () => {
  // navigation
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  console.log(route);

  useEffect(() => {
    isFocused && navigation.setOptions({title: route?.params?.name});
  }, [isFocused]);

  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
};

export default Detail;
