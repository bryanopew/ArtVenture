import {styled} from 'styled-components/native';
import {_MPY_} from '../../utils/const';
import {icons} from '../../assets/icons';

const ArrowLeft = ({navigationFn}: {navigationFn: Function}) => {
  return (
    <ArrowLeftBox
      onPress={() => {
        navigationFn();
      }}>
      <ArrowLeftImg source={icons.arrowLeft} />
    </ArrowLeftBox>
  );
};

export default ArrowLeft;

const ArrowLeftBox = styled.TouchableOpacity`
  margin-left: ${46 * _MPY_}px;
`;
const ArrowLeftImg = styled.Image`
  width: ${48 * _MPY_}px;
  height: ${48 * _MPY_}px;
`;
