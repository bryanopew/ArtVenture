import {useNavigation} from '@react-navigation/native';

export const useGoToSearchScr = () => {
  const {navigate} = useNavigation();
  return () => navigate('Search');
};

export const useGoToHomeScr = () => {
  const {navigate} = useNavigation();
  return () => navigate('Home');
};
export const useGoToArtistScr = () => {
  const {navigate} = useNavigation();
  return (params: {id: string; name?: string}) => navigate('Artist', params);
};

export const useGoToDetailScr = () => {
  const {navigate} = useNavigation();
  return (params: {id: string; title?: string}) => navigate('Detail', params);
};
