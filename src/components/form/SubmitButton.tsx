import { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/ui/cn';

import { useFormContext } from './FormContext';
import { Button } from '../ui';

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function SubmitButton({ className, children, ...props }: SubmitButtonProps) {
  const { formState } = useFormContext();

  return (
    <Button
      type="submit"
      disabled={formState.isSubmitting}
      className={cn('w-full', className)}
      {...props}
    >
      {children}
    </Button>
  );
}
