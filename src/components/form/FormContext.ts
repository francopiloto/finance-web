import { createContext, useContext } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export type FormTranslationType = { ns?: string; keyPrefix?: string };

export type FormContextType<T extends FieldValues> = UseFormReturn<T> & {
  i18nConfig?: FormTranslationType;
};

export const FormContext = createContext<FormContextType<FieldValues> | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used within a Form');
  }

  return context;
}
