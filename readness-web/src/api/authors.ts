import type { Author } from '@/types/book';

import { apiFetch } from './api';

export type CreateAuthorRequest = {
  first_name: string;
  last_name: string;
};

export async function fetchAuthors(): Promise<Author[]> {
  const response = await apiFetch('/authors');

  if (!response.ok) {
    throw new Error('Failed to fetch authors');
  }

  return response.json();
}

export async function createNewAuthor(
  data: CreateAuthorRequest,
): Promise<void> {
  const response = await apiFetch('/authors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create author');
  }
}
