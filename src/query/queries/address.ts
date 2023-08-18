import {useQuery} from '@tanstack/react-query';
import {ADDRESS} from '../keys';
import {G_API_K} from '../../utils/const';

export const useGetGeometry = (address: string) => {
  return useQuery({
    enabled: !!address,
    queryKey: [ADDRESS, address],
    queryFn: async (): Promise<IGoogleGeoCode> => {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${G_API_K}`,
      );
      const data = await res.json();
      return data;
    },
  });
};
