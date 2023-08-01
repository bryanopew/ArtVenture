import {styled} from 'styled-components/native';
import {_MPY_} from '../../utils/const';
import {Pressable} from 'react-native';
import {icons} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';

const TopBarLogo = () => {
  const {navigate} = useNavigation();
  return (
    <Pressable onPress={() => navigate('Home')}>
      <LogoImg source={icons.logo} />
    </Pressable>
  );
};

export default TopBarLogo;

const LogoImg = styled.Image`
  width: ${50 * _MPY_}px;
  height: ${50 * _MPY_}px;
`;
