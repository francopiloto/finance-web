import { createContext, useContext } from 'react';

import { AuthStatus } from '../types/auth-status.enum';

export type AuthContextType = { authStatus: AuthStatus };

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
