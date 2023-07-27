import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import {View, Text} from 'react-native';
import Category from '../screens/Category';

const BottomTab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Category" component={Category} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNav;
