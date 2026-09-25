import type { Book, BookDetails, CreateBookRequest } from '@/types/book';
import { mockUserLibrary } from './mocks/user_libraries';
import { mockBooks } from './mocks/books';
import { apiFetch } from './api';

export async function fetchBooks(): Promise<Book[]> {
  const response = await apiFetch('/books');
  if (!response.ok) throw new Error('error');
  // console.log(await response.json());
  return response.json();
}

export async function fetchBookById(id: string): Promise<BookDetails> {
  const response = await apiFetch(`/books/${id}`);

  if (!response.ok) {
    throw new Error('Book not found');
  }

  return response.json();
}

export async function searchBooks(query: string): Promise<Book[]> {
  if (!query.trim()) return [];
  return mockBooks.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase()),
  );
}

export async function createNewBook(data: CreateBookRequest): Promise<void> {
  const response = await apiFetch('/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('error');
}

export async function getUserUploads(): Promise<Book[]> {
  const response = await apiFetch('/users/me/uploads');
  if (!response.ok) throw new Error('error');
  // console.log(await response.json());
  return response.json();
}
