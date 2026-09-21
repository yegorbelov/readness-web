export type RoleName = 'user' | 'admin' | 'moderator';

export interface Role {
  id: number;
  name: RoleName;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role_id: Role;
  hash_password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}
