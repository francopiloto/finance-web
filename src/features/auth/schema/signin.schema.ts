import { z } from 'zod';

import { makeKeyPrefixer } from '@/lib/i18n/keys';

const getMsgKey = makeKeyPrefixer('form.errors');

export const signInUserSchema = z.object({
  email: z
    .string({
      required_error: getMsgKey('email.required'),
      invalid_type_error: getMsgKey('email.invalid'),
    })
    .nonempty(getMsgKey('email.required'))
    .email(getMsgKey('email.format'))
    .max(255, getMsgKey('email.max')),

  password: z
    .string({
      required_error: getMsgKey('password.required'),
      invalid_type_error: getMsgKey('password.invalid'),
    })
    .nonempty(getMsgKey('password.required'))
    .min(6, getMsgKey('password.min'))
    .max(100, getMsgKey('password.max')),
});

export type SignInUserInput = z.infer<typeof signInUserSchema>;
