import { fetchUsers } from '@/api/user';

import type { User } from '@/types/user';

import { useEffect, useState } from 'react';

import styles from './AdminPage.module.scss';

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div className={styles['admin-page']}>
      <table className={styles['admin-page__table']} aria-label='Users list'>
        <caption>Users</caption>

        <thead>
          <tr>
            <th scope='col'>Username</th>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
