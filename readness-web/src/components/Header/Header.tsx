import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { searchBooks } from '@/api/books';
import type { Book } from '@/types/book';
import { useAuth } from '@/contexts/AuthContext';
import LogInModal from '../LogInModal/LogInModal';
import { Link } from 'react-router-dom';

export function Header() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);

  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    searchBooks(query).then(setResults);
  }, [query]);

  return (
    <>
      <div
        className={`${styles.header} ${isOpen && !results.length ? styles['header--open'] : ''}`}
      >
        <Link className={styles['header__logo-wrapper']} to='/'>
          <span className={styles['header__logo-inner']}>
            <img
              className={styles['header__logo']}
              src={`${import.meta.env.BASE_URL}/icons/logo.svg`}
            />
            <div className={styles['header__logo-text']}>Readness</div>
          </span>
        </Link>
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
                  <Link
                    onClick={() => setQuery('')}
                    className={styles['search-result']}
                    to={`/book/${r.id}`}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}/books_covers/${r.photo_url}`}
                    />
                    <span>{r.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {!results.length && (
          <button className={styles['menu']} onClick={() => setIsOpen(!isOpen)}>
            <img src={`${import.meta.env.BASE_URL}/icons/burger-menu.svg`} />
          </button>
        )}
        <div
          className={`${styles[`header__tabs`]} ${isOpen && !results.length ? styles['header__tabs--open'] : ''}`}
        >
          <div className={`${styles[`header__tabs__tab`]}`}>
            {isLoggedIn ? (
              <Link to='/profile'>{user.username}</Link>
            ) : (
              <button onClick={() => setIsLogInModalOpen(true)}>Log In</button>
            )}
          </div>
        </div>
      </div>
      {isLogInModalOpen && (
        <LogInModal onClose={() => setIsLogInModalOpen(false)} />
      )}
    </>
  );
}
