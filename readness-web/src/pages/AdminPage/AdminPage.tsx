import { fetchUsers, updateUserRole } from '@/api/user';

import type { User } from '@/types/user';

import { useEffect, useState } from 'react';

import styles from './AdminPage.module.scss';

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);

  const roles = [
    { id: 1, name: 'user' },
    { id: 2, name: 'moderator' },
    { id: 3, name: 'admin' },
  ];

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  async function handleRoleChange(userId: string, roleId: number) {
    try {
      await updateUserRole(userId, roleId);

      const role = roles.find((role) => role.id === roleId);

      if (!role) return;

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                role: {
                  ...user.role,
                  name: role.name,
                },
              }
            : user,
        ),
      );
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  }

  return (
    <div className={styles['admin-page']}>
      <table className={styles['admin-page__table']} aria-label='Users list'>
        {/* <caption>Users</caption> */}

        <thead>
          <tr>
            <th scope='col'>Username</th>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={
                    roles.find((role) => role.name === user.role.name)?.id ?? 0
                  }
                  onChange={(event) =>
                    handleRoleChange(user.user_id, Number(event.target.value))
                  }
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
