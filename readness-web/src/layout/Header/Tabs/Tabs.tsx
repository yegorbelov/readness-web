import { Link } from 'react-router-dom';
import styles from './Tabs.module.scss';
import type { User } from '@/types/user';

interface TabsProps {
  user: User;
}

export default function Tabs({ user }: TabsProps) {
  return (
    <div className={styles['header__dropdown']}>
      <Link to='/profile'>My Profile</Link>

      {(user?.role.name === 'admin' || user?.role.name === 'moderator') && (
        <Link to='/moderation/requests'>Requests</Link>
      )}

      {user?.role.name === 'admin' && <Link to='/admin'>Users</Link>}

      <Link to='/books/new'>Create Book</Link>

      <Link to='/authors/new'>Create Author</Link>

      <Link to='/mybooks'>My Books</Link>
    </div>
  );
}
