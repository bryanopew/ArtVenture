import {styled} from 'styled-components/native';
import {_MPY_} from '../../utils/const';
import {icons} from '../../assets/icons';
import {StyleProp, ViewStyle} from 'react-native';

const ArrowLeft = ({
  navigationFn,
  style,
}: {
  navigationFn: Function;
  style?: ViewStyle;
}) => {
  return (
    <ArrowLeftBox
      style={{...style}}
      onPress={() => {
        navigationFn();
      }}>
      <ArrowLeftImg source={icons.arrowLeft} />
    </ArrowLeftBox>
  );
};

export default ArrowLeft;

const ArrowLeftBox = styled.TouchableOpacity`
  /* margin-left: ${46 * _MPY_}px; */
  justify-content: center;
  align-items: center;
`;
const ArrowLeftImg = styled.Image`
  width: ${48 * _MPY_}px;
  height: ${48 * _MPY_}px;
`;
