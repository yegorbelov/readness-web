import type { Topic } from '@/types/topics';
import { apiFetch } from './api';

export async function fetchTopics(): Promise<Topic[]> {
  const response = await apiFetch('/topics');
  if (!response.ok) throw new Error('error');
  return response.json();
}

export async function createTopic(data): Promise<void> {
  const response = await apiFetch('/topics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('error');
}

export async function fetchTopicById(id: string): Promise<Topic[]> {
  const response = await apiFetch(`/topics/${id}`);
  if (!response.ok) throw new Error('error');
  return response.json();
}

export async function updateTopic(id: string, data): Promise<void> {
  const response = await apiFetch(`/topics/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('error');
}

export async function deleteTopic(id: string) {
  const response = await apiFetch(`/topics/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('cannot delete topic');
}
