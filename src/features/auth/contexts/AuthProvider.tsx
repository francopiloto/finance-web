import { ReactNode, useEffect, useMemo, useState } from 'react';

import { AuthContext, AuthContextType } from './AuthContext';
import { refreshTokens } from '../api/refresh.api';
import { getAccessToken, subscribe, unsubscribe } from '../lib/tokenStorage';
import { AuthStatus } from '../types/auth-status.enum';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.Loading);

  useEffect(() => {
    const handler = ({ accessToken }: { accessToken: string | null }) =>
      setAuthStatus(accessToken ? AuthStatus.Authenticated : AuthStatus.Unauthenticated);

    subscribe(handler);

    if (getAccessToken()) {
      setAuthStatus(AuthStatus.Authenticated);
    } else {
      refreshTokens();
    }

    return () => unsubscribe(handler);
  }, []);

  const value: AuthContextType = useMemo(() => ({ authStatus }), [authStatus]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
