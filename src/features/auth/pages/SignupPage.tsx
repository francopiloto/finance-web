import { useTranslation } from 'react-i18next';

import { SignupForm } from '../components/SignupForm';

export function SignupPage() {
  const { t } = useTranslation('signup');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
        <SignupForm />
      </div>
    </main>
  );
}
