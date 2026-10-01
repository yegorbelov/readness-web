import styles from './AccountMenu.module.scss';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

import AuthDialog from '@/components/AuthDialog/AuthDialog';

export default function AccountMenu() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  const openLoginModal = () => {
    setIsAccountMenuOpen(false);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <div ref={dropdownRef} className={styles.account}>
        {isLoggedIn ? (
          <>
            <button
              className={styles.button}
              type='button'
              aria-expanded={isAccountMenuOpen}
              aria-haspopup='menu'
              onClick={() => setIsAccountMenuOpen((prev) => !prev)}
            >
              {user?.username}
            </button>

            {isAccountMenuOpen && (
              <nav className={styles.dropdown}>
                <Link to='/profile'>My Profile</Link>

                {(user?.role?.name === 'admin' ||
                  user?.role?.name === 'moderator') && (
                  <Link to='/moderation/requests'>Requests</Link>
                )}

                {user?.role?.name === 'admin' && <Link to='/admin'>Panel</Link>}

                <Link to='/books/new'>Create Book</Link>

                <Link to='/authors/new'>Authors</Link>

                <Link to='/mybooks'>My Books</Link>
              </nav>
            )}
          </>
        ) : (
          <button
            className={styles.button}
            type='button'
            onClick={openLoginModal}
          >
            Log In
          </button>
        )}
      </div>

      {isLoginModalOpen && <AuthDialog onClose={closeLoginModal} />}
    </>
  );
}
