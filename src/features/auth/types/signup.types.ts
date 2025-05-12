import type { UseMutationOptions } from '@tanstack/react-query';

import { SignUpUserInput } from '../schema/signup.schema';

export type { SignUpUserInput };

export interface SignUpUserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type UseSignUpOptions = UseMutationOptions<SignUpUserResponse, unknown, SignUpUserInput>;
