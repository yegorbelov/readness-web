const API_URL = 'http://localhost:8080';

export function apiFetch(path: string, options: RequestInit = {}) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
    },
  });
}
