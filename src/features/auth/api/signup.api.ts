import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/api/axios';

import { SignUpUserInput, SignUpUserResponse, UseSignUpOptions } from '../types/signup.types';

const signUpUser = (data: SignUpUserInput): Promise<SignUpUserResponse> =>
  axiosInstance.post<SignUpUserResponse>('/auth/signup', data).then(({ data }) => data);

export const useSignUp = (options?: UseSignUpOptions) =>
  useMutation({ mutationFn: signUpUser, ...options });
