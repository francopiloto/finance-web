import { ComponentProps } from 'react';
import {
  FieldValues,
  FormProvider as RHFFormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';

import type { ZodSchema } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { FormTranslationType } from './FormContext';
import { FormContextProvider } from './FormProvider';

interface FormProps<TInput extends FieldValues> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  schema: ZodSchema<TInput>;
  onSubmit: SubmitHandler<TInput>;
  children: React.ReactNode;
  options?: Omit<UseFormProps<TInput>, 'resolver'>;
  i18nConfig?: FormTranslationType;
}

export function Form<TInput extends FieldValues>({
  schema,
  onSubmit,
  children,
  options,
  i18nConfig,
  ...rest
}: FormProps<TInput>) {
  const methods = useForm<TInput>({
    resolver: zodResolver(schema),
    ...options,
  });

  return (
    <RHFFormProvider {...methods}>
      <FormContextProvider value={{ ...methods, i18nConfig }}>
        <form onSubmit={methods.handleSubmit(onSubmit)} {...rest}>
          {children}
        </form>
      </FormContextProvider>
    </RHFFormProvider>
  );
}
