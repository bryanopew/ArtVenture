import {styled} from 'styled-components/native';
import {icons} from '../../assets/icons';
import {ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ArrowLeft = ({
  style,
  arrowColor = 'black',
  fnOnPress = undefined,
}: {
  style?: ViewStyle;
  arrowColor?: 'white' | 'black';
  fnOnPress?: () => void;
}) => {
  // navigation
  const {goBack} = useNavigation();
  return (
    <ArrowLeftBox
      style={{...style}}
      onPress={() => {
        !!fnOnPress && fnOnPress();
        goBack();
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
