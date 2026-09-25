const API_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshToken(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  _isRetry = false,
): Promise<Response> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
    },
  });

  if (response.status === 401 && !_isRetry) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshToken().finally(() => {
        isRefreshing = false;
      });
    }

    const refreshed = await refreshPromise;

    if (refreshed) {
      return apiFetch(path, options, true);
    } else {
      throw new Error('Session expired');
    }
  }

  return response;
}
