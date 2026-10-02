import type { Language } from '@/types/book';
import { apiFetch } from './api';

export async function fetchLanguages(): Promise<Language[]> {
  const response = await apiFetch('/languages');
  if (!response.ok) throw new Error('error');
  return response.json();
}

export async function createLanguage(data): Promise<void> {
  const response = await apiFetch('/languages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('error');
}

export async function fetchLanguageById(id: string): Promise<Language[]> {
  const response = await apiFetch(`/languages/${id}`);
  if (!response.ok) throw new Error('error');
  return response.json();
}

export async function updateLanguage(id: string, data): Promise<void> {
  const response = await apiFetch(`/languages/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('error');
}

export async function deleteLanguage(id: string) {
  const response = await apiFetch(`/languages/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('cannot delete topic');
}
