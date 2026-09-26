import type { UserLibrary } from '@/types/user';
import { apiFetch } from './api';

export async function getUserLibrary(): Promise<UserLibrary[]> {
  const response = await apiFetch('/users/me/books');
  if (!response.ok) throw new Error('error');
  return response.json();
}

export async function removeBookFromLibrary(id: string) {
  const response = await apiFetch(`/users/me/books/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('error');
}

export async function addBookToLibrary(id: number): Promise<UserLibrary> {
  const response = await apiFetch(`/users/me/books/${id}`, { method: 'POST' });

  if (!response.ok) throw new Error('error');
}
