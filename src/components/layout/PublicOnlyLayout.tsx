import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth/contexts/AuthContext';
import { AuthStatus } from '@/features/auth/types/auth-status.enum';

import { LoadingScreen } from './LoadingScreen';
import { Toaster } from '../ui/Sonner';

export function PublicOnlyLayout() {
  const { authStatus } = useAuth();

  if (authStatus === AuthStatus.Loading) {
    return <LoadingScreen />;
  }

  if (authStatus === AuthStatus.Authenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}
