// RN
import {Pressable, View} from 'react-native';

// 3rd
import {styled} from 'styled-components/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRecoilState} from 'recoil';

// util, const, style
import {icons} from '../assets/icons';
import {colors} from '../style/colors';

// components
import Category from '../screens/category/Category';
import Bookmark from '../screens/bookmark/Bookmark';
import Korean from '../screens/korean/Korean';
import {useNavigation} from '@react-navigation/native';
import {currentScrState} from '../recoil/states';
import Home from '../screens/home/Home';
import TopBarLogo from '../component/nav/TopBarLogo';
import {SearchBtn} from '../component/nav/NavBtns';
import {useGoToSearchScr} from '../hooks/customNavHooks';
import {NavHeader, TextMainBd} from '../style/styledConst';
import ArrowLeft from '../component/nav/ArrowLeft';
import Mypage from '../screens/mypage/Mypage';

const BottomTab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: () => <ArrowLeft style={{marginLeft: 22}} />,
        headerTitle: () => <TopBarLogo />,
        headerTitleAlign: 'center',
        headerRight: () => <SearchBtn style={{marginRight: 22}} />,
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 54,
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
          headerLeft: () => null,
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
          headerLeft: () => <ArrowLeft style={{marginLeft: 22}} />,
          headerTitle: () => <HeaderTitleText>카테고리</HeaderTitleText>,
          headerTitleAlign: 'left',
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
          headerShown: false,
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
          headerLeft: () => <ArrowLeft style={{marginLeft: 22}} />,
          tabBarIcon: ({focused}) => (
            <IconBox>
              <IconImg source={icons.korean} />
              {focused && <IconLine />}
            </IconBox>
          ),
          headerTitle: () => null,
          headerRight: () => null,
        }}
      />
      <BottomTab.Screen
        name="Mypage"
        component={Mypage}
        options={{
          headerLeft: () => <ArrowLeft style={{marginLeft: 22}} />,
          tabBarIcon: ({focused}) => (
            <IconBox>
              <IconImg source={icons.user} />
              {focused && <IconLine />}
            </IconBox>
          ),
          headerTitle: () => (
            <NavHeader style={{marginLeft: 0}}>마이페이지</NavHeader>
          ),
          headerTitleAlign: 'left',
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
  width: 24px;
  height: 24px;
`;

const IconLine = styled.View`
  width: 30px;
  height: 2px;
  position: absolute;
  bottom: 9px;
  background-color: ${colors.black};
`;

const HeaderTitleText = styled(TextMainBd)`
  font-size: 20px;
`;
