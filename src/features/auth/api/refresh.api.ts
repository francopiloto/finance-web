import axios from 'axios';

import { clearTokens, getRefreshToken, setTokens } from '../lib/tokenStorage';
import { RefreshTokenResult } from '../types/refresh.types';

type ResponseData = { accessToken: string; refreshToken: string };

export async function refreshTokens(): Promise<RefreshTokenResult> {
  try {
    const storedRefreshToken = getRefreshToken();

    if (!storedRefreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post<ResponseData>(
      `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
      null,
      {
        headers: { Authorization: storedRefreshToken },
        withCredentials: true,
      },
    );

    const { accessToken, refreshToken } = response.data || {};

    if (!accessToken || !refreshToken) {
      throw new Error('Invalid tokens from server');
    }

    setTokens({ accessToken, refreshToken });
    return { success: true, accessToken };
  } catch (error) {
    clearTokens();
    return { success: false, error };
  }
}
