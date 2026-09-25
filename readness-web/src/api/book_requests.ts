import { apiFetch } from './api';

export async function fetchRequests(): Promise<[]> {
  const response = await apiFetch('/moderation/requests');
  if (!response.ok) throw new Error('error');
  return response.json();
}

export async function publishBookRequest(id: string): Promise<void> {
  await apiFetch(`/books/${id}/publish-request`, {
    method: 'POST',
  });
}

export async function publishBook(bookId: string): Promise<void> {
  const response = await apiFetch(`/books/${bookId}/publish`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to publish book');
  }
}
