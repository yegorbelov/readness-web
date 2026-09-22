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

  const infiniteBooks = [...books, ...books];

  return (
    <div className={styles.viewport}>
      <div className={styles['booklist']}>
        {infiniteBooks.map((book, index) => (
          <BookPreview
            key={`${book.id}-${index}`}
            id={book.id}
            name={book.title}
            photo_url={book.photo_url}
          />
        ))}
      </div>
    </div>
  );
}
