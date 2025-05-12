import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormContext } from '../form/FormContext';
import { Input, Label } from '../ui';

interface TextFieldProps extends ComponentProps<'input'> {
  name: string;
  label?: string;
  placeholder?: string;
}

export function TextField({ name, label, placeholder, ...rest }: TextFieldProps) {
  const { register, formState, i18nConfig: { ns, keyPrefix } = {} } = useFormContext();
  const { t } = useTranslation(ns, { keyPrefix });

  const fieldError = formState.errors[name];
  const disabled = formState.isSubmitting;

  return (
    <div className="flex flex-col gap-1 group" data-disabled={disabled}>
      {label && <Label htmlFor={name}>{t(label)}</Label>}

      <Input
        id={name}
        aria-invalid={!!fieldError || undefined}
        placeholder={placeholder ? t(placeholder) : ''}
        disabled={disabled}
        {...register(name)}
        {...rest}
      />

      <p className="min-h-[1.2rem] text-xs text-red-500">
        {fieldError?.message && t(fieldError.message.toString())}
      </p>
    </div>
  );
}
