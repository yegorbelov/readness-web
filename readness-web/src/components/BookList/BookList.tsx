import BookPreview from './BookPreview';
import styles from './BookList.module.scss';
import { fetchBooks } from '@/api/books';
import { useState, useEffect } from 'react';
import type { Book } from '@/types/book';

export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks().then(setBooks);
  }, []);

  return (
    <div className={styles['booklist']}>
      {books.map((book) => (
        <BookPreview
          key={book.id}
          id={book.id}
          name={book.name}
          photo_url={book.photo_url}
        />
      ))}
    </div>
  );
}
