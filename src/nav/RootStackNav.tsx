import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './BottomTabNav';
import Detail from '../screens/Detail';
import ArrowLeft from '../component/nav/ArrowLeft';
import {useNavigation} from '@react-navigation/native';
import {
  Icon,
  NavHeader,
  TextMainBd,
  TextMainMd,
  TextMainRg,
} from '../style/styledConst';
import {icons} from '../assets/icons';
import HomeShow from '../screens/HomeShow';
import HomeList from '../screens/HomeList';
import TopBarLogo from '../component/nav/TopBarLogo';
import {FilterBtn, SearchBtn} from '../component/nav/NavBtns';
import Search from '../screens/Search';
import {useGoToSearchScr} from '../hooks/customNavHooks';
import Filter from '../screens/Filter';
import Artist from '../screens/Artist';
import {styled} from 'styled-components/native';
import HeaderRight from '../component/nav/HeaderRight';
import {useResetRecoilState} from 'recoil';
import {filterState} from '../recoil/states';
import CategoryList from '../screens/CategoryList';
import CategoryShow from '../screens/CategoryShow';

const Stack = createNativeStackNavigator();

// ****************************
// rootNav에서 header margin : 20 | 내부에서는 6
// ****************************

const RootStackNav = () => {
  // navigation
  const {goBack} = useNavigation();

  // 필터재설정
  const resetFilter = useResetRecoilState(filterState);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerBackVisible: false,
      }}>
      {/* BottomTab: Home | Category | Bookmark | Korean | User */}
      <Stack.Screen name="BottomTab" component={BottomTabNav} />
      <Stack.Screen
        name="HomeShow"
        component={HomeShow}
        options={{
          headerShown: true,
          headerTitle: () => <TopBarLogo />,
          headerTitleAlign: 'center',
          headerLeft: () => <ArrowLeft style={{marginLeft: 6}} />,
          headerRight: () => <SearchBtn style={{marginRight: 6}} />,
        }}
      />
      <Stack.Screen
        name="HomeList"
        component={HomeList}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTitleAlign: 'left',
          headerLeft: () => <ArrowLeft style={{marginLeft: 6}} />,
          headerRight: () => <SearchBtn style={{marginRight: 6}} />,
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          headerLeft: () => <ArrowLeft style={{marginLeft: 6}} />,
          headerRight: () => <FilterBtn style={{marginRight: 6}} />,
        }}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{
          headerShown: true,
          headerTitle: () => <NavHeader>필터</NavHeader>,
          headerRight: () => (
            <HeaderRight
              fn={resetFilter}
              text="재설정"
              style={{marginRight: 6}}
            />
          ),
          headerTitleAlign: 'left',
          headerLeft: () => <ArrowLeft style={{marginLeft: 6}} />,
        }}
      />

      <Stack.Screen
        name="Artist"
        component={Artist}
        options={
          {
            // headerRight: () => <Icon source={icons.more} />,
          }
        }
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: true,
          headerRight: () => (
            <Icon source={icons.more} style={{marginRight: 6}} />
          ),
          headerLeft: () => <ArrowLeft style={{marginLeft: 6}} />,
        }}
      />
      <Stack.Screen
        name="CategoryList"
        component={CategoryList}
        options={{
          headerShown: true,
          headerTitle: () => <NavHeader>#작가별 모음</NavHeader>,
          headerTitleAlign: 'left',
          headerLeft: () => <ArrowLeft style={{marginLeft: 6}} />,
          headerRight: () => <SearchBtn style={{marginRight: 6}} />,
        }}
      />
      <Stack.Screen
        name="CategoryShow"
        component={CategoryShow}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTitleAlign: 'left',
          headerLeft: () => <ArrowLeft style={{marginLeft: 6}} />,
          headerRight: () => <SearchBtn style={{marginRight: 6}} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNav;
