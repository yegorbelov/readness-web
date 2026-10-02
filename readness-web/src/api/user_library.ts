import type { UserLibrary } from '@/types/user';
import { apiFetch } from './api';
import type { Book } from '@/types/book';

export async function getUserLibrary(): Promise<UserLibrary[]> {
  const response = await apiFetch('/users/me/books');
  if (!response.ok) throw new Error('error');
  return response.json();
}

export async function addBookToLibrary(id: number): Promise<void> {
  const response = await apiFetch(`/users/me/books/${id}`, { method: 'POST' });

  if (!response.ok) throw new Error('error');
}

export async function removeBookFromLibrary(id: string) {
  const response = await apiFetch(`/users/me/books/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('error');
}

export async function editReadingStatus(id: number, body): Promise<void> {
  const response = await apiFetch(`/users/me/books/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/jsoon' },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error('error');
}

export async function getUserUploads(): Promise<Book[]> {
  const response = await apiFetch('/users/me/uploads');

  if (!response.ok) {
    throw new Error('Failed to fetch user uploads');
  }

  return response.json();
}
