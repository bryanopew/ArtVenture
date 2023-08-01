import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import HomeShow from '../screens/Home/HomeShow';
import HomeList from '../screens/Home/HomeList';
import ArrowLeft from '../component/nav/ArrowLeft';
import {_MPY_} from '../utils/const';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import {icons} from '../assets/icons';
import {styled} from 'styled-components/native';
import {Icon} from '../style/styledConst';
import {useRecoilState} from 'recoil';
import {currentScrState} from '../recoil/atoms';

// 뒤로가기 버튼
const screensWithHeaderLeft = ['HomeShow', 'HomeList'];

const HomeNav = () => {
  // navigation
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // headerShadowVisible: false,
        // headerTitleAlign: 'center',
        // headerTitle: () => (
        //   <Pressable onPress={() => console.log('headerTitle pressed')}>
        //     <LogoImg source={icons.logo} />
        //   </Pressable>
        // ),
        // headerRight: () => (
        //   <Pressable onPress={() => console.log('headerRight pressed')}>
        //     <Icon
        //       source={icons.search}
        //       style={{marginRight: 12 * _MPY_}}
        //       size={48 * _MPY_}
        //     />
        //   </Pressable>
        // ),
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomeShow" component={HomeShow} />
      <Stack.Screen
        name="HomeList"
        component={HomeList}
        options={{headerTitleAlign: 'left'}}
      />
    </Stack.Navigator>
  );
};

export default HomeNav;

const LogoImg = styled.Image`
  width: ${50 * _MPY_}px;
  height: ${50 * _MPY_}px;
`;
