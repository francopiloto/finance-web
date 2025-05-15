import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedLayout, PublicOnlyLayout, RootLayout } from '@/components/layout';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { SignupPage } from '@/features/auth/pages/SignupPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/login" replace />,
      },
      {
        element: <PublicOnlyLayout />,
        children: [
          { path: '/signup', element: <SignupPage /> },
          { path: '/login', element: <LoginPage /> },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [{ path: '/dashboard', element: <DashboardPage /> }],
      },
    ],
  },
]);
