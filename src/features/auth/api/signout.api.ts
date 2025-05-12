import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/api/axios';

import { clearTokens } from '../lib/tokenStorage';

const signOutUser = (): Promise<void> =>
  axiosInstance.post('/auth/signout').then(() => clearTokens());

export const useSignOut = () => useMutation({ mutationFn: signOutUser });
