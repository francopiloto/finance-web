import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { toast } from 'sonner';

import { TextField } from '@/components/fields';
import { Form, SubmitButton } from '@/components/form';
import { Button } from '@/components/ui';

import { useSignUp } from '../api/signup.api';
import { SignUpUserInput, signUpUserSchema } from '../schema/signup.schema';

export const SignupForm = ({ onComplete }: { onComplete: () => void }) => {
  const { t } = useTranslation('signup');
  const { mutate } = useSignUp();

  function handleSubmit(data: SignUpUserInput) {
    return new Promise<void>((resolve, reject) => {
      mutate(data, {
        onSuccess: () => {
          onComplete();
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
    <Form<SignUpUserInput>
      schema={signUpUserSchema}
      onSubmit={handleSubmit}
      i18nConfig={{ ns: 'signup' }}
      className="space-y-4"
    >
      <TextField name="name" label="form.fields.name" />
      <TextField name="email" label="form.fields.email" type="email" />
      <TextField name="password" label="form.fields.password" type="password" />
      <TextField name="confirmPassword" label="form.fields.confirm_password" type="password" />

      <SubmitButton>{t('form.submit')}</SubmitButton>

      <div className="text-center text-sm text-muted-foreground">
        {t('form.login_suggestion')}{' '}
        <Button asChild variant="link" className="p-0 h-auto">
          <Link to="/login">{t('form.login_cta')}</Link>
        </Button>
      </div>
    </Form>
  );
};
