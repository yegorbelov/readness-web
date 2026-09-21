import { useAuth } from '@/contexts/AuthContext';
import styles from '@/styles.module.scss';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  return (
    <div className={styles['profile-page']}>
      <span>{user?.username}</span>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}
