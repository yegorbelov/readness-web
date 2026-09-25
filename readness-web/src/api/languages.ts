import type { Language } from '@/types/book';
import { apiFetch } from './api';

export async function fetchLanguages(): Promise<Language> {
  const response = await apiFetch('/languages');
  if (!response.ok) throw new Error('error');
  return response.json();
}
