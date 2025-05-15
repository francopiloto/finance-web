import { Outlet } from 'react-router-dom';

import { LanguageSwitcher, Toaster } from '../ui';

export function RootLayout() {
  return (
    <>
      <Toaster />
      <LanguageSwitcher />
      <Outlet />
    </>
  );
}
