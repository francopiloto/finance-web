export type RefreshTokenResult =
  | { success: true; accessToken: string }
  | { success: false; error: unknown };
