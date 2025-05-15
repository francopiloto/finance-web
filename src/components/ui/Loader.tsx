import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader as SpinnerIcon } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/ui/cn';

type LoaderProps = {
  className?: string;
  isOverlay?: boolean;
};

export function Loader({ className, isOverlay = false }: LoaderProps) {
  const { t } = useTranslation('common', { keyPrefix: 'loader.render' });

  useEffect(() => {
    let toastId: string | number;

    const timer = setTimeout(() => {
      toastId = toast.info(t('title'), {
        description: t('description'),
        duration: Infinity,
        closeButton: true,
      });
    }, 5000);

    return () => {
      clearTimeout(timer);

      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [t]);

  const spinner = <SpinnerIcon className={cn('animate-spin text-muted-foreground', className)} />;

  if (isOverlay) {
    return <div className="absolute inset-0 z-50 flex items-center justify-center">{spinner}</div>;
  }

  return spinner;
}
