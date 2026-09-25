import { useAuth } from '@/contexts/AuthContext';
import styles from './ProfilePage.module.scss';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div className={styles['profile-page']}>
      <div>
        <span>{user?.username}</span>
        <span className={styles['profile-page__role']}>
          {user?.role.name === 'admin' ? 'admin' : ''}
        </span>
      </div>
      <Link to='/mybooks'>My Books</Link>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}
