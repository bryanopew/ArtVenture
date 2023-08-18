import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useQuery} from '@tanstack/react-query';
import {ART} from '../keys';
import {IArt} from '../types/art';

export const useGetArt = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [ART, id],
    queryFn: async (): Promise<IArt | undefined> => {
      const snap = (
        await firestore().collection('Art').where('artId', '==', id).get()
      ).docs.map(docSnapShot => docSnapShot.data());
      const data = snap.length > 0 ? (snap[0] as unknown as IArt) : undefined;
      return data;
    },
  });
};

export const useListArt = ({
  artistId,
  artistIdArr,
  enabled = true,
}: {
  artistId?: number;
  artistIdArr?: number[];
  enabled?: boolean;
}) => {
  return useQuery({
    enabled,
    queryKey: artistId
      ? [ART, artistId]
      : artistIdArr
      ? [ART, artistIdArr]
      : [ART],
    queryFn: async (): Promise<IArt[]> => {
      // 해당 작가 아이디로 작품 가져오기
      if (artistId) {
        const snap = (
          await firestore()
            .collection('Art')
            .where('artistId', '==', artistId)
            .orderBy('artId', 'asc')
            .get()
        ).docs.map(docSnapShot => docSnapShot.data());
        const data = snap as IArt[];
        return data;
      }

      // 여러 작가 아이디로 작품 가져오기
      if (artistIdArr) {
        const snap = (
          await firestore()
            .collection('Art')
            .where('artistId', 'in', artistIdArr)
            .orderBy('artId', 'asc')
            .get()
        ).docs.map(docSnapShot => docSnapShot.data());
        const data = snap as IArt[];
        return data;
      }

      // 작품 전체 가져오기
      const snap = (
        await firestore().collection('Art').orderBy('artId', 'asc').get()
      ).docs.map(docSnapShot => docSnapShot.data());
      const data = snap as IArt[];
      return data;
    },
  });
};

export const useListArtBySubject = (subject: string) => {
  return useQuery({
    enabled: !!subject,
    queryKey: [ART, subject],
    queryFn: async () => {
      const artistSnap = (
        await firestore()
          .collection('Artist')
          .where('subject', 'array-contains', subject)
          .orderBy('artistId', 'asc')
          .get()
      ).docs.map(docSnapShot => docSnapShot.data().artistId);

      const artSnap = (
        await firestore()
          .collection('Art')
          .where('artistId', 'in', artistSnap)
          .orderBy('artId', 'asc')
          .get()
      ).docs.map(docSnapShot => docSnapShot.data());

      const data = artSnap as IArt[];
      return data;
    },
  });
};
