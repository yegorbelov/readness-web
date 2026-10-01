import styles from './MobileMenu.module.scss';

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={styles.menu}>
      <button
        className={styles.button}
        type='button'
        aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isMobileMenuOpen}
        aria-controls='mobile-navigation'
        onClick={toggleMenu}
      >
        <img
          src={`${import.meta.env.BASE_URL}icons/${
            isMobileMenuOpen ? 'cross.svg' : 'burger-menu.svg'
          }`}
          alt=''
        />
      </button>

      <nav
        id='mobile-navigation'
        className={[
          styles.navigation,
          isMobileMenuOpen && styles['navigation--open'],
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={!isMobileMenuOpen}
      >
        <Link to='/profile' onClick={closeMenu}>
          My Profile
        </Link>

        <Link to='/moderation/requests' onClick={closeMenu}>
          Requests
        </Link>

        <Link to='/books/new' onClick={closeMenu}>
          Create Book
        </Link>

        <Link to='/authors/new' onClick={closeMenu}>
          Authors
        </Link>

        <Link to='/mybooks' onClick={closeMenu}>
          My Books
        </Link>
      </nav>
    </div>
  );
}
