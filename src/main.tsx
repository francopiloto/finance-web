import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './features/auth/contexts/AuthProvider.tsx';
import { ReactQueryProvider } from './lib/api/tanstack.tsx';
import { router } from './routes/index.tsx';

import './index.css';
import './i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ReactQueryProvider>
  </StrictMode>,
);
