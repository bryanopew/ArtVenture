import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Category from '../screens/Category';
import Bookmark from '../screens/Bookmark';
import Korean from '../screens/Korean';
import User from '../screens/User';
import {styled} from 'styled-components/native';
import {icons} from '../assets/icons';
import {_MPY_} from '../utils/const';
import {colors} from '../style/colors';
import {Pressable} from 'react-native';

const BottomTab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerTitle: () => (
          <Pressable onPress={() => console.log('headerTitle pressed')}>
            <LogoImg source={icons.logo} />
          </Pressable>
        ),
        headerTitleAlign: 'center',
        headerRight: () => (
          <Pressable onPress={() => console.log('headerRight pressed')}>
            <IconImg source={icons.search} style={{marginRight: 48 * _MPY_}} />
          </Pressable>
        ),
        headerStyle: {height: 110 * _MPY_},
        tabBarShowLabel: false,
        tabBarStyle: {height: 108 * _MPY_},
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <IconBox>
              <IconImg source={icons.home} />
              {focused && <IconLine />}
            </IconBox>
          ),
        }}
      />
      <BottomTab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarIcon: ({focused}) => (
            <IconBox>
              <IconImg source={icons.category} />
              {focused && <IconLine />}
            </IconBox>
          ),
        }}
      />
      <BottomTab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarIcon: ({focused}) => (
            <IconBox>
              <IconImg source={icons.bookmark} />
              {focused && <IconLine />}
            </IconBox>
          ),
        }}
      />
      <BottomTab.Screen
        name="Korean"
        component={Korean}
        options={{
          tabBarIcon: ({focused}) => (
            <IconBox>
              <IconImg source={icons.korean} />
              {focused && <IconLine />}
            </IconBox>
          ),
        }}
      />
      <BottomTab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({focused}) => (
            <IconBox>
              <IconImg source={icons.user} />
              {focused && <IconLine />}
            </IconBox>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNav;

const IconBox = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const IconImg = styled.Image`
  width: ${48 * _MPY_}px;
  height: ${48 * _MPY_}px;
`;

const IconLine = styled.View`
  width: ${60 * _MPY_}px;
  height: ${4 * _MPY_}px;
  position: absolute;
  bottom: ${18 * _MPY_}px;
  background-color: ${colors.black};
`;

const LogoImg = styled.Image`
  width: ${50 * _MPY_}px;
  height: ${50 * _MPY_}px;
`;
