import styles from './Header.module.scss';
import { useEffect, useRef, useState } from 'react';
import { fetchBooks } from '@/api/books';
import type { Book } from '@/types/book';
import { useAuth } from '@/contexts/AuthContext';
import AuthDialog from '@/components/AuthDialog/AuthDialog';
import { Link } from 'react-router-dom';
import Tabs from './Tabs/Tabs';

export default function Header() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const params = new URLSearchParams();
    params.set('q', query.trim());
    params.set('page', '1');

    fetchBooks(params)
      .then(setResults)
      .catch(() => setResults([]));
  }, [query]);

  // useEffect(() => {
  //   const handlePointerDown = (e: PointerEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(e.target as Node)
  //     ) {
  //       setDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener('pointerdown', handlePointerDown);

  //   return () => {
  //     document.removeEventListener('pointerdown', handlePointerDown);
  //   };
  // }, []);

  return (
    <>
      <div
        className={`${styles.header} ${isOpen && !results.length ? styles['header--open'] : ''}`}
      >
        <Link className={styles['header__logo-wrapper']} to='/'>
          <span className={styles['header__logo-inner']}>
            <img
              className={styles['header__logo']}
              src={`${import.meta.env.BASE_URL}icons/logo.svg`}
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
                    to={`/book/${r.book_id}`}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}${r.cover_url}`}
                    />
                    <div>
                      <span>{r.title}</span>
                      <div>
                        {r.authors?.map((a) => (
                          <span>
                            {a.first_name} {a.last_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {!results.length && (
          <div className={styles['menu-button-wrapper']}>
            {isLoggedIn ? (
              <button
                className={styles['menu-button']}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user?.username}
                {dropdownOpen && <Tabs user={user} />}
              </button>
            ) : (
              <button
                className={styles['menu-button']}
                onClick={() => setIsLogInModalOpen(true)}
              >
                Log In
              </button>
            )}
            <button
              className={styles['menu']}
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                setIsOpen(!isOpen);
              }}
            >
              <img src={`${import.meta.env.BASE_URL}icons/burger-menu.svg`} />
            </button>
          </div>
        )}

        <div
          ref={dropdownRef}
          className={`${styles[`header__tabs`]} ${isOpen && !results.length ? styles['header__tabs--open'] : ''}`}
        >
          {dropdownOpen &&
            (isLoggedIn ? (
              <Tabs user={user} />
            ) : (
              <button onClick={() => setIsLogInModalOpen(true)}>Log In</button>
            ))}
        </div>
      </div>
      {isLogInModalOpen && (
        <AuthDialog onClose={() => setIsLogInModalOpen(false)} />
      )}
    </>
  );
}
