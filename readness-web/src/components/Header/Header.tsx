import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { searchBooks } from '@/api/books';
import type { Book } from '@/types/book';

export function Header() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);

  useEffect(() => {
    searchBooks(query).then(setResults);
  }, [query]);

  return (
    <div className={styles.header}>
      <a
        className={styles['header__logo-wrapper']}
        href={`${import.meta.env.BASE_URL}`}
      >
        <img
          className={styles['header__logo']}
          src={`${import.meta.env.BASE_URL}/icons/logo.svg`}
        />
        <div className={styles['header__logo-text']}>Readness</div>
      </a>
      <div
        className={`${styles['header__search']} ${results.length ? styles['header__search--open'] : ''}`}
      >
        <div className={styles['header__search-inner']}>
          <input
            className={styles['header__search-input']}
            placeholder=' '
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <span className={styles['header__search-placeholder']}>
            Search for books, authors, geners
          </span>

          {results && (
            <div className={styles['search-results']}>
              {results.map((r) => (
                <a
                  className={styles['search-result']}
                  href={`${import.meta.env.BASE_URL}book/${r.id}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/books_covers/${r.photo_url}`}
                  />
                  {r.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles[`header__tabs`]}>
        {/* <div>Pricing</div> */}
        <div>Log In</div>
      </div>
    </div>
  );
}
