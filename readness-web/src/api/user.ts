import type { LoginResponse, User } from '@/types/user';
import { mockUsers, mockRoles } from './mocks/users';

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

export async function signup(
  email: string,
  password: string,
): Promise<LoginResponse> {
  if (mockUsers.some((u) => u.email === email)) {
    throw new Error('user with this email already exists');
  }
  const newUser = {
    id: mockUsers.length + 1,
    username: email.split('@')[0],
    email: email,
    role: mockRoles[0],
    hash_password: password,
  };

  mockUsers.push(newUser);

  return {
    user: newUser,
    tokens: {
      access_token: `${newUser.id}`,
      refresh_token: `${newUser.id}`,
    },
  };
}

export async function getUser(id: number): Promise<User> {
  const user = mockUsers.find((u) => u.id === Number(id));
  if (!user) {
    throw new Error('user not found');
  }
  return user;
}
