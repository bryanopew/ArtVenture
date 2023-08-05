import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './BottomTabNav';
import Detail from '../screens/Detail';
import ArrowLeft from '../component/nav/ArrowLeft';
import {useNavigation} from '@react-navigation/native';
import {_MPY_} from '../utils/const';
import {Icon} from '../style/styledConst';
import {icons} from '../assets/icons';
import HomeShow from '../screens/HomeShow';
import HomeList from '../screens/HomeList';
import TopBarLogo from '../component/nav/TopBarLogo';
import SearchBtn from '../component/nav/SearchBtn';
import Search from '../screens/Search';
import {useGoToSearchScr} from '../hooks/customNavHooks';

const Stack = createNativeStackNavigator();

// ****************************
// rootNav에서 header margin : 40 * _MPY_ | 내부에서는 12 * _MPY_
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
              style={{marginLeft: 12 * _MPY_}}
            />
          ),
          headerRight: () => (
            <SearchBtn
              navigationFn={() => goToSearchScr()}
              style={{marginRight: 12 * _MPY_}}
            />
          ),
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
              style={{marginLeft: 12 * _MPY_}}
            />
          ),
          headerRight: () => (
            <SearchBtn
              navigationFn={() => goToSearchScr()}
              style={{marginRight: 12 * _MPY_}}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
          headerTitle: () => null,
          headerTitleAlign: 'left',
          headerLeft: () => (
            <ArrowLeft
              navigationFn={() => {
                goBack();
              }}
              style={{marginLeft: 12 * _MPY_}}
            />
          ),
          headerRight: () => (
            <SearchBtn
              navigationFn={() => goToSearchScr()}
              style={{marginRight: 12 * _MPY_}}
            />
          ),
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
