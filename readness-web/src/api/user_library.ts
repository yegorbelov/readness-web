import { mockBooks } from './mocks/books';
import { mockUsers } from './mocks/users';
import type { UserLibrary } from '@/types/user';
import { mockUserLibrary } from './mocks/user_libraries';

export async function getUserLibrary(id: number): Promise<UserLibrary[]> {
  return mockUserLibrary.filter((u) => u.user.id === id);
}

export async function removeBookFromLibrary(id: number) {
  const index = mockUserLibrary.findIndex((entry) => entry.id === id);
  if (index === -1) {
    throw new Error('not found');
  }
  mockUserLibrary.splice(index, 1);
}

export async function addBookToLibrary(
  id: number,
  user_id: number,
): Promise<UserLibrary> {
  const book = mockBooks.find((b) => b.id === id);
  const newId = mockUserLibrary.length + 1;
  const user = mockUsers.find((u) => u.id === user_id);

  if (!user) throw new Error('user not found');
  if (!book) throw new Error('book not found');

  const newBook = {
    id: newId,
    user: user,
    book: book,
    added_at: Date.now().toString(),
  };

  mockUserLibrary.push(newBook);

  return newBook;
}
