import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SignupForm } from '../components/SignupForm';
import { SignupSucess } from '../components/SignupSuccess';

export function SignupPage() {
  const { t } = useTranslation('signup');
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {isSuccess ? (
          <SignupSucess />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
            <SignupForm onComplete={() => setIsSuccess(true)} />
          </>
        )}
      </div>
    </main>
  );
}
