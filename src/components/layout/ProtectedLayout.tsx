import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth/contexts/AuthContext';
import { AuthStatus } from '@/features/auth/types/auth-status.enum';

import { LoadingScreen } from './LoadingScreen';

export function ProtectedLayout() {
  const { authStatus } = useAuth();

  if (authStatus === AuthStatus.Loading) {
    return <LoadingScreen />;
  }

  if (authStatus === AuthStatus.Unauthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
