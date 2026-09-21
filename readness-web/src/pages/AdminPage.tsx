import { fetchUsers } from '@/api/user';
import type { User } from '@/types/user';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div>
      {users.map((u: User) => (
        <div key={u.id}>{u.username}</div>
      ))}
    </div>
  );
}
