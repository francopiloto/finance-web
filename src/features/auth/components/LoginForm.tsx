import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { toast } from 'sonner';

import { TextField } from '@/components/fields/TextField';
import { Form } from '@/components/form/Form';
import { SubmitButton } from '@/components/form/SubmitButton';
import { Button } from '@/components/ui';

import { useSignIn } from '../api/signin.api';
import { SignInUserInput, signInUserSchema } from '../schema/signin.schema';

export const LoginForm = () => {
  const { t } = useTranslation('login');
  const { mutate } = useSignIn();

  function handleSubmit(data: SignInUserInput) {
    return new Promise<void>((resolve, reject) => {
      mutate(data, {
        onSuccess: () => {
          toast.success(t('success.title'), { description: t('success.description') });
          resolve();
        },
        onError: () => {
          toast.error(t('error.title'), { description: t('error.description') });
          reject();
        },
      });
    });
  }

  return (
    <Form<SignInUserInput>
      schema={signInUserSchema}
      onSubmit={handleSubmit}
      i18nConfig={{ ns: 'login' }}
      className="space-y-4"
    >
      <TextField name="email" label="form.fields.email" type="email" />
      <TextField name="password" label="form.fields.password" type="password" />

      <SubmitButton>{t('form.submit')}</SubmitButton>

      <div className="text-center text-sm text-muted-foreground">
        {t('form.signup_suggestion')}{' '}
        <Button asChild variant="link" className="p-0 h-auto">
          <Link to="/signup">{t('form.signup_cta')}</Link>
        </Button>
      </div>
    </Form>
  );
};
