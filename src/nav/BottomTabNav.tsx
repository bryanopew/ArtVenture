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
import {useNavigation} from '@react-navigation/native';
import {currentScrState} from '../recoil/atoms';
import Home from '../screens/Home';
import TopBarLogo from '../component/nav/TopBarLogo';
import SearchBtn from '../component/nav/SearchBtn';
import {useGoToSearchScr} from '../hooks/customNavHooks';

const BottomTab = createBottomTabNavigator();

const BottomTabNav = () => {
  // navigation
  const navigation = useNavigation();
  const goToSearchScr = useGoToSearchScr();

  // recoil
  const [currentScr, setCurrentScr] = useRecoilState(currentScrState);
  console.log('BottomTabNav currentScr: ', currentScr);

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: () => <TopBarLogo />,
        headerTitleAlign: 'center',
        headerRight: () => (
          <SearchBtn
            navigationFn={() => goToSearchScr()}
            style={{marginRight: 42 * _MPY_}}
          />
        ),
        headerShadowVisible: false,
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
