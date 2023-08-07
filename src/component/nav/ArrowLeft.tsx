import {styled} from 'styled-components/native';
import {icons} from '../../assets/icons';
import {ViewStyle} from 'react-native';

const ArrowLeft = ({
  navigationFn,
  style,
  arrowColor = 'black',
}: {
  navigationFn: Function;
  style?: ViewStyle;
  arrowColor?: 'white' | 'black';
}) => {
  return (
    <ArrowLeftBox
      style={{...style}}
      onPress={() => {
        navigationFn();
      }}>
      {arrowColor === 'white' ? (
        <ArrowLeftImg source={icons.arrowLeftWhite} />
      ) : (
        <ArrowLeftImg source={icons.arrowLeft} />
      )}
    </ArrowLeftBox>
  );
};

export default ArrowLeft;

const ArrowLeftBox = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
const ArrowLeftImg = styled.Image`
  width: 24px;
  height: 24px;
`;
