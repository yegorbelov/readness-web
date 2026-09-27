import { Link } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

import styles from './ProfilePage.module.scss';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const isAdmin = user.role.name === 'admin';

  return (
    <div className={styles['profile-page']}>
      <div className={styles['profile-page__header']}>
        <span className={styles['profile-page__username']}>
          {user.username}
        </span>

        {isAdmin && <span className={styles['profile-page__role']}>admin</span>}
      </div>

      <nav className={styles['profile-page__actions']}>
        <Link to='/mybooks' className={styles['profile-page__link']}>
          My Books
        </Link>

        <button
          type='button'
          className={styles['profile-page__logout']}
          onClick={logout}
        >
          Log Out
        </button>
      </nav>
    </div>
  );
}
