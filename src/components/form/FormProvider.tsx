import { FieldValues } from 'react-hook-form';

import { FormContext, FormContextType } from './FormContext';

export function FormContextProvider<T extends FieldValues>({
  children,
  value,
}: {
  value: FormContextType<T>;
  children: React.ReactNode;
}) {
  return (
    <FormContext.Provider value={value as FormContextType<FieldValues>}>
      {children}
    </FormContext.Provider>
  );
}
