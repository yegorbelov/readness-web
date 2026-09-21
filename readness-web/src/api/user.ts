import type { LoginResponse, Role, User } from '@/types/user';

const mockRoles: Role[] = [
  { id: 1, name: 'user' },
  { id: 2, name: 'admin' },
];

const mockUsers: User[] = [
  {
    id: 1,
    username: 'Chloe',
    email: 'chloe@gmail.com',
    role_id: mockRoles[0],
    hash_password: 'user',
  },
  {
    id: 2,
    username: 'Jenny',
    email: 'jenny@gmail.com',
    role_id: mockRoles[1],
    hash_password: 'admin',
  },
];

export async function fetchUsers(): Promise<User[]> {
  return mockUsers;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const user = mockUsers.find((u) => u.email === email);
  if (!user) throw new Error('user does not exist');
  if (user.hash_password !== password) throw new Error('wrong password');

  return {
    user,
    tokens: {
      access_token: `${user.id}`,
      refresh_token: `${user.id}`,
    },
  };
}

export async function getUser(id: number): Promise<User> {
  const user = mockUsers.find((u) => u.id === Number(id));
  return user;
}
