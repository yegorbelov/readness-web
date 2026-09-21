import type { BookStatus } from '@/types/book';

const mockStatuses: BookStatus[] = [
  { book_id: 1, user_id: 1, status: 'completed' },
];

export async function fetchStatuses(): Promise<BookStatus[]> {
  return mockStatuses;
}
