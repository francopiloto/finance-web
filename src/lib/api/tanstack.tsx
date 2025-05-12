import { PropsWithChildren, useEffect, useRef } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { subscribe, unsubscribe } from '@/features/auth/lib/tokenStorage';

export function ReactQueryProvider({ children }: PropsWithChildren) {
  const queryClientRef = useRef(new QueryClient());

  useEffect(() => {
    const handler = ({ accessToken }: { accessToken: string | null }) =>
      accessToken ? null : queryClientRef.current.clear();

    subscribe(handler);
    return () => unsubscribe(handler);
  }, []);

  return <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>;
}
