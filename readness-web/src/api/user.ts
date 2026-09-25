import type { LoginResponse, User } from '@/types/user';
import { mockUsers } from './mocks/users';
import { apiFetch } from './api';

export async function fetchUsers(): Promise<User[]> {
  return mockUsers;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await apiFetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) throw new Error('user not found');

  return { user: await getUser() };
}

export async function signup(
  email: string,
  password: string,
  username = email.split('@')[0],
): Promise<LoginResponse> {
  const response = await apiFetch('/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });

  if (!response.ok) throw new Error('Invalid email or password');

  return { user: await getUser() };
}

export async function getUser(): Promise<User> {
  const response = await apiFetch('/users/me');

  if (!response.ok) throw new Error('error');

  return response.json();
}

export async function logout(): Promise<void> {
  const response = await apiFetch('/auth/logout', {
    method: 'POST',
  });

  if (!response.ok) throw new Error('error');
}
