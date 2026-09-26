import type { LoginResponse, User } from '@/types/user';
import { apiFetch } from './api';

export async function fetchUsers(): Promise<User[]> {
  const response = await apiFetch('/users');
  if (!response.ok) throw new Error('error');
  return response.json();
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

  const data = await response.json();

  return { ...data, role: { name: data.role.name } };
}

export async function logout(): Promise<void> {
  const response = await apiFetch('/auth/logout', {
    method: 'POST',
  });

  if (!response.ok) throw new Error('error');
}

export async function updateUserRole(
  userId: string,
  roleId: number,
): Promise<void> {
  const response = await apiFetch(`/users/${userId}/role`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role_id: roleId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update user role');
  }
}
