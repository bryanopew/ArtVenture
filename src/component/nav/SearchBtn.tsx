import {Pressable, ViewStyle} from 'react-native';
import {Icon} from '../../style/styledConst';
import {icons} from '../../assets/icons';
import {_MPY_} from '../../utils/const';

const SearchBtn = ({
  navigationFn,
  style,
}: {
  navigationFn: Function;
  style?: ViewStyle;
}) => {
  return (
    <Pressable style={{...style}} onPress={() => navigationFn()}>
      <Icon
        source={icons.search}
        style={{marginRight: 12 * _MPY_}}
        size={48 * _MPY_}
      />
    </Pressable>
  );
};

export default SearchBtn;
