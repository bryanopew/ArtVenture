import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './BottomTabNav';
import Detail from '../screens/Detail';
import ArrowLeft from '../component/nav/ArrowLeft';
import {useNavigation} from '@react-navigation/native';
import {_MPY_} from '../utils/const';
import {Icon} from '../style/styledConst';
import {icons} from '../assets/icons';

const Stack = createNativeStackNavigator();

const RootStackNav = () => {
  const {goBack} = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerRight: () => <Icon source={icons.more} />,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNav;
