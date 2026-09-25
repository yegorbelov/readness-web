import { mockUserLibrary } from './mocks/user_libraries';
import type { UserLibrary } from '@/types/user';
import { apiFetch } from './api';

export async function getUserLibrary(): Promise<UserLibrary[]> {
  const response = await apiFetch('/users/me/books');
  if (!response.ok) throw new Error('error');
  return response.json();
}

export async function removeBookFromLibrary(id: number) {
  const index = mockUserLibrary.findIndex((entry) => entry.id === id);
  if (index === -1) {
    throw new Error('not found');
  }
  mockUserLibrary.splice(index, 1);
}

export async function addBookToLibrary(id: number): Promise<UserLibrary> {
  return {};
}
