import type { Role, User } from '@/types/user';

export const mockRoles: Role[] = [
  { id: 1, name: 'user' },
  { id: 2, name: 'admin' },
];

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'Chloe',
    email: 'chloe@gmail.com',
    role: mockRoles[0],
    password: 'user',
  },
  {
    id: '2',
    username: 'Jenny',
    email: 'jenny@gmail.com',
    role: mockRoles[1],
    password: 'admin',
  },
];
