type TokenData = { accessToken: string | null; refreshToken: string | null };
type TokenCallback = (tokens: TokenData) => void;

const REFRESH_TOKEN_KEY = 'refreshToken';
const subscribers = new Set<TokenCallback>();

let accessToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(tokens: { accessToken: string; refreshToken: string }) {
  accessToken = tokens.accessToken;
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  notify(tokens);
}

export function clearTokens() {
  accessToken = null;
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  notify({ accessToken: null, refreshToken: null });
}

export function subscribe(cb: TokenCallback) {
  subscribers.add(cb);
}

export function unsubscribe(cb: TokenCallback) {
  subscribers.delete(cb);
}

function notify(tokens: TokenData) {
  subscribers.forEach((cb) => cb(tokens));
}
