import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
