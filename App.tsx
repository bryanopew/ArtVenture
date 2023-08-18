import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import RootStackNav from './src/nav/RootStackNav';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './src/query/store';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <RootStackNav />
          </NavigationContainer>
        </GestureHandlerRootView>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
