import { Link } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

import styles from './ProfilePage.module.scss';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const role = user.role.name;

  return (
    <div className={styles['profile-page']}>
      <div className={styles['profile-page__profile']}>
        <div className={styles['profile-page__avatar']}>
          {user.username.charAt(0).toUpperCase()}
        </div>

        <div className={styles['profile-page__info']}>
          {(role === 'admin' || role === 'moderator') && (
            <span
              className={`${styles['profile-page__role']} ${
                styles[`profile-page__role--${role}`]
              }`}
            >
              {role}
            </span>
          )}
          <span className={styles['profile-page__username']}>
            {user.username}
          </span>

          <span className={styles['profile-page__email']}>{user.email}</span>
        </div>
      </div>

      <nav className={styles['profile-page__actions']}>
        <Link to='/mybooks' className={styles['profile-page__action']}>
          <span>My Books</span>
        </Link>

        <button
          type='button'
          className={`${styles['profile-page__action']} ${styles['profile-page__logout']}`}
          onClick={logout}
        >
          <span>Log Out</span>
        </button>
      </nav>
    </div>
  );
}
