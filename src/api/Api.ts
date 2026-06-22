const BASE_URL = "https://cardeals.kg/api";

// ─── Token helpers ───────────────────────────────────────────────────────────
const TOKEN_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

export const tokenStorage = {
  getAccess: (): string | null => localStorage.getItem(TOKEN_KEY),
  getRefresh: (): string | null => localStorage.getItem(REFRESH_KEY),
  setAccess: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  setRefresh: (token: string) => localStorage.setItem(REFRESH_KEY, token),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

// ─── Refresh queue ───────────────────────────────────────────────────────────
// Чтобы не отправлять несколько параллельных запросов на /token/refresh/,
// если разом упало несколько 401 (например, при параллельных запросах на странице).
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refresh = tokenStorage.getRefresh();
    if (!refresh) return null;

    try {
      // ⚠️ Согласно Swagger Model "TokenRefresh", поле называется "access",
      // но в него передаётся именно refresh-токен.
      const response = await fetch(`${BASE_URL}/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access: refresh }),
      });

      if (!response.ok) {
        tokenStorage.clear();
        return null;
      }

      const data = await response.json();
      const newAccess: string | undefined = data.access;
      if (!newAccess) {
        tokenStorage.clear();
        return null;
      }

      tokenStorage.setAccess(newAccess);
      // Если бэкенд ротирует refresh-токен и возвращает новый — сохраняем и его
      if (data.refresh) {
        tokenStorage.setRefresh(data.refresh);
      }
      return newAccess;
    } catch {
      tokenStorage.clear();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ─── Core fetch ──────────────────────────────────────────────────────────────
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  withAuth = true,
  _isRetry = false,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (withAuth) {
    const token = tokenStorage.getAccess();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // ── Авто-рефреш токена при 401 ──
  // Если это авторизованный запрос, словили 401, и это не повторная попытка
  // (чтобы не уйти в бесконечный цикл) — пробуем обновить access токен и повторить запрос один раз.
  if (response.status === 401 && withAuth && !_isRetry) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      return apiFetch<T>(endpoint, options, withAuth, true);
    }
    // Рефреш не удался — токены уже очищены внутри refreshAccessToken()
  }

  if (!response.ok) {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch {
      // ignore parse errors
    }
    throw new Error(errorMessage);
  }

  // 204 No Content
  if (response.status === 204) return null as T;

  return response.json();
}
