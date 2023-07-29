// RN
import {Pressable, View} from 'react-native';

// 3rd
import {styled} from 'styled-components/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRecoilState} from 'recoil';

// util, const, style
import {icons} from '../assets/icons';
import {_MPY_} from '../utils/const';
import {colors} from '../style/colors';

// components
import Category from '../screens/Category';
import Bookmark from '../screens/Bookmark';
import Korean from '../screens/Korean';
import User from '../screens/User';
import HomeNav from './HomeNav';
import ArrowLeft from '../component/nav/ArrowLeft';
import {useNavigation} from '@react-navigation/native';
import {currentScrState} from '../recoil/atoms';

const BottomTab = createBottomTabNavigator();

const BottomTabNav = () => {
  const navigation = useNavigation();

  // recoil
  const [currentScr, setCurrentScr] = useRecoilState(currentScrState);
  console.log('BottomTabNav currentScr: ', currentScr);

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
        tabBarStyle: {
          height: 108 * _MPY_,
          borderTopWidth: 0,
          elevation: 30,
          shadowColor: colors.black,
          shadowRadius: 16,
          shadowOpacity: 0.4,
          shadowOffset: {
            width: 0,
            height: -10,
          },
        },
        headerShadowVisible: false,
      }}>
      <BottomTab.Screen
        name="HomeNav"
        component={HomeNav}
        options={{
          tabBarIcon: ({focused}) => (
            <IconBox>
              <IconImg source={icons.home} />
              {focused && <IconLine />}
            </IconBox>
          ),
          headerLeft: () =>
            ['HomeShow', 'HomeList'].includes(currentScr) && (
              <ArrowLeft
                navigationFn={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeNav', params: {screen: 'Home'}}],
                  });
                }}
              />
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
