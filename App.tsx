import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import RootStackNav from './src/nav/RootStackNav';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <RecoilRoot>
          <RootStackNav />
        </RecoilRoot>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
