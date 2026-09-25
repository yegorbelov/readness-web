import { apiFetch } from './api';

export async function fetchRequests(): Promise<[]> {
  const response = await apiFetch('/moderation/requests');
  if (!response.ok) throw new Error('error');
  // console.log(await response.json());
  return response.json();
}

export async function publishBookRequest(id: string): Promise {
  const response = await apiFetch(`/books/${id}/publish-request`, {
    method: 'POST',
  });
}
