import styles from './BookSearch.module.scss';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchBooks } from '@/api/books';
import type { Book } from '@/types/book';

export default function BookSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      return;
    }

    const params = new URLSearchParams();

    params.set('q', trimmedQuery);
    params.set('page', '1');

    fetchBooks(params)
      .then(setResults)
      .catch(() => setResults([]));
  }, [query]);

  const hasResults = results.length > 0;

  return (
    <form
      className={[styles.search, hasResults && styles['search--open']]
        .filter(Boolean)
        .join(' ')}
      role='search'
      onSubmit={(event) => event.preventDefault()}
    >
      <div className={styles.inner}>
        <input
          className={styles.input}
          type='search'
          placeholder=' '
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label='Search for books and authors'
        />

        <span className={styles.placeholder} aria-hidden='true'>
          Search for books, authors, genres
        </span>

        {hasResults && (
          <ul className={styles.results}>
            {results.map((book) => (
              <li key={book.book_id}>
                <Link
                  className={styles.result}
                  to={`/book/${book.book_id}`}
                  onClick={() => setQuery('')}
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}${book.cover_url}`}
                    alt=''
                  />

                  <div className={styles.resultInfo}>
                    <span className={styles.resultTitle}>{book.title}</span>

                    <div className={styles.authors}>
                      {book.authors?.map((author) => (
                        <span key={`${author.first_name}-${author.last_name}`}>
                          {author.first_name} {author.last_name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
