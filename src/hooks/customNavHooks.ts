import {useNavigation} from '@react-navigation/native';

export const useGoToSearchScr = () => {
  const {navigate} = useNavigation();
  return () => navigate('Search');
};

export const useGoToHomeScr = () => {
  const {navigate} = useNavigation();
  return () => navigate('Home');
};

export const useGoToDetailScr = (params: {title: string; id: string}) => {
  const {navigate} = useNavigation();
  return () => navigate('Detail', params);
};
