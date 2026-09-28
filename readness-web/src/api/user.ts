import type { User } from '@/types/user';
import { apiFetch } from './api';

export async function fetchUsers(): Promise<User[]> {
  const response = await apiFetch('/users');
  if (!response.ok) throw new Error('error');
  return response.json();
}

export async function getUser(): Promise<User> {
  const response = await apiFetch('/users/me');

  if (!response.ok) throw new Error('error');

  const data = await response.json();

  return { ...data, role: { name: data.role.name } };
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
