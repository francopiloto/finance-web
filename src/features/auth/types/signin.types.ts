import { UseMutationOptions } from '@tanstack/react-query';

import { SignInUserInput } from '../schema/signin.schema';

export type { SignInUserInput };

export type SignInUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type UseSignInOptions = UseMutationOptions<SignInUserResponse, unknown, SignInUserInput>;
