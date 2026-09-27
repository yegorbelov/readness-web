import { fetchUsers, updateUserRole } from '@/api/user';
import type { User } from '@/types/user';

import { useEffect, useState } from 'react';

import styles from './AdminPage.module.scss';

const ROLES = [
  { id: 1, name: 'user' },
  { id: 2, name: 'moderator' },
  { id: 3, name: 'admin' },
] as const;

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchUsers();

        if (!cancelled) {
          setUsers(data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);

        if (!cancelled) {
          setError('Failed to load users.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleRoleChange(userId: string, roleId: number) {
    const role = ROLES.find((role) => role.id === roleId);

    if (!role) return;

    try {
      setUpdatingUserId(userId);

      await updateUserRole(userId, roleId);

      setUsers((prev) =>
        prev.map((user) =>
          user.user_id === userId
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
    } finally {
      setUpdatingUserId(null);
    }
  }

  if (loading) {
    return (
      <main className={styles['admin-page']}>
        <div className={styles['state']}>Loading users...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles['admin-page']}>
        <div className={styles['state']}>{error}</div>
      </main>
    );
  }

  return (
    <main className={styles['admin-page']}>
      <div className={styles['header']}>
        <div>
          <h1 className={styles['title']}>Users</h1>
          <p className={styles['subtitle']}>Manage users and their roles.</p>
        </div>
      </div>

      {users.length === 0 ? (
        <div className={styles['state']}>No users found.</div>
      ) : (
        <div className={styles['table-wrapper']}>
          <table className={styles['table']} aria-label='Users list'>
            <thead>
              <tr>
                <th scope='col'>Username</th>
                <th scope='col'>Email</th>
                <th scope='col'>Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                const currentRole =
                  ROLES.find((role) => role.name === user.role.name)?.id ??
                  ROLES[0].id;

                const isUpdating = updatingUserId === user.user_id;

                return (
                  <tr key={user.user_id}>
                    <td>
                      <span className={styles['username']}>
                        {user.username}
                      </span>
                    </td>

                    <td>
                      <span className={styles['email']}>{user.email}</span>
                    </td>

                    <td>
                      <select
                        className={styles['role-select']}
                        value={currentRole}
                        disabled={isUpdating}
                        aria-label={`Role for ${user.username}`}
                        onChange={(event) =>
                          handleRoleChange(
                            user.user_id,
                            Number(event.target.value),
                          )
                        }
                      >
                        {ROLES.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>

                      {isUpdating && (
                        <span className={styles['updating']} aria-live='polite'>
                          Saving...
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
