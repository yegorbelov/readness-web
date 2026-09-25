import { mockBooks } from './mocks/books';
import { mockUsers } from './mocks/users';
import { mockUserLibrary } from './mocks/user_libraries';
import type { UserLibrary } from '@/types/user';
import { apiFetch } from './api';

export async function getUserLibrary(): Promise<UserLibrary[]> {
  const response = await apiFetch('/users/me/books');
  if (!response.ok) throw new Error('error');
  return response.json();
}

export async function removeBookFromLibrary(id: number) {
  const index = mockUserLibrary.findIndex((entry) => entry.id === id);
  if (index === -1) {
    throw new Error('not found');
  }
  mockUserLibrary.splice(index, 1);
}

export async function addBookToLibrary(id: number): Promise<UserLibrary> {
  // const book = mockBooks.find((b) => b.id === id);
  // const newId = mockUserLibrary.length + 1;
  // const user = mockUsers.find((u) => u.id === user_id);
  // if (!user) throw new Error('user not found');
  // if (!book) throw new Error('book not found');
  // const newBook = {
  //   id: newId,
  //   user: user,
  //   book: book,
  //   added_at: Date.now().toString(),
  // };
  // mockUserLibrary.push(newBook);
  // return newBook;
  return {};
}
