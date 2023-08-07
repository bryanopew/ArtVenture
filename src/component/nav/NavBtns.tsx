import {Pressable, ViewStyle} from 'react-native';
import {Icon} from '../../style/styledConst';
import {icons} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {useGoToSearchScr} from '../../hooks/customNavHooks';

export const SearchBtn = ({style}: {style?: ViewStyle}) => {
  // navigation
  const goToSearchScr = useGoToSearchScr();
  return (
    <Pressable style={{...style}} onPress={() => goToSearchScr()}>
      <Icon source={icons.search} size={24} />
    </Pressable>
  );
};

export const FilterBtn = ({style}: {style?: ViewStyle}) => {
  // navigation
  const {navigate} = useNavigation();
  return (
    <Pressable style={{...style}} onPress={() => navigate('Filter')}>
      <Icon source={icons.filter} size={24} />
    </Pressable>
  );
};
