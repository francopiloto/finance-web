import { useTranslation } from 'react-i18next';

import { toast } from 'sonner';

import { Button, Loader } from '@/components/ui';
import { useSignOut } from '@/features/auth/api/signout.api';

export function DashboardPage() {
  const { t } = useTranslation('dashboard');
  const { mutate, isPending } = useSignOut();

  function handleLogout() {
    mutate(undefined, {
      onSuccess: () => {
        toast.success(t('logout.success'));
      },
      onError: () => {
        toast.error(t('logout.error'));
      },
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center relative">
      <Button onClick={handleLogout} disabled={isPending}>
        {t('logout.button')}
      </Button>

      {isPending && <Loader isOverlay />}
    </div>
  );
}
