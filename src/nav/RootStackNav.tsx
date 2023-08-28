import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './BottomTabNav';
import Detail from '../screens/common/Detail';
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
import HomeShow from '../screens/home/HomeShow';
import HomeList from '../screens/home/HomeList';
import TopBarLogo from '../component/nav/TopBarLogo';
import {FilterBtn, SearchBtn} from '../component/nav/NavBtns';
import Search from '../screens/common/Search';
import {useGoToSearchScr} from '../hooks/customNavHooks';
import Filter from '../screens/common/Filter';
import Artist from '../screens/common/Artist';
import {styled} from 'styled-components/native';
import HeaderRight from '../component/nav/HeaderRight';
import {useResetRecoilState} from 'recoil';
import {filterState} from '../recoil/states';
import CategoryList from '../screens/category/CategoryList';
import CategoryShow from '../screens/category/CategoryShow';
import BookmarkDetail from '../screens/bookmark/BookmarkDetail';
import Account from '../screens/mypage/Account';
import Notice from '../screens/mypage/Notice';
import Consult from '../screens/mypage/Consult';
import Question from '../screens/mypage/Question';

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
      {/* BottomTab: Home | Category | Bookmark | Korean | Mypage */}
      <Stack.Screen name="BottomTab" component={BottomTabNav} />

      {/* Home */}
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

      {/* Search and Filter */}
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

      {/* Artist */}
      <Stack.Screen
        name="Artist"
        component={Artist}
        options={
          {
            // headerRight: () => <Icon source={icons.more} />,
          }
        }
      />
      <Stack.Screen name="Detail" component={Detail} />

      {/* Category */}
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

      {/* Bookmark */}
      <Stack.Screen
        name="BookmarkDetail"
        component={BookmarkDetail}
        options={{
          headerLeft: () => <ArrowLeft style={{marginLeft: 6}} />,
          headerRight: () => <SearchBtn style={{marginRight: 6}} />,
        }}
      />

      {/* Mypage */}
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
          headerTitle: () => <NavHeader>내 정보</NavHeader>,
          headerTitleAlign: 'left',
          headerLeft: () => <ArrowLeft style={{marginLeft: 6}} />,
        }}
      />
      <Stack.Screen
        name="Notice"
        component={Notice}
        options={{
          headerShown: true,
          headerTitle: () => <NavHeader>공지사항</NavHeader>,
          headerTitleAlign: 'left',
          headerLeft: () => <ArrowLeft style={{marginLeft: 6}} />,
        }}
      />
      <Stack.Screen
        name="Consult"
        component={Consult}
        options={{
          headerShown: true,
          headerTitle: () => <NavHeader>채팅상담</NavHeader>,
          headerTitleAlign: 'left',
          headerLeft: () => <ArrowLeft style={{marginLeft: 6}} />,
        }}
      />
      <Stack.Screen
        name="Question"
        component={Question}
        options={{
          headerShown: true,
          headerTitle: () => <NavHeader>자주하는 질문</NavHeader>,
          headerTitleAlign: 'left',
          headerLeft: () => <ArrowLeft style={{marginLeft: 6}} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNav;
