import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import HomeShow from '../screens/Home/HomeShow';
import HomeList from '../screens/Home/HomeList';
import ArrowLeft from '../component/nav/ArrowLeft';

const HomeNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeShow"
        component={HomeShow}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeList"
        component={HomeList}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNav;
