import { z } from 'zod';

import { makeKeyPrefixer } from '@/lib/i18n/keys';

const getMsgKey = makeKeyPrefixer('form.errors');

export const signUpUserSchema = z
  .object({
    name: z
      .string({
        required_error: getMsgKey('name.required'),
        invalid_type_error: getMsgKey('name.invalid'),
      })
      .nonempty(getMsgKey('name.required'))
      .max(255, getMsgKey('name.max')),

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

    confirmPassword: z
      .string({
        required_error: getMsgKey('confirm_password.required'),
        invalid_type_error: getMsgKey('confirm_password.invalid'),
      })
      .nonempty(getMsgKey('confirm_password.required'))
      .min(1, getMsgKey('confirm_password.min')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: getMsgKey('confirm_password.match'),
  });

export type SignUpUserInput = z.infer<typeof signUpUserSchema>;
