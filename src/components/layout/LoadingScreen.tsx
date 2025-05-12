import { Loader } from '../ui';

export function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader className="h-6 w-6" />
    </div>
  );
}
