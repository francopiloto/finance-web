import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/api/axios';

import { setTokens } from '../lib/tokenStorage';
import { SignInUserInput, SignInUserResponse, UseSignInOptions } from '../types/signin.types';

const DEVICE = 'web-client';

const signInUser = async (data: SignInUserInput): Promise<SignInUserResponse> => {
  const response = await axiosInstance.post<SignInUserResponse>('/auth/signin', {
    ...data,
    device: DEVICE,
  });

  setTokens(response.data);
  return response.data;
};

export const useSignIn = (options?: UseSignInOptions) =>
  useMutation({ mutationFn: signInUser, ...options });
