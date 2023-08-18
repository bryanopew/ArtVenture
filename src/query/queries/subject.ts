import {useQuery} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import {SUBJECT} from '../keys';

export const useListSubject = (params?: {artistArr: number[]}) => {
  return useQuery({
    queryKey: [SUBJECT],
    queryFn: async (): Promise<string[]> => {
      const snap = (await firestore().collection('Subject').get()).docs.map(
        docSnapShot => docSnapShot.data().subject,
      );
      const data = snap as string[];
      return data;
    },
  });
};
