import type { BookStatus } from '@/types/book';

const mockStatuses: BookStatus[] = [{ id: 1, user: 1, status: 'completed' }];

export async function fetchStatuses(): Promise<BookStatus[]> {
  return mockStatuses;
}
