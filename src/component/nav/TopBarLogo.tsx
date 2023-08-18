import {styled} from 'styled-components/native';
import {Pressable} from 'react-native';
import {icons} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {useListArt, useListArtBySubject} from '../../query/queries/art';
import {useListSubject} from '../../query/queries/subject';

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
  width: 25px;
  height: 25px;
`;
