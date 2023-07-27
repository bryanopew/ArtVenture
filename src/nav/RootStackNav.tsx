import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './BottomTabNav';

const Stack = createNativeStackNavigator();

const RootStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNav}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStackNav;
