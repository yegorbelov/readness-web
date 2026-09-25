import type { UserLibrary } from '@/types/user';
import { mockUsers } from './users';
import { mockBooks } from './books';

export const mockUserLibrary: UserLibrary[] = [
  { id: 1, user: mockUsers[0], book: mockBooks[0], added_at: '123' },
  { id: 2, user: mockUsers[0], book: mockBooks[1], added_at: '123' },
  { id: 3, user: mockUsers[0], book: mockBooks[2], added_at: '123' },
  { id: 4, user: mockUsers[0], book: mockBooks[3], added_at: '123' },
  { id: 5, user: mockUsers[0], book: mockBooks[4], added_at: '123' },
  { id: 6, user: mockUsers[0], book: mockBooks[5], added_at: '123' },
  { id: 7, user: mockUsers[0], book: mockBooks[6], added_at: '123' },
];
