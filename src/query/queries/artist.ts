import {useQuery} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import {ARTIST, ARTIST_ID, ARTIST_SUMMARY} from '../keys';
import {IArtist} from '../types/artists';

export const useListArtist = () => {
  return useQuery({
    queryKey: [ARTIST],
    queryFn: async (): Promise<IArtist[]> => {
      const snap = (
        await firestore().collection('Artist').orderBy('artistId', 'asc').get()
      ).docs.map(docSnapShot => docSnapShot.data());
      const data = snap as IArtist[];
      return data;
    },
  });
};

export const useListArtistIdBySubject = (subject: string) => {
  return useQuery({
    queryKey: [ARTIST_ID, subject],
    queryFn: async (): Promise<Partial<IArtist>> => {
      const snap = (
        await firestore()
          .collection('Artist')
          .where('subject', 'array-contains', subject)
          .get()
      ).docs.map(docSnapShot => docSnapShot.data().artistId);
      const data = snap as Partial<IArtist>;
      return data;
    },
    onSuccess: () => {},
  });
};

export const useListArtistSummaryBySubject = (subject: string) => {
  return useQuery({
    queryKey: [ARTIST_SUMMARY, subject],
    queryFn: async (): Promise<IArtist[]> => {
      const snap = (
        await firestore()
          .collection('Artist')
          .where('subject', 'array-contains', subject)
          .get()
      ).docs.map(docSnapShot => {
        const res = docSnapShot.data();
        return {
          artistId: res.artistId,
          artistName: res.artistName,
          year: res.year,
        };
      });
      const data = snap as IArtist[];
      return data;
    },
    onSuccess: () => {},
  });
};

export const useGetArtist = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [ARTIST, id],
    queryFn: async (): Promise<IArtist | undefined> => {
      const snap = (
        await firestore().collection('Artist').where('artistId', '==', id).get()
      ).docs.map(docSnapShot => docSnapShot.data());
      const data =
        snap.length > 0 ? (snap[0] as unknown as IArtist) : undefined;
      return data;
    },
    onSuccess: () => {},
  });
};
