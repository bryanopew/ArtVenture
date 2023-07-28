import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import RootStackNav from './src/nav/RootStackNav';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <RootStackNav />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
