import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './BottomTabNav';
import Detail from '../screens/Detail';
import ArrowLeft from '../component/nav/ArrowLeft';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '../style/styledConst';
import {icons} from '../assets/icons';
import HomeShow from '../screens/HomeShow';
import HomeList from '../screens/HomeList';
import TopBarLogo from '../component/nav/TopBarLogo';
import {FilterBtn, SearchBtn} from '../component/nav/NavBtns';
import Search from '../screens/Search';
import {useGoToSearchScr} from '../hooks/customNavHooks';
import Filter from '../screens/Filter';
import Artist from '../screens/Artist';

const Stack = createNativeStackNavigator();

// ****************************
// rootNav에서 header margin : 20 | 내부에서는 6
// ****************************

const RootStackNav = () => {
  // navigation
  const {goBack} = useNavigation();
  const goToSearchScr = useGoToSearchScr();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerBackVisible: false,
      }}>
      <Stack.Screen name="BottomTab" component={BottomTabNav} />
      <Stack.Screen
        name="HomeShow"
        component={HomeShow}
        options={{
          headerShown: true,
          headerTitle: () => <TopBarLogo />,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <ArrowLeft
              navigationFn={() => {
                goBack();
              }}
              style={{marginLeft: 6}}
            />
          ),
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
          headerLeft: () => (
            <ArrowLeft
              navigationFn={() => {
                goBack();
              }}
              style={{marginLeft: 6}}
            />
          ),
          headerRight: () => <SearchBtn style={{marginRight: 6}} />,
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          headerLeft: () => (
            <ArrowLeft
              navigationFn={() => {
                goBack();
              }}
              style={{marginLeft: 6}}
            />
          ),
          headerRight: () => <FilterBtn style={{marginRight: 6}} />,
        }}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{
          headerRight: () => <Icon source={icons.more} />,
          headerTitleAlign: 'left',
          headerLeft: () => (
            <ArrowLeft
              navigationFn={() => {
                goBack();
              }}
              style={{marginLeft: 6}}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Artist"
        component={Artist}
        options={{
          headerRight: () => <Icon source={icons.more} />,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerRight: () => <Icon source={icons.more} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNav;
