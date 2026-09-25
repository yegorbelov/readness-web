import type {
  Book,
  BookDetails,
  BookIDResponse,
  CreateBookRequest,
} from '@/types/book';

import { mockBooks } from './mocks/books';
import { apiFetch } from './api';

export async function fetchBooks(): Promise<Book[]> {
  const response = await apiFetch('/books');

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

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

export async function createNewBook(
  data: CreateBookRequest,
): Promise<BookIDResponse> {
  const response = await apiFetch('/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create book');
  }

  return response.json();
}

export async function uploadBookFile(
  bookId: string,
  file: File,
): Promise<void> {
  const formData = new FormData();

  formData.append('file', file);

  const response = await apiFetch(`/books/${bookId}/file`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload book file');
  }
}

export async function uploadBookCover(
  bookId: string,
  file: File,
): Promise<void> {
  const formData = new FormData();
  formData.append('cover', file, file.name);

  console.log('FILE:', file);
  console.log('FORM DATA:', [...formData.entries()]);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL ?? 'http://localhost:8080'}/books/${bookId}/cover`,
    {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    },
  );

  console.log('STATUS:', response.status);

  if (!response.ok) {
    console.log('ERROR:', await response.text());
    throw new Error('Failed to upload book cover');
  }
}

export async function getUserUploads(): Promise<Book[]> {
  const response = await apiFetch('/users/me/uploads');

  if (!response.ok) {
    throw new Error('Failed to fetch user uploads');
  }

  return response.json();
}
