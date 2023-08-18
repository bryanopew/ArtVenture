import {useNavigation} from '@react-navigation/native';
import {IArt} from '../query/types/art';

export const useGoToSearchScr = () => {
  const {navigate} = useNavigation();
  return (params?: {filteredArts: IArt[]}) => navigate('Search', params);
};

export const useGoToHomeScr = () => {
  const {navigate} = useNavigation();
  return () => navigate('Home');
};
export const useGoToArtistScr = () => {
  const {navigate} = useNavigation();
  return (params: {artistId: number}) => navigate('Artist', params);
};

export const useGoToDetailScr = () => {
  const {navigate} = useNavigation();
  return (params: {artId: number}) => navigate('Detail', params);
};

export const useGoToCategoryShowScr = () => {
  const {navigate} = useNavigation();
  return (params?: {[key: string]: string}) => navigate('CategoryShow', params);
};
