import type { Book } from './book';

export type RoleName = 'user' | 'admin' | 'moderator';

export interface Role {
  id: number;
  name: RoleName;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
  role: Role;
  password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  user: User;
  // tokens?: AuthTokens;
}

export interface UserLibrary extends Book {
  id: number;
  user: User;
  saved_at: string;
}
