import type { Book, BookDetails } from '@/types/book';
import { mockUserLibrary } from './mocks/user_libraries';
import { mockBooks } from './mocks/books';

export async function fetchBooks(): Promise<Book[]> {
  return mockBooks;
}

export async function fetchBookById(
  id: number,
): Promise<BookDetails | undefined> {
  const book = mockBooks.find((b) => b.id === id);
  if (!book) throw new Error('book now found');

  const userId = Number(localStorage.getItem('access_token'));

  if (!userId) return book;

  const library = mockUserLibrary.find(
    (entry) => entry.book.id === id && entry.user.id === userId,
  );
  return { ...book, added_at: library?.added_at, library_id: library?.id };
}

export async function searchBooks(query: string): Promise<Book[]> {
  if (!query.trim()) return [];
  return mockBooks.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase()),
  );
}
