import { Loader as SpinnerIcon } from 'lucide-react';

export function Loader({ className }: { className?: string }) {
  return <SpinnerIcon className={`animate-spin text-muted-foreground ${className}`} />;
}
